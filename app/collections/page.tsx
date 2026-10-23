import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { BRAND } from "@/lib/data";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { CollectionsFilterClient } from "@/components/shared/CollectionsFilterClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: BRAND.seo.collectionsTitle,
  description: BRAND.collectionsDescription,
  openGraph: {
    title: `${BRAND.seo.collectionsTitle} | ${BRAND.name}`,
    description: BRAND.collectionsDescription,
    url: `${BRAND.url}/collections`,
  },
  alternates: {
    canonical: "/collections",
  },
};

export default async function CollectionsPage() {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Uniform Haute Joaillerie Header */}
      <SiteHeader
        announcementBar={settings.announcementBar}
        atelierName={settings.atelierName}
      />

      {/* Main Collections Content */}
      <main className="flex-1 px-6 md:px-12 xl:px-16 py-12 lg:py-20">
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <CollectionsFilterClient initialProducts={products} />
        </Suspense>
      </main>

      {/* Uniform Monumental Footer */}
      <SiteFooter atelierName={settings.atelierName} />
    </div>
  );
}
