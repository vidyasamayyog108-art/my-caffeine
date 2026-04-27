import { useActor } from "@caffeineai/core-infrastructure";
import { Download, ExternalLink, Megaphone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdType, createActor } from "../backend";
import type { Ad } from "../backend";
import { useUserStore } from "../store";
import type { Language } from "../types";

// Hook to fetch active ads from the backend
export function useActiveAds(): Ad[] {
  const { actor, isFetching } = useActor(createActor);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getActiveAds()
      .then(setAds)
      .catch(() => setAds([]));
  }, [actor, isFetching]);

  return ads;
}

interface AdBannerProps {
  ads: Ad[];
  placement: "home-banner" | "profiles-card" | "matches-bottom";
  className?: string;
}

const placementClass: Record<AdBannerProps["placement"], string> = {
  "home-banner": "min-h-[120px]",
  "profiles-card": "min-h-[100px] max-w-[300px] mx-auto",
  "matches-bottom": "min-h-[100px]",
};

function getLangText(ad: Ad, lang: Language): string {
  if (lang === "marathi" && ad.langText.mr) return ad.langText.mr;
  if (lang === "hindi" && ad.langText.hi) return ad.langText.hi;
  if (lang === "kannada" && ad.langText.kn) return ad.langText.kn;
  return ad.langText.en || ad.adText;
}

export function AdBanner({ ads, placement, className = "" }: AdBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { currentLanguage } = useUserStore();
  const { actor } = useActor(createActor);

  const active = ads.filter((a) => a.isActive);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (active.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % active.length);
    }, 5000);
  }, [active.length]);

  useEffect(() => {
    if (!isPaused) startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startInterval]);

  const currentAd = active[currentIndex % Math.max(active.length, 1)];

  // Record view when ad changes
  useEffect(() => {
    if (!currentAd || !actor) return;
    const key = String(currentAd.id);
    if (!viewedIds.has(key)) {
      actor.recordAdView(currentAd.id).catch(() => {});
      setViewedIds((prev) => new Set(prev).add(key));
    }
  }, [currentAd, actor, viewedIds]);

  if (!active || active.length === 0) return null;

  function handleClick() {
    if (!currentAd) return;
    if (actor) actor.recordAdClick(currentAd.id).catch(() => {});
    const url =
      currentAd.websiteLink ||
      (currentAd.contactNumber ? `tel:${currentAd.contactNumber}` : null);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  const langText = getLangText(currentAd, currentLanguage);
  const hasImage =
    (currentAd.adType === AdType.image || currentAd.adType === AdType.both) &&
    (currentAd.imageAssetId || currentAd.imageUrl);
  const hasText =
    currentAd.adType === AdType.text ||
    currentAd.adType === AdType.both ||
    (!currentAd.imageAssetId && !currentAd.imageUrl);

  /** Resolve image src: prefer object-storage assetId, fall back to imageUrl */
  const imageSrc = currentAd.imageAssetId
    ? `/api/assets/${currentAd.imageAssetId}`
    : currentAd.imageUrl || "";

  function handleDownload(e: React.MouseEvent) {
    e.stopPropagation();
    if (!hasImage || !imageSrc) return;
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = `${currentAd.companyName || "ad"}-image`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-ocid="ad_banner.card"
    >
      {/* Ad card */}
      <button
        type="button"
        onClick={handleClick}
        className={`${placementClass[placement]} w-full cursor-pointer rounded-xl overflow-hidden border-2 shadow-md hover:shadow-lg transition-all duration-300 flex items-stretch group bg-card relative text-left`}
        style={{ borderColor: "#D4AF37" }}
        aria-label={`${currentAd.companyName} — Sponsored`}
      >
        {/* Top accent strip */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-10"
          style={{
            background: "linear-gradient(90deg, #8B1A1A, #D4AF37, #FF6B00)",
          }}
        />

        {/* Image */}
        {hasImage && (
          <div className="w-24 md:w-32 flex-shrink-0 overflow-hidden mt-1">
            <img
              src={imageSrc}
              alt={currentAd.companyName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* Text */}
        {hasText && (
          <div className="flex-1 p-3 min-w-0 mt-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Megaphone
                className="w-3 h-3 flex-shrink-0"
                style={{ color: "#D4AF37" }}
              />
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#D4AF37" }}
              >
                Sponsored
              </span>
            </div>
            <p
              className="font-bold text-sm leading-tight truncate mb-1"
              style={{ color: "#8B1A1A" }}
            >
              {currentAd.companyName}
            </p>
            {langText && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
                {langText}
              </p>
            )}
            {(currentAd.websiteLink || currentAd.contactNumber) && (
              <div
                className="mt-1.5 flex items-center gap-1 text-xs font-semibold"
                style={{ color: "#FF6B00" }}
              >
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {currentAd.websiteLink
                    ? currentAd.websiteLink
                        .replace(/^https?:\/\//, "")
                        .split("/")[0]
                    : currentAd.contactNumber}
                </span>
              </div>
            )}
          </div>
        )}
      </button>

      {/* Download button — only shown when ad has an image */}
      {hasImage && imageSrc && (
        <button
          type="button"
          onClick={handleDownload}
          className="absolute top-2 left-2 z-20 rounded-lg p-1 bg-card/90 border border-border shadow-sm hover:bg-muted/80 transition-colors"
          title="Download ad image"
          aria-label="Download ad image"
          data-ocid="ad_banner.download_button"
        >
          <Download className="w-3 h-3" style={{ color: "#8B1A1A" }} />
        </button>
      )}

      {/* Navigation dots */}
      {active.length > 1 && (
        <div
          className="absolute bottom-2 right-3 flex items-center gap-1"
          data-ocid="ad_banner.dots"
        >
          {active.map((a, i) => (
            <button
              key={String(a.id)}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === currentIndex ? 16 : 6,
                height: 6,
                backgroundColor: i === currentIndex ? "#D4AF37" : "#8B1A1A",
                opacity: i === currentIndex ? 1 : 0.4,
              }}
              aria-label={`Ad ${i + 1}`}
              data-ocid={`ad_banner.dot.${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdBanner;
