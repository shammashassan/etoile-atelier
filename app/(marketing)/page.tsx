import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { BRAND } from "@/lib/data";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { DailyGoldRateBar } from "@/components/shared/DailyGoldRateBar";
import { KeralaCategoryGrid } from "@/components/shared/KeralaCategoryGrid";
import { JewelryStudioClient } from "@/components/shared/JewelryStudioClient";
import { HeroPhotographicRail } from "@/components/shared/HeroPhotographicRail";
import { LuxuryMarquee } from "@/components/shared/LuxuryMarquee";
import { FullBleedHeritageSection } from "@/components/shared/FullBleedHeritageSection";
import { ImperialVaultCarousel } from "@/components/shared/ImperialVaultCarousel";
import { SalonLedgerInteractive } from "@/components/shared/SalonLedgerInteractive";
import { ScrollProgress } from "@/components/shared/motion/ScrollProgress";
import { MagneticButton } from "@/components/shared/motion/MagneticButton";
import {
  MotionSection,
  MotionItem,
  MaskedLineHeadline,
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

const HERITAGE_MARQUEE_ITEMS = [
  "100% BIS 916 Sovereign 22K Gold",
  "Hereditary Thrissur Master Goldsmiths",
  "Kerala Kasavu Openwork Filigree",
  "Travancore Royal Palakka & Nagapadam",
  "Salons: Kochi • Kozhikode • Thrissur • Dubai",
  "Zero Deduction Gold Exchange Guarantee",
  "Direct Kerala Vault Appointments",
  "Archival Temple & Sovereign Jewelry Heritage",
];

const GEMOLOGICAL_MARQUEE_ITEMS = [
  "Amara Gold Certified VVS Natural Diamonds",
  "IGI & GIA Master Gemological Certification",
  "Unheated Natural Ceylon & Burma Rubies",
  "Zambian Emerald Drops in 22K Bezels",
  "Complete Price & Weight Transparency with HUID",
  "Guaranteed Buyback & Lifetime Maintenance",
  "Confidential Salon Viewing in Private Suites",
  "Conflict-Free Ethical Sourcing Protocol",
];

export default async function Home() {
  const [products, settings] = await Promise.all([
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex min-h-svh flex-col text-foreground overflow-x-clip">
      {/* Hairline Gold Scroll Progress */}
      <ScrollProgress />

      {/* Live Benchmark Kerala Daily Gold Rate Bar */}
      <DailyGoldRateBar />

      {/* ── CHAPTER 1: THE ALABASTER PAVILION (Warm Kerala Limestone Field) ── */}
      <section className="bg-background text-foreground">
        {/* Unified Haute Joaillerie Site Header */}
        <SiteHeader
          announcementBar={settings.announcementBar}
          atelierName={settings.atelierName}
        />

        {/* HERO: Asymmetric Photographic Rail (three-prints-one-line) */}
        <div className="px-6 md:px-12 xl:px-16 pt-10 pb-16 lg:pt-16 lg:pb-24">
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
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/collections" className="inline-block">
                  <MagneticButton strength={0.3} variant="primary">
                    <span>Explore Amara Gold Catalog</span>
                  </MagneticButton>
                </Link>
                <Link
                  href="#vault-carousel"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors underline underline-offset-4"
                >
                  <span>View Archival Vault Carousel</span>
                  <ArrowRight className="size-3.5 text-accent" />
                </Link>
              </div>
            </MotionItem>
          </div>

          {/* Uneven Tri-Print Rail (Mobile Touch Swipe Carousel + Desktop Asymmetric Rail with Scroll Parallax) */}
          <HeroPhotographicRail products={products} settings={settings} />
        </div>
      </section>

      {/* ── CHAPTER 2: TRADITIONAL KERALA JEWELLERY TAXONOMY GRID ── */}
      <KeralaCategoryGrid />

      {/* ── CHAPTER 3: FULL BLEED CINEMATIC HERITAGE SECTION (Thrissur & Kerala Coast) ── */}
      <FullBleedHeritageSection />

      {/* ── CONTINUOUS LUXURY MARQUEE TICKER 1 (BLACK NOIR RIBBON - SCROLL TRIGGERED) ── */}
      <LuxuryMarquee speed={18} variant="dark" items={HERITAGE_MARQUEE_ITEMS} />

      {/* ── CHAPTER 4: IMPERIAL HIGH JEWELRY ARCHIVAL CAROUSEL (The Single Master Showcase) ── */}
      <section className="bg-background text-foreground px-6 md:px-12 xl:px-16 py-20 lg:py-32 scroll-mt-24 md:scroll-mt-32">
        <ImperialVaultCarousel products={products} />
      </section>

      {/* ── CONTINUOUS LUXURY MARQUEE TICKER 2 (INVERTED NOIR RIBBON - REVERSE SCROLL TRIGGERED) ── */}
      <LuxuryMarquee speed={20} reverse variant="dark" items={GEMOLOGICAL_MARQUEE_ITEMS} />

      {/* ── CHAPTER 5: THE OPTICAL & METALLURGY BENCH (Dark Gemological Slate Field) ── */}
      <section id="studio" className="dark bg-background text-foreground px-4 sm:px-6 md:px-12 xl:px-16 py-12 lg:py-20 scroll-mt-24 md:scroll-mt-32 w-full max-w-full overflow-hidden border-b border-border/30">
        <JewelryStudioClient products={products} />
      </section>

      {/* ── CHAPTER 6: BESPOKE SALON CONCIERGE (Warm Architectural Sand Field) ── */}
      <section className="bg-muted text-foreground px-6 md:px-12 xl:px-16 py-28 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Invitation: Sticky through the full 4-city salon ledger */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <MotionSection>
              <h2 className="font-heading text-3xl font-normal text-foreground sm:text-5xl leading-tight">
                Private Bridal Salon Appointments
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-prose">
                Experience Kerala high jewelry creations in total privacy. Each appointment provides dedicated gemological consultation, fresh tender coconut water or champagne service, and complete vault access across Kochi, Kozhikode, Thrissur, and Dubai.
              </p>
              <div className="mt-8">
                <Link href="/consultation" className="inline-block">
                  <MagneticButton strength={0.3} variant="accent">
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

      {/* ── CHAPTER 7: MONUMENTAL NOIR CLOSE (Footer) ── */}
      <SiteFooter atelierName={settings.atelierName} />
    </div>
  );
}
