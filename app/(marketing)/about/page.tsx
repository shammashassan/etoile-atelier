import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Gem,
  RefreshCw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { BRAND } from "@/lib/data";
import { getSiteSettings } from "@/lib/queries/settings";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { DailyGoldRateBar } from "@/components/shared/DailyGoldRateBar";
import { LuxuryMarquee } from "@/components/shared/LuxuryMarquee";
import { CardTilt } from "@/components/shared/motion/CardTilt";
import { FacetGlint } from "@/components/shared/motion/FacetGlint";
import { MagneticButton } from "@/components/shared/motion/MagneticButton";
import { ScrollProgress } from "@/components/shared/motion/ScrollProgress";
import { ScrollParallax } from "@/components/shared/motion/ScrollParallax";
import {
  MotionSection,
  MotionItem,
  MaskedLineHeadline,
  BlurFade,
} from "@/components/shared/motion/MotionSection";

export const metadata: Metadata = {
  title: BRAND.seo.aboutTitle,
  description: BRAND.seo.aboutDescription,
  alternates: {
    canonical: "/about",
  },
};

const MILESTONES = [
  {
    year: "1993",
    title: "The Thrissur Goldsmith Foundation",
    desc: "Established on Round West in Thrissur as a master craftsman atelier specializing in Kasavu filigree, temple kadas, and sovereign 22K bridal goldsmithing.",
  },
  {
    year: "2002",
    title: "Calicut Atelier & Malabar Heritage",
    desc: "Inaugurated our Mavoor Road salon in Kozhikode, reviving historic Travancore Palakka cabochons and basra natural pearl sautoirs for Malabar wedding families.",
  },
  {
    year: "2011",
    title: "Kochi Marine Drive Flagship Pavilion",
    desc: "Opened our premier coastal viewing pavilion on Shanmugham Road, featuring private VIP bridal viewing suites, in-house Karattmeter spectrometry, and GIA diamond vaults.",
  },
  {
    year: "2018",
    title: "Dubai DIFC Gate Precinct Salon",
    desc: "Expanded to the United Arab Emirates to serve the Gulf Malayalee community with seamless cross-border bridal trousseau delivery and UAE vault collections.",
  },
  {
    year: "2026",
    title: "The Sovereign Transparency Standard",
    desc: "Pioneering 100% laser HUID traceability, zero-deduction gold exchange, and confidential 1-on-1 virtual video consultations worldwide.",
  },
];

