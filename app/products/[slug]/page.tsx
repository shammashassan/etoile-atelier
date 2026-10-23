import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { BRAND } from "@/lib/data";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { ProductDetailClient } from "@/components/shared/ProductDetailClient";

// Product pages are dynamic (per-slug), allow blocking render without a loading.tsx
export const instant = false;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Jewelry Piece Not Found",
    };
  }

  const primaryImage = product.images[0]?.url;

  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} | ${BRAND.name}`,
      description: product.shortDescription,
      url: `${BRAND.url}/products/${slug}`,
      images: primaryImage
        ? [
            {
              url: primaryImage,
              width: 1200,
              height: 1200,
              alt: product.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ${BRAND.name}`,
      description: product.shortDescription,
      images: primaryImage ? [primaryImage] : [],
    },
    alternates: {
      canonical: `/products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <SiteHeader
        announcementBar={settings.announcementBar}
        atelierName={settings.atelierName}
      />
      <main className="flex-1">
        <ProductDetailClient product={product} />
      </main>
      <SiteFooter atelierName={settings.atelierName} />
    </div>
  );
}
