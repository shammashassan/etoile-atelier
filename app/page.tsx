import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { BRAND } from "@/lib/data";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { JewelryStudioClient } from "@/components/shared/JewelryStudioClient";
import {
  MotionSection,
  MotionItem,
  MaskedLineHeadline,
  ShutterImage,
} from "@/components/shared/motion/MotionSection";

export const metadata: Metadata = {
  title: {
    absolute: BRAND.seo.homeTitle,
  },
  description: BRAND.heroDescription,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [products, settings] = await Promise.all([
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground overflow-x-clip selection:bg-primary selection:text-primary-foreground">
      {/* ── CHAPTER 1: THE ALABASTER PAVILION (Warm French Limestone Field) ── */}
      <section className="bg-background text-foreground">
        {/* Unified Haute Joaillerie Site Header */}
        <SiteHeader
          announcementBar={settings.announcementBar}
          atelierName={settings.atelierName}
        />

        {/* HERO: Asymmetric Photographic Rail (three-prints-one-line) */}
        <div className="px-6 md:px-12 xl:px-16 pt-12 pb-24 lg:pt-16 lg:pb-32">
          {/* Top Line: Monumental Masked Headline Left + Off-Center Statement Right */}
          <div className="grid gap-8 lg:grid-cols-12 items-baseline mb-20">
            <div className="lg:col-span-7">
              <MaskedLineHeadline
                lines={[...BRAND.heroHeadline]}
                tag="h1"
                className="text-4xl sm:text-6xl lg:text-7xl leading-[1.05]"
              />
            </div>
            <MotionItem delay={0.2} className="lg:col-span-5">
              <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                {BRAND.heroDescription}
              </p>
              <div className="mt-8">
                <Link
                  href="/collections"
                  className="bg-primary text-primary-foreground px-6 py-3.5 text-base font-medium inline-flex items-center gap-2 transition-transform duration-150 active:scale-[0.98] hover:bg-primary/90"
                >
                  Explore Salon Catalog
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </MotionItem>
          </div>

          {/* Uneven Tri-Print Rail: Three Archival & Salon Masterpieces */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-12 items-start">
            {/* Print 1 (Cols 1-3, offset down): 11th–13th c. Sapphire Gold Ring (The Met) */}
            <div className="md:col-span-3 flex flex-col gap-3 md:mt-16">
              <ShutterImage
                src="/assets/ring.jpg"
                alt="Imperial Gold and Sapphire Ring, 11th–13th century, The Metropolitan Museum of Art"
                aspectRatio="aspect-square"
                sizes="(max-width: 768px) 100vw, 25vw"
                delay={0.1}
              />
              <div className="flex flex-col text-base pt-1">
                <span className="text-foreground font-medium">Imperial Sapphire &amp; Gold Ring</span>
                <span className="text-sm text-muted-foreground">11th–13th Century • The Met Collection</span>
              </div>
            </div>

            {/* Print 2 (Cols 4-8): The Solitaire Lumina Diamond Ring in Platinum 950 */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <ShutterImage
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"
                alt="The Solitaire Lumina Diamond Ring in sculpted solid Platinum 950"
                aspectRatio="aspect-3/4"
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                delay={0.2}
              />
              <div className="flex flex-col sm:flex-row justify-between text-base pt-1 gap-1">
                <span className="text-foreground font-medium">Solitaire Lumina in Platinum 950</span>
                <span className="text-sm text-muted-foreground">2.15 ct Brilliant Cut • GIA Verified</span>
              </div>
            </div>

            {/* Print 3 (Cols 9-12): 1851 Koh-I-Noor Lapidary Plate (The Met) */}
            <div className="md:col-span-4 flex flex-col gap-3 md:mt-8">
              <ShutterImage
                src="/assets/drawing-of-the-koh-i-noor-diamond.jpg"
                alt="Archival Drawing of the Koh-I-Noor Diamond, 1851, R. S. Garrard & Co."
                aspectRatio="aspect-16/10"
                sizes="(max-width: 768px) 100vw, 33vw"
                delay={0.3}
              />
              <div className="flex flex-col sm:flex-row justify-between text-base pt-1 gap-1">
                <span className="text-foreground font-medium">Koh-I-Noor Lapidary Folio, 1851</span>
                <span className="text-sm text-muted-foreground">The Met Collection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 2: THE OPTICAL & METALLURGY BENCH (Dark Gemological Slate Field) ── */}
      <section id="studio" className="dark bg-background text-foreground px-4 sm:px-6 md:px-12 xl:px-16 py-20 lg:py-32 scroll-mt-24 md:scroll-mt-32 w-full max-w-full overflow-hidden">
        <JewelryStudioClient products={products} />
      </section>

      {/* ── CHAPTER 3: CURATED SALON ACQUISITIONS (Warm Ivory Suede Field) ── */}
      <section id="collections" className="bg-card text-card-foreground px-6 md:px-12 xl:px-16 py-28 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Editorial Anchor Column (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <MotionSection>
              <h2 className="font-heading text-3xl font-normal text-foreground sm:text-5xl leading-tight">
                Salon Acquisitions
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-prose">
                Direct private acquisition or confidential salon viewing in Paris, Geneva, London, and New York. Each creation is unique and hallmarked.
              </p>
              <div className="mt-6">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-1.5 text-base font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  View Complete Salon Catalog
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </MotionSection>

            {/* Curated Editorial Notes */}
            <div className="flex flex-col gap-6 pt-6 text-base text-muted-foreground">
              {BRAND.editorialNotes.map((note, idx) => (
                <MotionItem key={note.title} delay={0.1 * (idx + 1)} className="bg-secondary p-6">
                  <span className="font-medium text-foreground block mb-1">
                    {note.title}
                  </span>
                  <p className="leading-relaxed">
                    {note.description}
                  </p>
                </MotionItem>
              ))}
            </div>
          </div>

          {/* Right Showcase: Blueprint frame-run-one-lifted (Cols 5-12) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* The Lifted Piece: Masterpiece at Full Scale */}
            {products[0] && (
              <MotionItem delay={0.1} className="flex flex-col gap-4 group">
                <Link href={`/products/${products[0].slug}`} className="block overflow-hidden bg-secondary">
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    {products[0].images[0] && (
                      <Image
                        src={products[0].images[0].url}
                        alt={products[0].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2">
                  <div>
                    <Link
                      href={`/products/${products[0].slug}`}
                      className="font-heading text-2xl font-normal text-foreground hover:underline"
                    >
                      {products[0].title}
                    </Link>
                    <p className="text-base text-muted-foreground mt-1">
                      {products[0].metals[0]} • {products[0].gemstones[0]} {products[0].caratWeight ? `(${products[0].caratWeight} ct)` : ""} • {products[0].clarity || "Natural Untreated"}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="font-heading text-2xl font-light text-foreground block">
                      ${products[0].price.toLocaleString()}
                    </span>
                    <span className="text-sm text-foreground/80 font-medium">Immediate Acquisition</span>
                  </div>
                </div>
              </MotionItem>
            )}

            {/* Secondary Pieces: Staggered Pair with Offsets */}
            <div className="grid gap-8 sm:grid-cols-2">
              {products.slice(1, 3).map((item, idx) => (
                <MotionItem key={item.slug} delay={0.2 * (idx + 1)} className="flex flex-col gap-3 group">
                  <Link href={`/products/${item.slug}`} className="block overflow-hidden bg-secondary">
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      {item.images[0] && (
                        <Image
                          src={item.images[0].url}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                    </div>
                  </Link>
                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-heading text-xl font-normal text-foreground block hover:underline"
                      >
                        {item.title}
                      </Link>
                      <span className="text-base text-muted-foreground">
                        {item.metals[0]} • {item.gemstones[0]}
                      </span>
                    </div>
                    <span className="font-heading text-xl font-normal text-foreground">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                </MotionItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 4: THE NOCTURNE VAULT (Deep Obsidian Velvet Noir Field) ── */}
      <section id="vault" className="dark bg-background text-foreground px-6 md:px-12 xl:px-16 py-20 lg:py-32 scroll-mt-24 md:scroll-mt-32">
        <div className="flex flex-col gap-20">
          {/* Header on Dark Ground */}
          <div className="grid gap-8 lg:grid-cols-12 items-baseline">
            <div className="lg:col-span-8">
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                The Place Vendôme Vault: Lapidary Provenance
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                Historic mountings, master stone-setting techniques, and unheated gemstone specimens preserved in European high jewelry archives.
              </p>
            </div>
          </div>

          {/* Asymmetric Staggered Pairs in Dark Room (Met Museum Masterworks) */}
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Met Archive 1: Marcus & Co. Double Ring (Cols 1-5, Tall Portrait Frame) */}
            <MotionItem delay={0.1} className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-card">
                <Image
                  src="/assets/double-ring.jpg"
                  alt="Double Ring in Gold and Emerald, Marcus and Co., ca. 1895, Met Museum"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <h3 className="font-heading text-2xl font-normal text-foreground">
                  Marcus &amp; Co. Double Ring (ca. 1895)
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Emerald, natural pearls, and 18-karat sculpted gold. Open pavilion setting allowing uninhibited light dispersion.
                </p>
                <span className="text-sm text-primary font-medium mt-1">
                  Accession 16835 • The Metropolitan Museum of Art (CC0)
                </span>
              </div>
            </MotionItem>

            {/* Met Archive 2 & 3: Staggered Right Stack (Cols 6-12) */}
            <div className="lg:col-span-7 flex flex-col gap-16 lg:mt-12">
              {/* Met Archive 2: Gemological Royal Sapphire Necklace (Wide Landscape) */}
              <MotionItem delay={0.2} className="flex flex-col gap-4">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-card">
                  <Image
                    src="/assets/necklace.jpg"
                    alt="Historic 18th-century necklace with colorless sapphires and gold collets, Met Museum"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <h3 className="font-heading text-2xl font-normal text-foreground">
                    18th-Century Colorless Sapphire Collet Necklace
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Uncut table and rose-cut sapphire specimens linked with individual hand-soldered bezels, illustrating raw mineral refractory index.
                  </p>
                  <span className="text-sm text-primary font-medium mt-1">
                    Accession 446767 • The Metropolitan Museum of Art (CC0)
                  </span>
                </div>
              </MotionItem>

              {/* Met Archive 3: Duchess of Devonshire Portrait Diamond */}
              <MotionItem delay={0.3} className="grid sm:grid-cols-12 gap-6 items-center bg-card p-6 md:p-8">
                <div className="sm:col-span-5 relative aspect-square w-full overflow-hidden bg-secondary">
                  <Image
                    src="/assets/duchess-of-devonshire-portrait-diamond.jpg"
                    alt="Duchess of Devonshire Portrait Diamond, 19th c. Met Museum"
                    fill
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="sm:col-span-7 flex flex-col gap-2">
                  <h3 className="font-heading text-xl font-normal text-foreground">
                    Duchess of Devonshire Portrait Diamond
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    19th-century portrait diamond cut so extraordinarily thin it was mounted over miniature portraits like optical glass.
                  </p>
                  <span className="text-sm text-primary font-medium">
                    Accession 811876 • The Metropolitan Museum of Art (CC0)
                  </span>
                </div>
              </MotionItem>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 5: BESPOKE SALON CONCIERGE (Warm Architectural Sand Field) ── */}
      <section className="bg-muted text-foreground px-6 md:px-12 xl:px-16 py-28 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Invitation: Sticky through the full 4-city salon ledger */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <MotionSection>
              <h2 className="font-heading text-3xl font-normal text-foreground sm:text-5xl leading-tight">
                Private Salon Appointments
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-prose">
                Experience high jewelry collections in total privacy. Each appointment provides dedicated gemological consultation, champagne service, and complete vault access.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="bg-primary text-primary-foreground px-8 py-4 text-base font-medium inline-block transition-transform duration-150 active:scale-[0.98] hover:bg-primary/90"
                >
                  Schedule Private Consultation
                </Link>
              </div>
            </MotionSection>
          </div>

          {/* Right Coordinates: Architectural 4-City Tabular Ledger */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {BRAND.salons.map((salon, idx) => (
              <MotionItem
                key={salon.id}
                delay={0.1 + idx * 0.05}
                className="bg-secondary p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground">
                    {salon.name}
                  </h3>
                  <p className="text-base text-muted-foreground mt-0.5">
                    {salon.address} • {salon.schedule}
                  </p>
                </div>
                <Link
                  href="/consultation"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 shrink-0"
                >
                  {salon.ctaLabel}
                </Link>
              </MotionItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER 6: MONUMENTAL NOIR CLOSE (Footer) ── */}
      <SiteFooter atelierName={settings.atelierName} />
    </div>
  );
}
