import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — Haute Joaillerie`,
    short_name: BRAND.name,
    description: BRAND.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
