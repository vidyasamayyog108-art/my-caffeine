import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface VivahSetuLogoProps {
  className?: string;
}

// Fallback text logo rendered when image fails to load
function TextLogo() {
  return (
    <span
      className="inline-flex flex-col items-center justify-center rounded-md px-3 py-1 leading-tight select-none"
      style={{ background: "#8B1A1A", minWidth: 80 }}
      aria-label="विवाह सेतू"
    >
      <span
        className="font-display font-bold text-base tracking-wide"
        style={{ color: "#D4AF37" }}
      >
        विवाह सेतू
      </span>
      <span
        className="font-body text-[10px] tracking-widest uppercase"
        style={{ color: "#D4AF37", opacity: 0.85 }}
      >
        Vivah Setu
      </span>
    </span>
  );
}

const LOGO_PATHS = [
  "/assets/vivah-setu-logo-new.png",
  "/assets/vivah-setu-logo-uploaded.png",
  "/assets/vivah-setu-logo.png",
];

export function VivahSetuLogo({ className = "" }: VivahSetuLogoProps) {
  const [pathIndex, setPathIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const imgSrc = LOGO_PATHS[pathIndex];

  function handleError() {
    const next = pathIndex + 1;
    if (next < LOGO_PATHS.length) {
      setPathIndex(next);
    } else {
      setImgFailed(true);
    }
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center shrink-0 ${className}`}
      aria-label="विवाह सेतू — Home"
    >
      {imgFailed ? (
        <TextLogo />
      ) : (
        <img
          src={imgSrc}
          alt="विवाह सेतू"
          onError={handleError}
          style={{ height: "60px", width: "auto", objectFit: "contain" }}
        />
      )}
    </Link>
  );
}

export default VivahSetuLogo;
