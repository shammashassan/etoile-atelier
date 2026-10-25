import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Sparkles, Eye, ShieldCheck } from "lucide-react";
import { getFeaturedProducts } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { BRAND } from "@/lib/data";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { JewelryStudioClient } from "@/components/shared/JewelryStudioClient";
import { HeroPhotographicRail } from "@/components/shared/HeroPhotographicRail";
import { SalonLedgerInteractive } from "@/components/shared/SalonLedgerInteractive";
import { ScrollProgress } from "@/components/shared/motion/ScrollProgress";
import { CardTilt } from "@/components/shared/motion/CardTilt";
import { MagneticButton } from "@/components/shared/motion/MagneticButton";
import { CursorSpotlight } from "@/components/shared/motion/CursorSpotlight";
import { FacetGlint } from "@/components/shared/motion/FacetGlint";
import {
  MotionSection,
  MotionItem,
  MaskedLineHeadline,
  BlurFade,
  TextShimmer,
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
    <div className="flex min-h-svh flex-col text-foreground overflow-x-clip selection:bg-primary selection:text-primary-foreground">
      {/* Hairline Gold Scroll Progress */}
      <ScrollProgress />

      {/* ── CHAPTER 1: THE ALABASTER PAVILION (Warm French Limestone Field) ── */}
      <section className="bg-background text-foreground">
        {/* Unified Haute Joaillerie Site Header */}
        <SiteHeader
          announcementBar={settings.announcementBar}
          atelierName={settings.atelierName}
        />

        {/* HERO: Asymmetric Photographic Rail (three-prints-one-line) */}
        <div className="px-6 md:px-12 xl:px-16 pt-10 pb-20 lg:pt-16 lg:pb-32">
          {/* Top Line: Monumental Masked Headline Left + Off-Center Statement Right */}
          <div className="grid gap-8 lg:grid-cols-12 items-baseline mb-16 lg:mb-20">
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
                <Link href="/collections" className="inline-block">
                  <MagneticButton strength={0.3}>
                    <span>Explore Salon Catalog</span>
                  </MagneticButton>
                </Link>
              </div>
            </MotionItem>
          </div>

          {/* Uneven Tri-Print Rail (Mobile Touch Swipe Carousel + Desktop Asymmetric Rail) */}
          <HeroPhotographicRail />
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
              <MotionItem delay={0.1} className="flex flex-col gap-4 group/card">
                <CardTilt maxTilt={5}>
                  <Link href={`/products/${products[0].slug}`} className="block relative overflow-hidden bg-secondary">
                    <div className="relative aspect-16/10 w-full overflow-hidden">
                      {products[0].images[0] && (
                        <Image
                          src={products[0].images[0].url}
                          alt={products[0].title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 65vw"
                          className="object-cover transition-transform duration-1000 ease-out group-hover/card:scale-[1.03]"
                        />
                      )}
                      <FacetGlint />
                      {/* Floating Inspection Pill */}
                      <div className="pointer-events-none absolute bottom-4 left-4 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0">
                        <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-foreground border border-border/60 shadow-xl">
                          <Eye className="size-3 text-primary" />
                          <span>Inspect Masterwork Dossier ↗</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </CardTilt>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2">
                  <div>
                    <Link
                      href={`/products/${products[0].slug}`}
                      className="font-heading text-2xl font-normal text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <span>{products[0].title}</span>
                      <ArrowUpRight className="size-4 opacity-0 group-hover/card:opacity-100 transition-opacity" />
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
                <MotionItem key={item.slug} delay={0.2 * (idx + 1)} className="flex flex-col gap-3 group/card">
                  <CardTilt maxTilt={6}>
                    <Link href={`/products/${item.slug}`} className="block relative overflow-hidden bg-secondary">
                      <div className="relative aspect-4/3 w-full overflow-hidden">
                        {item.images[0] && (
                          <Image
                            src={item.images[0].url}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 30vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                          />
                        )}
                        <FacetGlint />
                        {/* Floating inspect micro-tag */}
                        <div className="pointer-events-none absolute bottom-3 left-3 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0">
                          <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3 py-1 text-xs font-mono text-foreground border border-border/60 shadow-lg">
                            <Eye className="size-3 text-primary" />
                            <span>View Piece ↗</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </CardTilt>
                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-heading text-xl font-normal text-foreground block hover:text-primary transition-colors"
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
      <section id="vault" className="dark bg-background text-foreground scroll-mt-24 md:scroll-mt-32">
        <CursorSpotlight spotlightColor="rgba(212, 175, 55, 0.12)" spotlightSize={520} className="px-6 md:px-12 xl:px-16 py-20 lg:py-32">
          <div className="flex flex-col gap-20">
            {/* Header on Dark Ground */}
            <div className="grid gap-8 lg:grid-cols-12 items-baseline">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary">
                    Permanent Archives • Paris 1924
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                  The Place Vendôme Vault: Permanent Atelier Archives
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                  Historic mountings, master stone-setting techniques, and unheated gemstone specimens preserved in our Place Vendôme archival collections.
                </p>
              </div>
            </div>

            {/* Asymmetric Staggered Pairs in Dark Room */}
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Atelier Archive 1: Verdant Colombian Emerald Drops (Cols 1-5, Tall Portrait Frame) */}
              <MotionItem delay={0.1} className="lg:col-span-5 flex flex-col gap-4 group/vault">
                <CardTilt maxTilt={6}>
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-card border border-border/40">
                    <Image
                      src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877320/etoile-atelier/verdant-colombian-emerald-drops.jpg"
                      alt="Verdant Colombian Emerald Drop earrings in 18k gold"
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/vault:scale-105"
                    />
                    <FacetGlint />
                    <div className="pointer-events-none absolute bottom-4 left-4 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/vault:opacity-100 group-hover/vault:translate-y-0">
                      <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-primary border border-primary/40 shadow-xl">
                        <Sparkles className="size-3 text-primary animate-pulse" />
                        <span>Muzo Colombian Specimen</span>
                      </span>
                    </div>
                  </div>
                </CardTilt>
                <div className="flex flex-col gap-1 pt-2">
                  <h3 className="font-heading text-2xl font-normal text-foreground group-hover/vault:text-primary transition-colors">
                    Verdant Colombian Emerald Drops
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Matched 5.10-carat vivid green Muzo Colombian emeralds suspended beneath brilliant-cut diamond studs in warm 18k yellow gold.
                  </p>
                  <span className="text-sm text-primary font-medium mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5" />
                    Archive No. 004 • SSEF Certified Natural Untreated
                  </span>
                </div>
              </MotionItem>

              {/* Atelier Archive 2 & 3: Staggered Right Stack (Cols 6-12) */}
              <div className="lg:col-span-7 flex flex-col gap-16 lg:mt-12">
                {/* Atelier Archive 2: Aura Sculpted Diamond Cuff (Wide Landscape) */}
                <MotionItem delay={0.2} className="flex flex-col gap-4 group/vault">
                  <CardTilt maxTilt={5}>
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-card border border-border/40">
                      <Image
                        src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877319/etoile-atelier/aura-sculpted-diamond-cuff.jpg"
                        alt="Aura Sculpted Diamond Cuff in solid 18k yellow gold"
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/vault:scale-105"
                      />
                      <FacetGlint />
                      <div className="pointer-events-none absolute bottom-4 left-4 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/vault:opacity-100 group-hover/vault:translate-y-0">
                        <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-primary border border-primary/40 shadow-xl">
                          <Sparkles className="size-3 text-primary animate-pulse" />
                          <span>Solid 18k Gold Sculpture</span>
                        </span>
                      </div>
                    </div>
                  </CardTilt>
                  <div className="flex flex-col gap-1 pt-2">
                    <h3 className="font-heading text-2xl font-normal text-foreground group-hover/vault:text-primary transition-colors">
                      Aura Architectural Diamond Cuff
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Solid 18-karat sculpted yellow gold hinged bangle featuring 4.20 carats of pavé-set round brilliant F/VS diamonds arranged in graduating ribbons of light.
                    </p>
                    <span className="text-sm text-primary font-medium mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5" />
                      Archive No. 003 • Place Vendôme Atelier Hallmarked
                    </span>
                  </div>
                </MotionItem>

                {/* Atelier Archive 3: Constellation Eternity Band */}
                <MotionItem delay={0.3} className="grid sm:grid-cols-12 gap-6 items-center bg-card p-6 md:p-8 border border-border/40 group/vault">
                  <div className="sm:col-span-5 relative aspect-square w-full overflow-hidden bg-secondary">
                    <CardTilt maxTilt={7}>
                      <div className="relative size-full aspect-square">
                        <Image
                          src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877320/etoile-atelier/constellation-eternity-band.jpg"
                          alt="Constellation Emerald-Cut Diamond Eternity Band in Platinum 950"
                          fill
                          sizes="(max-width: 640px) 100vw, 20vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover/vault:scale-105"
                        />
                        <FacetGlint />
                      </div>
                    </CardTilt>
                  </div>
                  <div className="sm:col-span-7 flex flex-col gap-2">
                    <h3 className="font-heading text-xl font-normal text-foreground group-hover/vault:text-primary transition-colors">
                      Constellation Step-Cut Eternity Band
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Continuous open-gallery Platinum 950 eternity mounting elevating 18 calibrated emerald-cut diamonds with geometric hall-of-mirrors light reflection.
                    </p>
                    <span className="text-sm text-primary font-medium flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5" />
                      Archive No. 005 • GIA Master Diamond Grade
                    </span>
                  </div>
                </MotionItem>
              </div>
            </div>
          </div>
        </CursorSpotlight>
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
                <Link href="/consultation" className="inline-block">
                  <MagneticButton strength={0.3}>
                    <span>Schedule Private Consultation</span>
                  </MagneticButton>
                </Link>
              </div>
            </MotionSection>
          </div>

          {/* Right Coordinates: Interactive 4-City Salon Ledger with Live Time */}
          <div className="lg:col-span-7">
            <SalonLedgerInteractive />
          </div>
        </div>
      </section>

      {/* ── CHAPTER 6: MONUMENTAL NOIR CLOSE (Footer) ── */}
      <SiteFooter atelierName={settings.atelierName} />
    </div>
  );
}
