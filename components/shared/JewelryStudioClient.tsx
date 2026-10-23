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
  const [lightAngle, setLightAngle] = useState<number>(0);
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(false);

  const activeProduct = products.find((p) => p.slug === selectedSlug) || products[0];
  const primaryImage = activeProduct.images.find((img) => img.isPrimary) || activeProduct.images[0];

  // Visual lighting parameters
  const lightingProfiles: Record<
    LightingMode,
    { label: string; temp: string; filter: string; toneName: string; desc: string }
  > = {
    daylight: {
      label: "Natural Daylight",
      temp: "5500K",
      filter: "brightness(1.02) contrast(1.06) saturate(1.0)",
      toneName: "Diamond Scintillation Standard",
      desc: "Reveals the true color grade and brilliant optical dispersion under direct northern light.",
    },
    candlelight: {
      label: "Salon Candlelight",
      temp: "2700K",
      filter: "brightness(0.96) contrast(1.1) sepia(0.2) saturate(1.18)",
      toneName: "Place Vendôme Evening Gala",
      desc: "Warm incandescent atmosphere highlighting fire dispersion and the deep luster of precious metal mountings.",
    },
    bench: {
      label: "Jeweler's Bench",
      temp: "4000K",
      filter: "brightness(1.08) contrast(1.15) saturate(0.92)",
      toneName: "Master Craftsman Inspection",
      desc: "High CRI surgical illumination allowing examination of micro-pavé prongs, clarity facets, and symmetry.",
    },
  };

  const currentProfile = lightingProfiles[lighting];

  return (
    <div className="w-full">
      {/* Studio Header: Clean, Architectural, No Eyebrows */}
      <div className="mb-12 max-w-2xl">
        <h2 className="font-heading text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
          Atelier Optical &amp; Metallurgy Studio
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Examine gemstones under calibrated salon lighting spectra, rotate incident light across hand-cut facets, and compare alloy mountings.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Interactive Visualizer Frame (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary">
            {/* Master Jewel Artwork */}
            <motion.div
              key={`${activeProduct.slug}-${alloy}`}
              initial={{ opacity: 0.4, scale: 0.98 }}
              animate={{ opacity: 1, scale: isLoupeActive ? 1.65 : 1 }}
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
                  background: `linear-gradient(${90 + lightAngle}deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)`,
                  opacity: 0.85,
                }}
              />
            </motion.div>

            {/* Specimen Tag overlay - quiet, no glass */}
            <div className="absolute top-4 left-4 bg-background/95 px-3 py-1.5 text-xs tracking-wider text-foreground">
              {activeProduct.caratWeight ? `${activeProduct.caratWeight} ct` : "Fine Specimen"} • {activeProduct.gemstones[0]}
            </div>

            {/* Loupe Toggle Indicator */}
            {isLoupeActive && (
              <div className="absolute bottom-4 left-4 bg-background px-3 py-1 text-xs text-foreground">
                10× Gemological Loupe Magnification Active
              </div>
            )}
          </div>

          {/* Interactive Bench Controls: Angle Slider & Loupe Toggle */}
          <div className="bg-secondary p-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-medium text-foreground block">
                  Incident Light Angle
                </span>
                <span className="text-xs text-muted-foreground">
                  Rotate illumination vector across pavilion facets ({lightAngle > 0 ? `+${lightAngle}°` : `${lightAngle}°`})
                </span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={lightAngle}
                onChange={(e) => setLightAngle(Number(e.target.value))}
                className="w-full sm:w-48 accent-foreground cursor-pointer h-1 bg-border rounded-none"
                aria-label="Incident light angle"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground">
                Current Spectrum: <strong className="text-foreground font-medium">{currentProfile.toneName} ({currentProfile.temp})</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsLoupeActive(!isLoupeActive)}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  isLoupeActive
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground hover:bg-muted"
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
            <span className="text-xs font-medium text-muted-foreground block mb-3">
              Select Salon Masterpiece
            </span>
            <div className="grid grid-cols-2 gap-2">
              {products.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedSlug(item.slug)}
                  className={`p-3 text-left transition-all ${
                    item.slug === activeProduct.slug
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-xs block line-clamp-1 font-medium">
                    {item.title}
                  </span>
                  <span className="text-xs opacity-75 block mt-1">
                    ${item.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Illumination Spectra Selector */}
          <div>
            <span className="text-xs font-medium text-muted-foreground block mb-3">
              Calibrated Illumination Spectrum
            </span>
            <div className="flex flex-col gap-2">
              {(Object.keys(lightingProfiles) as LightingMode[]).map((mode) => {
                const prof = lightingProfiles[mode];
                const isActive = lighting === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setLighting(mode)}
                    className={`p-3 text-left transition-all flex items-baseline justify-between ${
                      isActive
                        ? "border-l-2 border-foreground bg-secondary text-foreground pl-4"
                        : "bg-background/40 text-muted-foreground hover:text-foreground pl-3"
                    }`}
                  >
                    <div>
                      <span className="text-sm font-medium block text-foreground">
                        {prof.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {prof.desc}
                      </span>
                    </div>
                    <span className="text-xs font-mono shrink-0 ml-4">
                      {prof.temp}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metallurgy Alloy Selector */}
          <div>
            <span className="text-xs font-medium text-muted-foreground block mb-3">
              Precious Metal Alloy
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["Platinum 950", "18k Yellow Gold", "18k Rose Gold"] as AlloyOption[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setAlloy(m)}
                  className={`py-2 px-3 text-xs text-center transition-colors ${
                    alloy === m
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground hover:bg-muted"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Gemological Specifications Dossier */}
          <div className="bg-secondary p-6">
            <h4 className="font-heading text-lg font-normal mb-4 text-foreground">
              Gemological Dossier
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Primary Gemstone</span>
                <span className="font-medium text-foreground">{activeProduct.gemstones.join(", ")}</span>
              </div>
              {activeProduct.caratWeight && (
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Total Carat Weight</span>
                  <span className="font-medium text-foreground">{activeProduct.caratWeight} ct</span>
                </div>
              )}
              {activeProduct.clarity && (
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Clarity Certification</span>
                  <span className="font-medium text-foreground">{activeProduct.clarity} (GIA Verified)</span>
                </div>
              )}
              {activeProduct.cutGrade && (
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Cut Proportion Grade</span>
                  <span className="font-medium text-foreground">{activeProduct.cutGrade} Symmetry</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Mounting Metallurgy</span>
                <span className="font-medium text-foreground">{alloy}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Provenance &amp; Ethical Chain</span>
                <span className="font-medium text-foreground">Kimberley Audited • Place Vendôme</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 pt-2">
              <span className="font-heading text-2xl font-light text-foreground">
                ${activeProduct.price.toLocaleString()}
              </span>
              <Link href={`/products/${activeProduct.slug}`}>
                <Button size="sm">
                  Acquire or Request Private Viewing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}