const ABOUT_MARQUEE_ITEMS = [
  "Hereditary Thrissur Master Goldsmiths • Est. 1993",
  "100% BIS 916 Sovereign 22K Gold",
  "Kerala Kasavu Openwork Filigree",
  "Travancore Royal Palakka Heritage",
  "Salons: Kochi • Kozhikode • Thrissur • Dubai",
  "Zero Deduction Gold Exchange Guarantee",
  "GIA & IGI Certified Natural Diamonds",
  "Archival Temple & Sovereign Jewelry",
];

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Government HUID Hallmark",
    body: "Every piece is laser-engraved with a unique 6-digit alphanumeric code verifiable via the BIS Care app — sovereign purity that travels with the jewel.",
  },
  {
    icon: Gem,
    title: "Natural Untreated Gems",
    body: "Zambian emeralds, unheated Ceylon rubies, and natural VVS diamonds certified by GIA, IGI, and SSEF — each with full gemological provenance.",
  },
  {
    icon: RefreshCw,
    title: "Zero-Deduction Exchange",
    body: "Full prevailing market rate credited on 22K gold exchanges across all Kerala and Dubai showrooms. No hidden deductions, ever.",
  },
  {
    icon: Sparkles,
    title: "Complete Price Transparency",
    body: "Each invoice discloses exact net gold weight, stone weight, stone charges, and making charges — open-book pricing as an Amara standard.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-svh flex-col text-foreground overflow-x-clip">
      {/* Hairline Gold Scroll Progress — matches home page */}
      <ScrollProgress />

      {/* Daily Live Gold Rate Benchmark */}
      <DailyGoldRateBar />

      {/* Haute Joaillerie Header */}
      <SiteHeader
        announcementBar={settings.announcementBar}
        atelierName={settings.atelierName}
      />

      <main className="flex-1 bg-background">

        {/* ── CHAPTER 1: ASYMMETRIC EDITORIAL HERO ── */}
        <section className="px-6 md:px-12 xl:px-16 pt-12 pb-0 lg:pt-20">
          <div className="grid gap-8 lg:grid-cols-12 items-end max-w-7xl mx-auto">

            {/* Left: Monumental headline — left-aligned, masked line reveal */}
            <div className="lg:col-span-7">
              <MaskedLineHeadline
                lines={["Three Decades of", "Sovereign Purity."]}
                tag="h1"
                className="text-4xl sm:text-6xl lg:text-7xl leading-[1.05]"
              />
            </div>

            {/* Right: Supporting statement + stat pair */}
            <MotionItem delay={0.25} className="lg:col-span-5 lg:pb-2">
              <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                Rooted in the hereditary goldsmith traditions of Thrissur and the spice coast of Kozhikode, Amara Gold bridges archival Kerala royal heritage with uncompromising modern purity.
              </p>
              <div className="mt-8 flex gap-10 border-t border-border/50 pt-6">
                <div>
                  <span className="font-heading text-4xl font-light text-foreground block tabular-nums">33+</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider block mt-1">Years of Sovereign Trust</span>
                </div>
                <div>
                  <span className="font-heading text-4xl font-light text-foreground block tabular-nums">100%</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider block mt-1">BIS 916 HUID Hallmarked</span>
                </div>
              </div>
            </MotionItem>
          </div>

          {/* Full-bleed master visual — sits flush below the headline grid */}
          <BlurFade delay={0.4} className="mt-12 max-w-7xl mx-auto">
            <CardTilt maxTilt={2.5}>
              <div className="relative aspect-21/9 w-full overflow-hidden bg-secondary">
                <Image
                  src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877321/etoile-atelier/artisan-workbench.jpg"
                  alt="Thrissur Master Goldsmith Workbench at Amara Gold"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                />
                <FacetGlint />
                {/* Scrim caption — only exception to no-gradient rule: text on photo */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <span className="font-heading text-lg sm:text-2xl text-white font-normal block">
                    Multi-generational goldsmiths sculpting openwork Kasavu filigree and bezel-set cabochons.
                  </span>
                  <span className="text-xs text-white/60 mt-2 block uppercase tracking-wider">
                    The Artisan Workbench · Thrissur, Kerala
                  </span>
                </div>
              </div>
            </CardTilt>
          </BlurFade>
        </section>

        {/* ── CONTINUOUS MARQUEE ── */}
        <div className="mt-12 sm:mt-16">
          <LuxuryMarquee speed={20} variant="dark" items={ABOUT_MARQUEE_ITEMS} />
        </div>

        {/* ── CHAPTER 2: THRISSUR GOLDSMITH LINEAGE — Full-bleed two-column ── */}
        <section className="px-6 md:px-12 xl:px-16 py-20 lg:py-32 bg-secondary/30 border-y border-border/50">
          <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-center max-w-7xl mx-auto">

            {/* Left: editorial narrative */}
            <MotionSection className="lg:col-span-6 space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
                Hereditary Masters of the Gold Capital
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Thrissur produces over 70% of Kerala&apos;s celebrated wedding jewellery. At Amara Gold, our senior goldsmiths belong to multi-generational Vishwakarma artisan families whose lineage spans royal commissions for the Travancore and Cochin royal houses.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Unlike machine-stamped lightweight ornaments, each Amara Gold creation is hand-drawn through sovereign gold wire dies, chiseled with Kasavu lace openwork, and assembled with traditional closed-bezel settings that ensure heirloom durability across generations.
              </p>
            </MotionSection>

            {/* Right: vertical shutter image of a second piece */}
            <MotionItem delay={0.15} className="lg:col-span-6">
              <ScrollParallax offsetY={24}>
                <CardTilt maxTilt={4}>
                  <Link
                    href="/products/kasavu-filigree-diamond-kada"
                    className="block relative aspect-4/5 w-full overflow-hidden bg-card border border-border/70 group"
                  >
                    <Image
                      src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877319/etoile-atelier/aura-sculpted-diamond-cuff.jpg"
                      alt="Kasavu Filigree Diamond Kada in 22k Sovereign Gold"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                    />
                    <FacetGlint />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                      <span className="font-heading text-xl sm:text-2xl text-white font-normal block">
                        4.20ctw Diamonds in 22k Sovereign Gold
                      </span>
                      <span className="text-xs text-white/60 mt-1 block uppercase tracking-wider">
                        Kasavu Filigree Kada · Signature Creation
                      </span>
                    </div>
                  </Link>
                </CardTilt>
              </ScrollParallax>
            </MotionItem>
          </div>
        </section>

        {/* ── CHAPTER 3: THE FOUR PILLARS — dark field, no icon cards ── */}
        <section className="dark bg-background text-foreground px-6 md:px-12 xl:px-16 py-20 lg:py-32 border-b border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-16 lg:grid-cols-12 items-start">

              {/* Left: sticky label + headline */}
              <MotionSection className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                <h2 className="font-heading text-3xl sm:text-5xl font-normal text-foreground leading-tight">
                  The Amara Gold Standard
                </h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-prose">
                  Four uncompromising commitments that govern every creation leaving our ateliers.
                </p>
              </MotionSection>

              {/* Right: four commitment rows — no icon cards, text-led */}
              <div className="lg:col-span-7 space-y-0 divide-y divide-border/40">
                {PILLARS.map((pillar, idx) => (
                  <MotionItem key={pillar.title} delay={idx * 0.08} className="py-8 first:pt-0 last:pb-0">
                    <div className="flex gap-5 items-start">
                      <pillar.icon className="size-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div className="space-y-2">
                        <h3 className="font-heading text-lg sm:text-xl font-normal text-foreground">{pillar.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 4: MILESTONES — editorial chronology, no timeline hairline ── */}
        <section className="px-6 md:px-12 xl:px-16 py-20 lg:py-32 bg-muted/40 border-b border-border/50">
          <div className="max-w-7xl mx-auto">
            <MotionSection>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-normal text-foreground leading-tight max-w-2xl">
                Milestones in Kerala High Jewellery
              </h2>
            </MotionSection>

            {/* Milestone grid — alternating large-year / text layout */}
            <div className="mt-16 lg:mt-20 space-y-0 divide-y divide-border/40">
              {MILESTONES.map((m, idx) => (
                <MotionItem key={m.year} delay={idx * 0.07}>
                  <div className="group grid grid-cols-12 gap-6 py-10 items-start cursor-default transition-colors duration-300 hover:bg-secondary/60 -mx-4 px-4 sm:-mx-6 sm:px-6">
                    {/* Year — large display numeral, brightens on hover */}
                    <div className="col-span-12 sm:col-span-3 lg:col-span-2">
                      <span className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tabular-nums leading-none transition-colors duration-300 text-accent/60 group-hover:text-accent">
                        {m.year}
                      </span>
                    </div>
                    {/* Content — title lifts slightly, desc sharpens */}
                    <div className="col-span-12 sm:col-span-9 lg:col-span-10 space-y-2 pt-1">
                      <h3 className="font-heading text-xl sm:text-2xl font-normal transition-colors duration-300 text-foreground/80 group-hover:text-foreground">{m.title}</h3>
                      <p className="text-sm sm:text-base leading-relaxed max-w-2xl transition-colors duration-300 text-muted-foreground group-hover:text-foreground/70">{m.desc}</p>
                    </div>
                  </div>
                </MotionItem>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHAPTER 5: PRIVATE CONSULTATION CTA — warm muted field, separated from footer ── */}
        <section className="bg-muted text-foreground px-6 md:px-12 xl:px-16 py-24 lg:py-36 border-t border-border/40">
          <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-12 items-end">

            {/* Left: monumental headline */}
            <MotionSection className="lg:col-span-7">
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-normal text-foreground leading-[1.05]">
                Experience the<br className="hidden sm:block" /> Amara Standard
              </h2>
            </MotionSection>

            {/* Right: body + CTAs */}
            <MotionItem delay={0.2} className="lg:col-span-5 lg:pb-2">
              <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                Schedule a confidential viewing in our private suites across Kochi, Kozhikode, Thrissur, or Dubai — or request a live 1-on-1 NRI video consultation.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/consultation">
                  <MagneticButton strength={0.3} variant="accent">
                    <span>Schedule Private Viewing</span>
                  </MagneticButton>
                </Link>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-accent transition-colors underline underline-offset-4"
                >
                  <span>Browse 916 Catalog</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </MotionItem>
          </div>
        </section>
      </main>

      {/* Monumental Noir Footer */}
      <SiteFooter atelierName={settings.atelierName} />
    </div>
  );
}
