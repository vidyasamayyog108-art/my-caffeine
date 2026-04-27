import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface MemberPhotoProps {
  name: string;
  photoUrl?: string;
  photoAssetId?: string | null;
  className?: string;
  fallbackClassName?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Derive a display URL from either photoAssetId (object-storage) or photoUrl.
 * Object-storage URLs follow: /api/assets/<assetId>
 */
export function getPhotoSrc(
  photoUrl?: string,
  photoAssetId?: string | null,
): string | null {
  if (photoAssetId) return `/api/assets/${photoAssetId}`;
  if (photoUrl) return photoUrl;
  return null;
}

export function MemberPhoto({
  name,
  photoUrl,
  photoAssetId,
  className = "w-full h-full object-cover",
  fallbackClassName = "w-full h-full flex items-center justify-center bg-muted",
}: MemberPhotoProps) {
  const [errored, setErrored] = useState(false);
  const [loading, setLoading] = useState(true);

  const src = getPhotoSrc(photoUrl, photoAssetId);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!src || errored) {
    return (
      <div className={fallbackClassName}>
        <span className="text-2xl font-display font-bold text-primary opacity-60">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <>
      {loading && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        src={src}
        alt={name}
        className={className}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setErrored(true);
        }}
      />
    </>
  );
}
