"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { type Product } from "@/lib/schemas/product";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

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
          <AspectRatio ratio={4 / 3} className="overflow-hidden bg-card/60 border border-border">
            {/* Master Jewel Artwork */}
            <motion.div
              key={`${activeProduct.slug}-${alloy}`}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: isLoupeActive ? 1.55 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full [filter:var(--studio-filter)] [transform-origin:var(--studio-origin)]"
              style={
                {
                  "--studio-filter": currentProfile.filter,
                  "--studio-origin": "50% 50%",
                } as React.CSSProperties
              }
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
                className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300 [background:var(--glint-bg)] opacity-80"
                style={
                  {
                    "--glint-bg": `linear-gradient(${90 + lightAngle}deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)`,
                  } as React.CSSProperties
                }
              />
            </motion.div>

            {/* Specimen Tag overlay */}
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="outline" className="bg-background/90 px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase text-foreground border-border">
                {activeProduct.caratWeight ? `${activeProduct.caratWeight} ct` : "Fine Specimen"} • {activeProduct.gemstones[0]}
              </Badge>
            </div>

            {/* Loupe Toggle Indicator */}
            {isLoupeActive && (
              <div className="absolute bottom-4 left-4 z-10">
                <Badge className="bg-primary text-primary-foreground px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase">
                  10× Gemological Loupe Active
                </Badge>
              </div>
            )}
          </AspectRatio>

          {/* Interactive Bench Controls: Angle Slider & Loupe Toggle */}
          <div className="bg-card p-6 md:p-8 flex flex-col gap-6 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-base font-medium text-foreground block">
                  Incident Light Angle
                </span>
                <span className="text-sm text-muted-foreground">
                  Rotate illumination vector across facets ({lightAngle > 0 ? `+${lightAngle}°` : `${lightAngle}°`})
                </span>
              </div>
              <div className="w-full sm:w-56">
                <Slider
                  min={-45}
                  max={45}
                  step={1}
                  value={[lightAngle]}
                  onValueChange={(val) => {
                    const next = Array.isArray(val) ? val[0] : val;
                    if (typeof next === "number") setLightAngle(next);
                  }}
                  aria-label="Incident light angle"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
              <span className="text-sm text-muted-foreground">
                Calibrated Spectrum: <strong className="text-foreground font-medium">{currentProfile.toneName} ({currentProfile.temp})</strong>
              </span>
              <Toggle
                pressed={isLoupeActive}
                onPressedChange={setIsLoupeActive}
                variant="outline"
                className={cn(
                  "h-auto px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors border",
                  isLoupeActive
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    : "bg-secondary text-foreground border-border hover:bg-muted"
                )}
              >
                {isLoupeActive ? "Exit 10× Magnification" : "Engage 10× Gemological Loupe"}
              </Toggle>
            </div>
          </div>
        </div>

        {/* Right Column: Specimen Selection & Gemological Dossier (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Specimen Selector using official Shadcn ToggleGroup */}
          <div>
            <span className="text-base font-medium text-foreground block mb-3">
              Select Salon Masterpiece
            </span>
            <ToggleGroup
              value={[selectedSlug]}
              onValueChange={(vals) => {
                if (vals[0]) setSelectedSlug(vals[0]);
              }}
              className="grid grid-cols-2 gap-2.5 w-full"
            >
              {products.map((item) => (
                <ToggleGroupItem
                  key={item.slug}
                  value={item.slug}
                  variant="outline"
                  className={cn(
                    "h-auto p-3.5 flex flex-col items-start justify-start text-left tracking-normal normal-case border",
                    item.slug === activeProduct.slug
                      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                      : "bg-card text-foreground border-border hover:bg-secondary"
                  )}
                >
                  <span className="text-sm font-medium block line-clamp-1 w-full">
                    {item.title}
                  </span>
                  <span className="text-xs opacity-85 block mt-1">
                    ${item.price.toLocaleString()}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Illumination Spectra Selector using official Shadcn ToggleGroup */}
          <div>
            <span className="text-base font-medium text-foreground block mb-3">
              Calibrated Illumination Spectrum
            </span>
            <ToggleGroup
              value={[lighting]}
              onValueChange={(vals) => {
                if (vals[0]) setLighting(vals[0] as LightingMode);
              }}
              orientation="vertical"
              className="flex flex-col gap-2.5 w-full"
            >
              {(Object.keys(lightingProfiles) as LightingMode[]).map((mode) => {
                const prof = lightingProfiles[mode];
                const isActive = lighting === mode;
                return (
                  <ToggleGroupItem
                    key={mode}
                    value={mode}
                    variant="outline"
                    className={cn(
                      "h-auto p-4 flex items-baseline justify-between w-full text-left tracking-normal normal-case border",
                      isActive
                        ? "bg-secondary text-foreground pl-5 font-medium border-border"
                        : "bg-card text-muted-foreground hover:text-foreground pl-4 border-border"
                    )}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-medium block text-foreground">
                        {prof.label}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5 block whitespace-normal">
                        {prof.desc}
                      </span>
                    </div>
                    <span className="text-xs shrink-0 ml-4 font-normal">
                      {prof.temp}
                    </span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>

          {/* Metallurgy Alloy Selector using official Shadcn ToggleGroup */}
          <div>
            <span className="text-base font-medium text-foreground block mb-3">
              Precious Metal Alloy
            </span>
            <ToggleGroup
              value={[alloy]}
              onValueChange={(vals) => {
                if (vals[0]) setAlloy(vals[0] as AlloyOption);
              }}
              className="grid grid-cols-3 gap-2.5 w-full"
            >
              {(["Platinum 950", "18k Yellow Gold", "18k Rose Gold"] as AlloyOption[]).map((m) => (
                <ToggleGroupItem
                  key={m}
                  value={m}
                  variant="outline"
                  className={cn(
                    "h-auto py-3 px-3 text-xs text-center tracking-normal normal-case border",
                    alloy === m
                      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 font-medium"
                      : "bg-card text-foreground border-border hover:bg-secondary"
                  )}
                >
                  {m}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Gemological Specifications Dossier wrapped in official Shadcn Card */}
          <Card className="border border-border bg-card">
            <CardHeader className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/50 pb-4">
              <CardTitle className="font-heading text-xl font-normal text-foreground uppercase tracking-wider">
                Gemological Dossier
              </CardTitle>
              <span className="font-heading text-xl font-light text-foreground">
                ${activeProduct.price.toLocaleString()}
              </span>
            </CardHeader>
            <CardContent className="pt-4">
              <dl className="space-y-3.5 text-sm">
                <div className="flex justify-between py-1 border-b border-border/30">
                  <dt className="text-muted-foreground">Primary Gemstone</dt>
                  <dd className="font-medium text-foreground">{activeProduct.gemstones.join(", ")}</dd>
                </div>
                {activeProduct.caratWeight && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <dt className="text-muted-foreground">Total Carat Weight</dt>
                    <dd className="font-medium text-foreground">{activeProduct.caratWeight} ct</dd>
                  </div>
                )}
                {activeProduct.clarity && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <dt className="text-muted-foreground">Clarity Certification</dt>
                    <dd className="font-medium text-foreground">{activeProduct.clarity} (GIA Verified)</dd>
                  </div>
                )}
                {activeProduct.cutGrade && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <dt className="text-muted-foreground">Cut Proportion Grade</dt>
                    <dd className="font-medium text-foreground">{activeProduct.cutGrade} Symmetry</dd>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-border/30">
                  <dt className="text-muted-foreground">Mounting Metallurgy</dt>
                  <dd className="font-medium text-foreground">{alloy}</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-muted-foreground">Ethical Provenance</dt>
                  <dd className="font-medium text-foreground">Kimberley Audited • Place Vendôme</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                render={<Link href={`/products/${activeProduct.slug}`} />}
                nativeButton={false}
                size="lg"
                className="w-full text-xs font-semibold tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Acquire or Request Private Viewing
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
