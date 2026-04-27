interface JainSymbolProps {
  className?: string;
  size?: number;
  opacity?: number;
}

// Ahimsa Hand SVG — palm with dharma chakra wheel
export function JainAhimsaHand({
  className = "",
  size = 80,
  opacity = 1,
}: JainSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Palm base */}
      <path
        d="M30 80 Q25 65 25 55 L25 35 Q25 30 30 30 Q35 30 35 35 L35 50 Q35 45 40 45 Q45 45 45 50 L45 45 Q45 40 50 40 Q55 40 55 45 L55 42 Q55 37 60 37 Q65 37 65 42 L65 55 Q65 65 60 75 Q55 82 45 85 Q37 85 30 80Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Dharma wheel on palm */}
      <circle
        cx="47"
        cy="60"
        r="8"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      <circle cx="47" cy="60" r="2" fill="white" />
      {/* Wheel spokes */}
      <line x1="47" y1="52" x2="47" y2="55" stroke="white" strokeWidth="1.2" />
      <line x1="47" y1="65" x2="47" y2="68" stroke="white" strokeWidth="1.2" />
      <line x1="39" y1="60" x2="42" y2="60" stroke="white" strokeWidth="1.2" />
      <line x1="52" y1="60" x2="55" y2="60" stroke="white" strokeWidth="1.2" />
      <line x1="41" y1="54" x2="43" y2="56" stroke="white" strokeWidth="1.2" />
      <line x1="51" y1="64" x2="53" y2="66" stroke="white" strokeWidth="1.2" />
      <line x1="53" y1="54" x2="51" y2="56" stroke="white" strokeWidth="1.2" />
      <line x1="41" y1="64" x2="43" y2="62" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

// Jain Om symbol / decorative element
export function JainOrnament({ className = "", size = 40 }: JainSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
      <circle
        cx="20"
        cy="20"
        r="12"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 20 + 8 * Math.cos(rad);
        const y1 = 20 + 8 * Math.sin(rad);
        const x2 = 20 + 14 * Math.cos(rad);
        const y2 = 20 + 14 * Math.sin(rad);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

// Large decorative watermark hand for footer/hero
export function JainHandWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="200"
      height="220"
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Palm silhouette */}
      <path
        d="M55 190 Q42 155 42 130 L42 70 Q42 58 55 58 Q68 58 68 70 L68 105 Q68 90 82 90 Q96 90 96 105 L96 90 Q96 76 110 76 Q124 76 124 90 L124 84 Q124 70 138 70 Q152 70 152 84 L152 115 Q152 145 138 168 Q122 188 95 195 Q72 198 55 190Z"
        fill="currentColor"
        opacity="0.15"
      />
      {/* Dharma wheel */}
      <circle
        cx="97"
        cy="140"
        r="22"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      <circle cx="97" cy="140" r="6" fill="currentColor" opacity="0.3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 97 + 10 * Math.cos(rad);
        const y1 = 140 + 10 * Math.sin(rad);
        const x2 = 97 + 19 * Math.cos(rad);
        const y2 = 140 + 19 * Math.sin(rad);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.25"
          />
        );
      })}
    </svg>
  );
}
