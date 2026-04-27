import { g as useActor, r as reactExports, f as useUserStore, A as AdType, j as jsxRuntimeExports, h as createActor } from "./index-CkCNqozh.js";
import { M as Megaphone, E as ExternalLink } from "./megaphone-Cf6gxdqi.js";
import { D as Download } from "./download-GSbrD0yi.js";
function useActiveAds() {
  const { actor, isFetching } = useActor(createActor);
  const [ads, setAds] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    actor.getActiveAds().then(setAds).catch(() => setAds([]));
  }, [actor, isFetching]);
  return ads;
}
const placementClass = {
  "home-banner": "min-h-[120px]",
  "profiles-card": "min-h-[100px] max-w-[300px] mx-auto",
  "matches-bottom": "min-h-[100px]"
};
function getLangText(ad, lang) {
  if (lang === "marathi" && ad.langText.mr) return ad.langText.mr;
  if (lang === "hindi" && ad.langText.hi) return ad.langText.hi;
  if (lang === "kannada" && ad.langText.kn) return ad.langText.kn;
  return ad.langText.en || ad.adText;
}
function AdBanner({ ads, placement, className = "" }) {
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isPaused, setIsPaused] = reactExports.useState(false);
  const [viewedIds, setViewedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const intervalRef = reactExports.useRef(null);
  const { currentLanguage } = useUserStore();
  const { actor } = useActor(createActor);
  const active = ads.filter((a) => a.isActive);
  const startInterval = reactExports.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (active.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % active.length);
    }, 5e3);
  }, [active.length]);
  reactExports.useEffect(() => {
    if (!isPaused) startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startInterval]);
  const currentAd = active[currentIndex % Math.max(active.length, 1)];
  reactExports.useEffect(() => {
    if (!currentAd || !actor) return;
    const key = String(currentAd.id);
    if (!viewedIds.has(key)) {
      actor.recordAdView(currentAd.id).catch(() => {
      });
      setViewedIds((prev) => new Set(prev).add(key));
    }
  }, [currentAd, actor, viewedIds]);
  if (!active || active.length === 0) return null;
  function handleClick() {
    if (!currentAd) return;
    if (actor) actor.recordAdClick(currentAd.id).catch(() => {
    });
    const url = currentAd.websiteLink || (currentAd.contactNumber ? `tel:${currentAd.contactNumber}` : null);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }
  const langText = getLangText(currentAd, currentLanguage);
  const hasImage = (currentAd.adType === AdType.image || currentAd.adType === AdType.both) && (currentAd.imageAssetId || currentAd.imageUrl);
  const hasText = currentAd.adType === AdType.text || currentAd.adType === AdType.both || !currentAd.imageAssetId && !currentAd.imageUrl;
  const imageSrc = currentAd.imageAssetId ? `/api/assets/${currentAd.imageAssetId}` : currentAd.imageUrl || "";
  function handleDownload(e) {
    e.stopPropagation();
    if (!hasImage || !imageSrc) return;
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = `${currentAd.companyName || "ad"}-image`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative w-full ${className}`,
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      "data-ocid": "ad_banner.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleClick,
            className: `${placementClass[placement]} w-full cursor-pointer rounded-xl overflow-hidden border-2 shadow-md hover:shadow-lg transition-all duration-300 flex items-stretch group bg-card relative text-left`,
            style: { borderColor: "#D4AF37" },
            "aria-label": `${currentAd.companyName} — Sponsored`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 left-0 right-0 h-1 z-10",
                  style: {
                    background: "linear-gradient(90deg, #8B1A1A, #D4AF37, #FF6B00)"
                  }
                }
              ),
              hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 md:w-32 flex-shrink-0 overflow-hidden mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageSrc,
                  alt: currentAd.companyName,
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              ) }),
              hasText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-3 min-w-0 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Megaphone,
                    {
                      className: "w-3 h-3 flex-shrink-0",
                      style: { color: "#D4AF37" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] font-semibold uppercase tracking-widest",
                      style: { color: "#D4AF37" },
                      children: "Sponsored"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-bold text-sm leading-tight truncate mb-1",
                    style: { color: "#8B1A1A" },
                    children: currentAd.companyName
                  }
                ),
                langText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-snug", children: langText }),
                (currentAd.websiteLink || currentAd.contactNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "mt-1.5 flex items-center gap-1 text-xs font-semibold",
                    style: { color: "#FF6B00" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: currentAd.websiteLink ? currentAd.websiteLink.replace(/^https?:\/\//, "").split("/")[0] : currentAd.contactNumber })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        hasImage && imageSrc && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleDownload,
            className: "absolute top-2 left-2 z-20 rounded-lg p-1 bg-card/90 border border-border shadow-sm hover:bg-muted/80 transition-colors",
            title: "Download ad image",
            "aria-label": "Download ad image",
            "data-ocid": "ad_banner.download_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3", style: { color: "#8B1A1A" } })
          }
        ),
        active.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-2 right-3 flex items-center gap-1",
            "data-ocid": "ad_banner.dots",
            children: active.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                },
                className: "rounded-full transition-all duration-200",
                style: {
                  width: i === currentIndex ? 16 : 6,
                  height: 6,
                  backgroundColor: i === currentIndex ? "#D4AF37" : "#8B1A1A",
                  opacity: i === currentIndex ? 1 : 0.4
                },
                "aria-label": `Ad ${i + 1}`,
                "data-ocid": `ad_banner.dot.${i + 1}`
              },
              String(a.id)
            ))
          }
        )
      ]
    }
  );
}
export {
  AdBanner as A,
  useActiveAds as u
};
