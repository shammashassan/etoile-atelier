import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c0a09",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          padding: 24,
        }}
      >
        <svg
          width="132"
          height="132"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Place Vendôme Octagonal Halo */}
          <polygon
            points="32,6 68,6 94,32 94,68 68,94 32,94 6,68 6,32"
            stroke="#d4af37"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            strokeDasharray="3 3"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#d4af37"
            strokeWidth="0.75"
            strokeOpacity="0.3"
          />

          {/* 8-Point Faceted Diamond Celestial Star */}
          {/* North */}
          <polygon points="50,50 44.8,37.5 50,4" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 50,4 55.2,37.5" fill="#f5e6b8" opacity="0.95" />

          {/* North-East */}
          <polygon points="50,50 55.2,37.5 74,26" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 74,26 62.5,44.8" fill="#f5e6b8" opacity="0.95" />

          {/* East */}
          <polygon points="50,50 62.5,44.8 96,50" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 96,50 62.5,55.2" fill="#f5e6b8" opacity="0.95" />

          {/* South-East */}
          <polygon points="50,50 62.5,55.2 74,74" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 74,74 55.2,62.5" fill="#f5e6b8" opacity="0.95" />

          {/* South */}
          <polygon points="50,50 55.2,62.5 50,96" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 50,96 44.8,62.5" fill="#f5e6b8" opacity="0.95" />

          {/* South-West */}
          <polygon points="50,50 44.8,62.5 26,74" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 26,74 37.5,55.2" fill="#f5e6b8" opacity="0.95" />

          {/* West */}
          <polygon points="50,50 37.5,55.2 4,50" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 4,50 37.5,44.8" fill="#f5e6b8" opacity="0.95" />

          {/* North-West */}
          <polygon points="50,50 37.5,44.8 26,26" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 26,26 44.8,37.5" fill="#f5e6b8" opacity="0.95" />

          {/* Central Brilliant Core */}
          <polygon points="50,46.5 53.5,50 50,53.5 46.5,50" fill="#ffffff" />
          <circle cx="50" cy="50" r="1.5" fill="#d4af37" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
