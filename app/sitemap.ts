import type { MetadataRoute } from "next";
import { INITIAL_PRODUCTS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://etoile-atelier.com";

  const productRoutes = INITIAL_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date("2026-10-23T00:00:00Z"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-10-23T00:00:00Z"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date("2026-10-23T00:00:00Z"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date("2026-10-23T00:00:00Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...productRoutes,
  ];
}
