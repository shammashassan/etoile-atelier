import { ImageResponse } from "next/og";

export const alt = "Étoile Atelier | Haute Joaillerie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
            border: "1px solid rgba(212, 175, 55, 0.4)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d4af37",
              marginBottom: 16,
            }}
          >
            Haute Joaillerie • Place Vendôme
          </div>
          <div
            style={{
              fontSize: 64,
              fontFamily: "serif",
              letterSpacing: 2,
              marginBottom: 20,
              color: "#fafaf9",
            }}
          >
            ÉTOILE ATELIER
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a8a29e",
              maxWidth: 700,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Rare natural gemstones, flawless diamonds, and master artisan craftsmanship.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
