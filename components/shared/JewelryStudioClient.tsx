"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { type Product } from "@/lib/schemas/product";
import { Button } from "@/components/ui/button";

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
  const primaryImage = activeProduct.images.find((img) => img.isPrimary) || activeProduct.images[0];

  const lightingProfiles: Record<
    LightingMode,
    { label: string; temp: string; filter: string; toneName: string; desc: string; badgeColor: string }
  > = {
    daylight: {
      label: "Natural Daylight",
      temp: "5500K",
      filter: "brightness(1.04) contrast(1.08) saturate(1.05)",
      toneName: "Diamond Scintillation Standard",
      desc: "Reveals genuine diamond color grade and brilliant optical dispersion under direct northern light.",
      badgeColor: "bg-sky-950/60 text-sky-200 border-sky-800/40",
    },
    candlelight: {
      label: "Salon Candlelight",
      temp: "2700K",
      filter: "brightness(0.98) contrast(1.12) sepia(0.22) saturate(1.25)",
      toneName: "Place Vendôme Evening Gala",
      desc: "Warm incandescent atmosphere accentuating fire dispersion and precious metal lusters.",
      badgeColor: "bg-amber-950/60 text-amber-200 border-amber-800/40",
    },
    bench: {
      label: "Jeweler's Bench",
      temp: "4000K",
      filter: "brightness(1.1) contrast(1.18) saturate(0.95)",
      toneName: "Master Craftsman Inspection",
      desc: "High-CRI precision illumination for examining micro-pavé prongs and clarity inclusions.",
      badgeColor: "bg-stone-800/80 text-stone-200 border-stone-700/40",
    },
  };

  const currentProfile = lightingProfiles[lighting];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full text-foreground"
    >
      {/* Studio Header */}
      <div className="mb-14 max-w-3xl">
        <h2 className="font-heading text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Atelier Optical &amp; Metallurgy Studio
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-2xl">
          Examine gemstones under calibrated salon lighting spectra, rotate incident light across hand-cut facets, and inspect micro-pavé metallurgy.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Interactive Visualizer Frame (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-card/60">
            {/* Master Jewel Artwork */}
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
            <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 text-sm text-foreground">
              {activeProduct.caratWeight ? `${activeProduct.caratWeight} ct` : "Fine Specimen"} • {activeProduct.gemstones[0]}
            </div>

            {/* Loupe Toggle Indicator */}
            {isLoupeActive && (
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                10× Gemological Loupe Active
              </div>
            )}
          </div>

          {/* Interactive Bench Controls: Angle Slider & Loupe Toggle */}
          <div className="bg-card p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-base font-medium text-foreground block">
                  Incident Light Angle
                </span>
                <span className="text-sm text-muted-foreground">
                  Rotate illumination vector across facets ({lightAngle > 0 ? `+${lightAngle}°` : `${lightAngle}°`})
                </span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={lightAngle}
                onChange={(e) => setLightAngle(Number(e.target.value))}
                className="w-full sm:w-56 accent-primary cursor-pointer h-2 bg-secondary rounded-none"
                aria-label="Incident light angle"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <span className="text-base text-muted-foreground">
                Calibrated Spectrum: <strong className="text-foreground font-medium">{currentProfile.toneName} ({currentProfile.temp})</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsLoupeActive(!isLoupeActive)}
                className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                  isLoupeActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {isLoupeActive ? "Exit 10× Magnification" : "Engage 10× Gemological Loupe"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Specimen Selection & Gemological Dossier (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Specimen Selector */}
          <div>
            <span className="text-base font-medium text-foreground block mb-3">
              Select Salon Masterpiece
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {products.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedSlug(item.slug)}
                  className={`p-3.5 text-left transition-all ${
                    item.slug === activeProduct.slug
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-card text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="text-base block line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-sm opacity-85 block mt-1">
                    ${item.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Illumination Spectra Selector */}
          <div>
            <span className="text-base font-medium text-foreground block mb-3">
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
                    className={`p-4 text-left transition-all flex items-baseline justify-between ${
                      isActive
                        ? "bg-secondary text-foreground pl-5 font-medium"
                        : "bg-card text-muted-foreground hover:text-foreground pl-4"
                    }`}
                  >
                    <div>
                      <span className="text-base font-medium block text-foreground">
                        {prof.label}
                      </span>
                      <span className="text-sm text-muted-foreground mt-0.5 block">
                        {prof.desc}
                      </span>
                    </div>
                    <span className="text-sm shrink-0 ml-4 font-normal">
                      {prof.temp}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metallurgy Alloy Selector */}
          <div>
            <span className="text-base font-medium text-foreground block mb-3">
              Precious Metal Alloy
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {(["Platinum 950", "18k Yellow Gold", "18k Rose Gold"] as AlloyOption[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setAlloy(m)}
                  className={`py-3 px-3 text-sm text-center transition-colors ${
                    alloy === m
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-card text-foreground hover:bg-secondary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Gemological Specifications Dossier */}
          <div className="bg-card p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
              <h3 className="font-heading text-2xl font-normal text-foreground">
                Gemological Dossier
              </h3>
              <span className="font-heading text-2xl font-light text-foreground">
                ${activeProduct.price.toLocaleString()}
              </span>
            </div>
            <dl className="space-y-3.5 text-base">
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Primary Gemstone</dt>
                <dd className="font-medium text-foreground">{activeProduct.gemstones.join(", ")}</dd>
              </div>
              {activeProduct.caratWeight && (
                <div className="flex justify-between py-1">
                  <dt className="text-muted-foreground">Total Carat Weight</dt>
                  <dd className="font-medium text-foreground">{activeProduct.caratWeight} ct</dd>
                </div>
              )}
              {activeProduct.clarity && (
                <div className="flex justify-between py-1">
                  <dt className="text-muted-foreground">Clarity Certification</dt>
                  <dd className="font-medium text-foreground">{activeProduct.clarity} (GIA Verified)</dd>
                </div>
              )}
              {activeProduct.cutGrade && (
                <div className="flex justify-between py-1">
                  <dt className="text-muted-foreground">Cut Proportion Grade</dt>
                  <dd className="font-medium text-foreground">{activeProduct.cutGrade} Symmetry</dd>
                </div>
              )}
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Mounting Metallurgy</dt>
                <dd className="font-medium text-foreground">{alloy}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Ethical Provenance</dt>
                <dd className="font-medium text-foreground">Kimberley Audited • Place Vendôme</dd>
              </div>
            </dl>

            <div className="mt-8 pt-4">
              <Link href={`/products/${activeProduct.slug}`} className="block w-full">
                <Button size="lg" className="w-full text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                  Acquire or Request Private Viewing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
