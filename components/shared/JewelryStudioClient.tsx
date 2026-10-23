"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { type Product } from "@/lib/schemas/product";
import { BRAND } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface JewelryStudioClientProps {
  products: Product[];
}

type LightingMode = "daylight" | "candlelight" | "bench";
type AlloyOption = "Platinum 950" | "18k Yellow Gold" | "18k Rose Gold";

export function JewelryStudioClient({ products }: JewelryStudioClientProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(products[0]?.slug || "");
  const [lighting, setLighting] = useState<LightingMode>("daylight");
  const [alloy, setAlloy] = useState<AlloyOption>("Platinum 950");
  const [lightAngle, setLightAngle] = useState<number>(15);
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(false);

  const activeProduct = products.find((p) => p.slug === selectedSlug) || products[0];
  const primaryImage = activeProduct?.images.find((img) => img.isPrimary) || activeProduct?.images[0];

  const lightingProfiles: Record<
    LightingMode,
    { label: string; temp: string; filter: string; toneName: string; desc: string }
  > = {
    daylight: {
      label: "Natural Daylight",
      temp: "5500K",
      filter: "brightness(1.04) contrast(1.08) saturate(1.05)",
      toneName: "Diamond Scintillation Standard",
      desc: "Reveals genuine diamond color grade and brilliant optical dispersion under direct northern light.",
    },
    candlelight: {
      label: "Salon Candlelight",
      temp: "2700K",
      filter: "brightness(0.98) contrast(1.12) sepia(0.22) saturate(1.25)",
      toneName: `${BRAND.headquarters.district} Evening Gala`,
      desc: "Warm incandescent atmosphere accentuating fire dispersion and precious metal lusters.",
    },
    bench: {
      label: "Jeweler's Bench",
      temp: "4000K",
      filter: "brightness(1.1) contrast(1.18) saturate(0.95)",
      toneName: "Master Craftsman Inspection",
      desc: "High-CRI precision illumination for examining micro-pavé prongs and clarity inclusions.",
    },
  };

  const currentProfile = lightingProfiles[lighting];

  if (!activeProduct) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full text-foreground"
    >
      {/* Studio Header */}
      <div className="mb-10 sm:mb-14 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground block mb-3">
          Interactive Gemological Bench
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-tight">
          Atelier Optical &amp; Metallurgy Studio
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
          Examine gemstones under calibrated salon lighting spectra, rotate incident light across hand-cut facets, and inspect micro-pavé metallurgy.
        </p>
      </div>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Visualizer Canvas + Light Controls + Gemological Dossier (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Master Jewel Artwork Display */}
          <div className="relative aspect-4/3 w-full overflow-hidden bg-card/60 border border-border/40">
            <motion.div
              key={`${activeProduct.slug}-${alloy}`}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: isLoupeActive ? 1.55 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full"
              style={{
                filter: currentProfile.filter,
                transformOrigin: "50% 50%",
              }}
            >
              {primaryImage && (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || activeProduct.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                  className="object-cover"
                />
              )}

              {/* Dynamic Facet Refraction Glint based on Light Angle */}
              <div
                className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
                style={{
                  background: `linear-gradient(${90 + lightAngle}deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)`,
                  opacity: 0.8,
                }}
              />
            </motion.div>

            {/* Specimen Tag overlay */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-background/90 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-foreground backdrop-blur-sm border border-border/30">
              {activeProduct.caratWeight ? `${activeProduct.caratWeight} ct` : "Fine Specimen"} • {activeProduct.gemstones[0]}
            </div>

            {/* Loupe Toggle Indicator */}
            {isLoupeActive && (
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-primary text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium">
                10× Gemological Loupe Active
              </div>
            )}
          </div>

          {/* Interactive Bench Controls: Angle Slider & Loupe Toggle */}
          <div className="bg-card p-5 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 border border-border/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <span className="text-sm sm:text-base font-medium text-foreground block">
                  Incident Light Angle
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Rotate illumination vector across facets ({lightAngle > 0 ? `+${lightAngle}°` : `${lightAngle}°`})
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Slider
                  min={-45}
                  max={45}
                  value={[lightAngle]}
                  onValueChange={(v) => setLightAngle((v as number[])[0])}
                  aria-label="Incident light angle"
                  className="w-full sm:w-48 xl:w-56"
                />
                <span className="text-xs font-mono text-muted-foreground w-10 text-right sm:hidden">
                  {lightAngle > 0 ? `+${lightAngle}°` : `${lightAngle}°`}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/30">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Calibrated Spectrum: <strong className="text-foreground font-medium">{currentProfile.toneName} ({currentProfile.temp})</strong>
              </span>
              <Button
                type="button"
                variant={isLoupeActive ? "default" : "secondary"}
                size="sm"
                onClick={() => setIsLoupeActive(!isLoupeActive)}
                className="w-full sm:w-auto rounded-none text-xs sm:text-sm"
              >
                {isLoupeActive ? "Exit 10× Magnification" : "Engage 10× Gemological Loupe"}
              </Button>
            </div>
          </div>

          {/* Gemological Specifications Dossier (Balances Column Height & Eliminates Empty Void) */}
          <div className="bg-card p-5 sm:p-6 md:p-8 border border-border/40">
            <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-border/30">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground block">
                  Laboratory Specifications
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-normal text-foreground mt-0.5">
                  Gemological Dossier
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-secondary text-muted-foreground">
                GIA Verified
              </span>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-base">
              <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20">
                <dt className="text-muted-foreground text-xs sm:text-sm">Primary Gemstone</dt>
                <dd className="font-medium text-foreground">{activeProduct.gemstones.join(", ")}</dd>
              </div>
              {activeProduct.caratWeight && (
                <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20">
                  <dt className="text-muted-foreground text-xs sm:text-sm">Total Carat Weight</dt>
                  <dd className="font-medium text-foreground">{activeProduct.caratWeight} ct</dd>
                </div>
              )}
              {activeProduct.clarity && (
                <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20">
                  <dt className="text-muted-foreground text-xs sm:text-sm">Clarity Certification</dt>
                  <dd className="font-medium text-foreground">{activeProduct.clarity}</dd>
                </div>
              )}
              {activeProduct.cutGrade && (
                <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20">
                  <dt className="text-muted-foreground text-xs sm:text-sm">Cut Proportion</dt>
                  <dd className="font-medium text-foreground">{activeProduct.cutGrade} Symmetry</dd>
                </div>
              )}
              <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20">
                <dt className="text-muted-foreground text-xs sm:text-sm">Mounting Metallurgy</dt>
                <dd className="font-medium text-foreground">{alloy}</dd>
              </div>
              <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20">
                <dt className="text-muted-foreground text-xs sm:text-sm">Provenance &amp; Ethics</dt>
                <dd className="font-medium text-foreground">Kimberley Process Audited</dd>
              </div>
            </dl>

            <div className="mt-5 pt-3 border-t border-border/20 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary shrink-0" />
              <span>Stamped with official French State Master Jeweler Assay hallmark.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specimen Selection + Spectra + Metallurgy + Acquisition Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
          {/* Specimen Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm sm:text-base font-medium text-foreground">
                Select Salon Masterpiece
              </span>
              <span className="text-xs text-muted-foreground sm:hidden">
                Swipe to browse ({products.length})
              </span>
            </div>

            {/* Mobile Horizontal Carousel */}
            <div className="flex sm:hidden gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x -mx-1 px-1">
              {products.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedSlug(item.slug)}
                  className={`snap-start shrink-0 w-44 p-3 text-left transition-all border ${item.slug === activeProduct.slug
                      ? "bg-primary text-primary-foreground font-medium border-primary"
                      : "bg-card text-foreground hover:bg-secondary border-border/40"
                    }`}
                >
                  <span className="text-sm block line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-xs opacity-85 block mt-1">
                    ${item.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>

            {/* Desktop 2-Column Grid */}
            <div className="hidden sm:grid grid-cols-2 gap-2.5">
              {products.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedSlug(item.slug)}
                  className={`p-3.5 text-left transition-all border ${item.slug === activeProduct.slug
                      ? "bg-primary text-primary-foreground font-medium border-primary"
                      : "bg-card text-foreground hover:bg-secondary border-border/40"
                    }`}
                >
                  <span className="text-sm sm:text-base block line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-xs sm:text-sm opacity-85 block mt-1">
                    ${item.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Illumination Spectra Selector */}
          <div>
            <span className="text-sm sm:text-base font-medium text-foreground block mb-3">
              Calibrated Illumination Spectrum
            </span>
            <div className="flex flex-col gap-2.5">
              {(Object.keys(lightingProfiles) as LightingMode[]).map((mode) => {
                const prof = lightingProfiles[mode];
                const isActive = lighting === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setLighting(mode)}
                    className={`p-3.5 sm:p-4 text-left transition-all flex items-baseline justify-between border ${isActive
                        ? "bg-secondary text-foreground pl-4 sm:pl-5 font-medium border-primary/50"
                        : "bg-card text-muted-foreground hover:text-foreground pl-3 sm:pl-4 border-border/40"
                      }`}
                  >
                    <div>
                      <span className="text-sm sm:text-base font-medium block text-foreground">
                        {prof.label}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground mt-0.5 block line-clamp-2 sm:line-clamp-none">
                        {prof.desc}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm shrink-0 ml-3 sm:ml-4 font-normal text-muted-foreground">
                      {prof.temp}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metallurgy Alloy Selector */}
          <div>
            <span className="text-sm sm:text-base font-medium text-foreground block mb-3">
              Precious Metal Alloy
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["Platinum 950", "18k Yellow Gold", "18k Rose Gold"] as AlloyOption[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setAlloy(m)}
                  className={`py-2.5 sm:py-3 px-1.5 sm:px-3 text-xs sm:text-sm text-center transition-colors truncate border ${alloy === m
                      ? "bg-primary text-primary-foreground font-medium border-primary"
                      : "bg-card text-foreground hover:bg-secondary border-border/40"
                    }`}
                  title={m}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Salon Acquisition Card */}
          <div className="bg-card p-5 sm:p-6 md:p-8 border border-border/40 flex flex-col gap-5">
            <div className="flex items-baseline justify-between pb-3 border-b border-border/30">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground block">
                  Atelier Valuation
                </span>
                <span className="font-heading text-2xl sm:text-3xl font-normal text-foreground mt-0.5 block">
                  ${activeProduct.price.toLocaleString()}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-500 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available in Salon
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Handcrafted in solid {alloy}. Accompanied by full gemological passport, complimentary insured international transport, and private salon viewing privileges.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <Link href={`/products/${activeProduct.slug}`} className="block w-full">
                <Button size="lg" className="w-full text-sm sm:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12">
                  Acquire Piece or Private Viewing
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </Link>
              <Link
                href="/consultation"
                className="text-center text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 py-1"
              >
                Or arrange bespoke custom commission
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
