import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* North Ray */}
          <polygon points="50,50 44.8,37.5 50,4" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 50,4 55.2,37.5" fill="#f3e5ab" opacity="0.95" />

          {/* North-East Ray */}
          <polygon points="50,50 55.2,37.5 74,26" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 74,26 62.5,44.8" fill="#f3e5ab" opacity="0.95" />

          {/* East Ray */}
          <polygon points="50,50 62.5,44.8 96,50" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 96,50 62.5,55.2" fill="#f3e5ab" opacity="0.95" />

          {/* South-East Ray */}
          <polygon points="50,50 62.5,55.2 74,74" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 74,74 55.2,62.5" fill="#f3e5ab" opacity="0.95" />

          {/* South Ray */}
          <polygon points="50,50 55.2,62.5 50,96" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 50,96 44.8,62.5" fill="#f3e5ab" opacity="0.95" />

          {/* South-West Ray */}
          <polygon points="50,50 44.8,62.5 26,74" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 26,74 37.5,55.2" fill="#f3e5ab" opacity="0.95" />

          {/* West Ray */}
          <polygon points="50,50 37.5,55.2 4,50" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 4,50 37.5,44.8" fill="#f3e5ab" opacity="0.95" />

          {/* North-West Ray */}
          <polygon points="50,50 37.5,44.8 26,26" fill="#c5a059" opacity="0.6" />
          <polygon points="50,50 26,26 44.8,37.5" fill="#f3e5ab" opacity="0.95" />

          {/* Core diamond table */}
          <polygon points="50,46.5 53.5,50 50,53.5 46.5,50" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
