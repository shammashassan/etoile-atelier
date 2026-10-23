import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/data";

export const alt = BRAND.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0a09",
          color: "#fafaf9",
          padding: "48px",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(212, 175, 55, 0.35)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            position: "relative",
          }}
        >
          {/* Subtle Octagonal Corner Accents */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              fontSize: 12,
              letterSpacing: 4,
              color: "rgba(212, 175, 55, 0.6)",
              textTransform: "uppercase",
            }}
          >
            {BRAND.citiesSummary.toUpperCase()}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 16,
              fontSize: 12,
              letterSpacing: 4,
              color: "rgba(212, 175, 55, 0.6)",
              textTransform: "uppercase",
            }}
          >
            {BRAND.establishedText.toUpperCase()}
          </div>

          {/* Centered Faceted Star SVG */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            style={{ marginBottom: 20 }}
          >
            {/* Halo */}
            <polygon
              points="32,6 68,6 94,32 94,68 68,94 32,94 6,68 6,32"
              stroke="#d4af37"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            {/* Facets */}
            <polygon points="50,50 44.8,37.5 50,4" fill="#c5a059" opacity="0.6" />
            <polygon points="50,50 50,4 55.2,37.5" fill="#f5e6b8" opacity="0.95" />
            <polygon points="50,50 55.2,37.5 74,26" fill="#c5a059" opacity="0.6" />
            <polygon points="50,50 74,26 62.5,44.8" fill="#f5e6b8" opacity="0.95" />
            <polygon points="50,50 62.5,44.8 96,50" fill="#c5a059" opacity="0.6" />
            <polygon points="50,50 96,50 62.5,55.2" fill="#f5e6b8" opacity="0.95" />
            <polygon points="50,50 62.5,55.2 74,74" fill="#c5a059" opacity="0.6" />
            <polygon points="50,50 74,74 55.2,62.5" fill="#f5e6b8" opacity="0.95" />
            <polygon points="50,50 55.2,62.5 50,96" fill="#c5a059" opacity="0.6" />
            <polygon points="50,50 50,96 44.8,62.5" fill="#f5e6b8" opacity="0.95" />
            <polygon points="50,50 44.8,62.5 26,74" fill="#c5a059" opacity="0.6" />
            <polygon points="50,50 26,74 37.5,55.2" fill="#f5e6b8" opacity="0.95" />
            <polygon points="50,50 37.5,55.2 4,50" fill="#c5a059" opacity="0.6" />
            <polygon points="50,50 4,50 37.5,44.8" fill="#f5e6b8" opacity="0.95" />
            <polygon points="50,50 37.5,44.8 26,26" fill="#c5a059" opacity="0.6" />
            <polygon points="50,50 26,26 44.8,37.5" fill="#f5e6b8" opacity="0.95" />
            {/* Core */}
            <polygon points="50,46.5 53.5,50 50,53.5 46.5,50" fill="#ffffff" />
          </svg>

          <div
            style={{
              fontSize: 60,
              fontFamily: "serif",
              letterSpacing: 8,
              marginBottom: 12,
              color: "#fafaf9",
              textAlign: "center",
            }}
          >
            {BRAND.name.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d4af37",
              marginBottom: 20,
            }}
          >
            {`Haute Joaillerie • ${BRAND.headquarters.street}, ${BRAND.headquarters.city}`}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a8a29e",
              maxWidth: 720,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {BRAND.description}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
