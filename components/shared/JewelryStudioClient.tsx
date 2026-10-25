"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, ZoomIn, ZoomOut, Compass, RotateCcw } from "lucide-react";
import { type Product } from "@/lib/schemas/product";
import { BRAND } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface JewelryStudioClientProps {
  products: Product[];
}

type LightingMode = "daylight" | "candlelight" | "bench";
type AlloyOption = "Platinum 950" | "18k Yellow Gold" | "18k Rose Gold";

const METAL_COLORS: Record<AlloyOption, string> = {
  "Platinum 950": "#A0B2C6",
  "18k Yellow Gold": "#D4AF37",
  "18k Rose Gold": "#B76E79",
};

export function JewelryStudioClient({ products }: JewelryStudioClientProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(products[0]?.slug || "");
  const [lighting, setLighting] = useState<LightingMode>("daylight");
  const [alloy, setAlloy] = useState<AlloyOption>("Platinum 950");
  const [lightAngle, setLightAngle] = useState<number>(15);
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);

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

  // Touch & Pointer interaction on the gem canvas
  const handlePointerInteraction = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

      if (isLoupeActive) {
        // Pan the loupe target coordinates
        setLoupePos({ x, y });
      } else {
        // Dragging sweeps the incident light vector (-45 deg to +45 deg)
        const angle = Math.round(((x - 50) / 50) * 45);
        setLightAngle(angle);
      }
    },
    [isLoupeActive]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsInteracting(true);
    handlePointerInteraction(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteracting && !isLoupeActive) return;
    handlePointerInteraction(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    setIsInteracting(false);
  };

  if (!activeProduct) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-full min-w-0 text-foreground"
    >
      {/* Studio Header */}
      <div className="mb-10 sm:mb-14 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
            Interactive Gemological Bench
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-tight">
          Atelier Optical &amp; Metallurgy Studio
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
          Touch and drag across the stone to rotate incident illumination, calibrate salon spectra, or engage the 10× gemological loupe.
        </p>
      </div>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-start w-full min-w-0 max-w-full">
        {/* Left Column: Visualizer Canvas + Light Controls + Gemological Dossier (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full min-w-0">
          {/* Master Jewel Artwork Display */}
          <div
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className={cn(
              "relative aspect-4/3 w-full max-w-full overflow-hidden bg-card/60 border border-border/40 select-none touch-none",
              isLoupeActive ? "cursor-crosshair" : "cursor-ew-resize"
            )}
          >
            <motion.div
              key={`${activeProduct.slug}-${alloy}`}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{
                opacity: 1,
                scale: isLoupeActive ? 1.75 : 1,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full will-change-transform"
              style={{
                filter: currentProfile.filter,
                transformOrigin: isLoupeActive ? `${loupePos.x}% ${loupePos.y}%` : "50% 50%",
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
                className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-200"
                style={{
                  background: `linear-gradient(${90 + lightAngle}deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)`,
                  opacity: 0.85,
                }}
              />
            </motion.div>

            {/* Specimen Tag overlay */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-background/90 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-foreground backdrop-blur-sm border border-border/30 max-w-[calc(100%-1.5rem)] truncate shadow-sm flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>{activeProduct.caratWeight ? `${activeProduct.caratWeight} ct` : "Fine Specimen"} • {activeProduct.gemstones[0]}</span>
            </div>

            {/* Interactive Loupe Reticle when loupe is active */}
            {isLoupeActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="pointer-events-none absolute size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary shadow-[0_0_30px_rgba(212,175,55,0.45)] flex items-center justify-center backdrop-contrast-125 backdrop-brightness-105"
                style={{ left: `${loupePos.x}%`, top: `${loupePos.y}%` }}
              >
                {/* Brass Knurled Outer Ring */}
                <div className="absolute inset-1 rounded-full border border-dashed border-primary/40 animate-[spin_30s_linear_infinite]" />
                <div className="size-1.5 rounded-full bg-primary" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-primary/40" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-primary/40" />
                
                {/* HUD Spec Tag */}
                <div className="absolute -bottom-7 bg-background/95 border border-primary/50 text-[10px] font-mono tracking-widest text-primary uppercase px-2.5 py-0.5 whitespace-nowrap shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                  <span className="size-1 rounded-full bg-primary animate-ping" />
                  <span>10× Loupe • {activeProduct.clarity || "VVS1"} • n=2.417</span>
                </div>
              </motion.div>
            )}

            {/* Touch Drag Gesture Indicator */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-background/85 backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono text-muted-foreground border border-border/30 flex items-center gap-1.5">
              <Compass className="size-3 text-primary animate-spin" style={{ animationDuration: "12s" }} />
              <span>{isLoupeActive ? "Drag to pan loupe" : "Drag across to rotate light"}</span>
            </div>
          </div>

          {/* Interactive Bench Controls: Angle Slider & Loupe Toggle */}
          <div className="bg-card p-4 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 border border-border/40 w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-medium text-foreground block">
                  Incident Light Angle
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground block">
                  Rotate illumination vector across facets ({lightAngle > 0 ? `+${lightAngle}°` : `${lightAngle}°`})
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                <Slider
                  min={-45}
                  max={45}
                  value={[lightAngle]}
                  onValueChange={(v) => setLightAngle((v as number[])[0])}
                  aria-label="Incident light angle"
                  className="flex-1 min-w-0 sm:w-48 xl:w-56"
                />
                <span className="text-xs font-mono text-muted-foreground w-10 text-right shrink-0 sm:hidden">
                  {lightAngle > 0 ? `+${lightAngle}°` : `${lightAngle}°`}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/30 w-full min-w-0">
              <span className="text-xs sm:text-sm text-muted-foreground break-words min-w-0">
                Calibrated Spectrum: <strong className="text-foreground font-medium">{currentProfile.toneName} ({currentProfile.temp})</strong>
              </span>
              <motion.div whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
                <Button
                  type="button"
                  variant={isLoupeActive ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setIsLoupeActive(!isLoupeActive)}
                  className="w-full sm:w-auto rounded-none text-xs sm:text-sm shrink-0 flex items-center justify-center gap-2"
                >
                  {isLoupeActive ? (
                    <>
                      <ZoomOut className="size-4" />
                      <span>Exit 10× Magnification</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="size-4" />
                      <span>Engage 10× Gemological Loupe</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Gemological Specifications Dossier */}
          <div className="bg-card p-4 sm:p-6 md:p-8 border border-border/40 w-full min-w-0">
            <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-border/30 gap-2">
              <div className="min-w-0">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground block">
                  Laboratory Specifications
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-normal text-foreground mt-0.5 truncate">
                  Gemological Dossier
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-secondary text-primary font-medium shrink-0 flex items-center gap-1.5 border border-border/30">
                <Sparkles className="size-3" />
                GIA Verified
              </span>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-base w-full min-w-0">
              <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20 gap-2 min-w-0">
                <dt className="text-muted-foreground text-xs sm:text-sm shrink-0">Primary Gemstone</dt>
                <dd className="font-medium text-foreground text-right sm:text-left min-w-0 break-words">{activeProduct.gemstones.join(", ")}</dd>
              </div>
              {activeProduct.caratWeight && (
                <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20 gap-2 min-w-0">
                  <dt className="text-muted-foreground text-xs sm:text-sm shrink-0">Total Carat Weight</dt>
                  <dd className="font-medium text-foreground text-right sm:text-left min-w-0 break-words">{activeProduct.caratWeight} ct</dd>
                </div>
              )}
              {activeProduct.clarity && (
                <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20 gap-2 min-w-0">
                  <dt className="text-muted-foreground text-xs sm:text-sm shrink-0">Clarity Certification</dt>
                  <dd className="font-medium text-foreground text-right sm:text-left min-w-0 break-words">{activeProduct.clarity}</dd>
                </div>
              )}
              {activeProduct.cutGrade && (
                <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20 gap-2 min-w-0">
                  <dt className="text-muted-foreground text-xs sm:text-sm shrink-0">Cut Proportion</dt>
                  <dd className="font-medium text-foreground text-right sm:text-left min-w-0 break-words">{activeProduct.cutGrade} Symmetry</dd>
                </div>
              )}
              <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20 gap-2 min-w-0">
                <dt className="text-muted-foreground text-xs sm:text-sm shrink-0">Mounting Metallurgy</dt>
                <dd className="font-medium text-foreground text-right sm:text-left min-w-0 break-words">{alloy}</dd>
              </div>
              <div className="flex justify-between sm:flex-col sm:gap-0.5 py-1 border-b sm:border-0 border-border/20 gap-2 min-w-0">
                <dt className="text-muted-foreground text-xs sm:text-sm shrink-0">Provenance &amp; Ethics</dt>
                <dd className="font-medium text-foreground text-right sm:text-left min-w-0 break-words">Kimberley Process Audited</dd>
              </div>
            </dl>

            <div className="mt-5 pt-3 border-t border-border/20 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary shrink-0" />
              <span>Stamped with official French State Master Jeweler Assay hallmark.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specimen Selection + Spectra + Metallurgy + Acquisition Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 w-full min-w-0">
          {/* Specimen Selector */}
          <div className="w-full min-w-0">
            <div className="flex items-center justify-between mb-3 gap-2">
              <span className="text-sm sm:text-base font-medium text-foreground truncate">
                Select Salon Masterpiece
              </span>
              <span className="text-xs text-muted-foreground shrink-0 sm:hidden">
                Swipe to browse ({products.length})
              </span>
            </div>

            {/* Mobile Horizontal Carousel with Tactile Feedback */}
            <div className="flex sm:hidden gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x w-full max-w-full touch-pan-x overscroll-x-contain">
              {products.map((item) => {
                const isSelected = item.slug === activeProduct.slug;
                return (
                  <motion.button
                    key={item.slug}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedSlug(item.slug)}
                    className={cn(
                      "snap-start shrink-0 w-44 p-3 text-left transition-all border relative",
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium border-primary shadow-md"
                        : "bg-card text-foreground hover:bg-secondary border-border/40"
                    )}
                  >
                    <span className="text-sm block line-clamp-1">{item.title}</span>
                    <span className="text-xs opacity-85 block mt-1 font-mono">${item.price.toLocaleString()}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop 2-Column Grid */}
            <div className="hidden sm:grid grid-cols-2 gap-2.5 w-full">
              {products.map((item) => {
                const isSelected = item.slug === activeProduct.slug;
                return (
                  <motion.button
                    key={item.slug}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSlug(item.slug)}
                    className={cn(
                      "p-3.5 text-left transition-all border relative",
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium border-primary shadow-sm"
                        : "bg-card text-foreground hover:bg-secondary border-border/40"
                    )}
                  >
                    <span className="text-sm sm:text-base block line-clamp-1">{item.title}</span>
                    <span className="text-xs sm:text-sm opacity-85 block mt-1 font-mono">${item.price.toLocaleString()}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Illumination Spectra Selector with Sliding Spring Pill */}
          <div className="w-full min-w-0">
            <span className="text-sm sm:text-base font-medium text-foreground block mb-3">
              Calibrated Illumination Spectrum
            </span>
            <div className="flex flex-col gap-2.5 w-full">
              {(Object.keys(lightingProfiles) as LightingMode[]).map((mode) => {
                const prof = lightingProfiles[mode];
                const isActive = lighting === mode;
                return (
                  <motion.button
                    key={mode}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLighting(mode)}
                    className={cn(
                      "relative p-3.5 sm:p-4 text-left transition-colors flex items-baseline justify-between border w-full min-w-0 overflow-hidden",
                      isActive
                        ? "border-primary/60 text-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground border-border/40"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSpectrumPill"
                        className="absolute inset-0 bg-secondary -z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <div className="min-w-0 flex-1 relative z-10">
                      <span className="text-sm sm:text-base font-medium block text-foreground">
                        {prof.label}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground mt-0.5 block line-clamp-2 sm:line-clamp-none">
                        {prof.desc}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm shrink-0 ml-3 sm:ml-4 font-normal text-muted-foreground relative z-10 font-mono">
                      {prof.temp}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Metallurgy Alloy Selector with Visual Metal Swatches */}
          <div className="w-full min-w-0">
            <span className="text-sm sm:text-base font-medium text-foreground block mb-3">
              Precious Metal Alloy
            </span>
            <div className="grid grid-cols-3 gap-2 w-full">
              {(["Platinum 950", "18k Yellow Gold", "18k Rose Gold"] as AlloyOption[]).map((m) => {
                const isSelected = alloy === m;
                return (
                  <motion.button
                    key={m}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setAlloy(m)}
                    className={cn(
                      "relative py-2.5 sm:py-3 px-2 text-xs sm:text-sm text-center transition-colors truncate border min-w-0 flex items-center justify-center gap-1.5",
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium border-primary shadow-xs"
                        : "bg-card text-foreground hover:bg-secondary border-border/40"
                    )}
                    title={m}
                  >
                    <span
                      className="size-2 rounded-full shrink-0 border border-black/20"
                      style={{ backgroundColor: METAL_COLORS[m] }}
                    />
                    <span className="truncate">{m}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Salon Acquisition Card */}
          <div className="bg-card p-4 sm:p-6 md:p-8 border border-border/40 flex flex-col gap-5 w-full min-w-0">
            <div className="flex items-baseline justify-between pb-3 border-b border-border/30 gap-2">
              <div className="min-w-0">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground block">
                  Atelier Valuation
                </span>
                <span className="font-heading text-2xl sm:text-3xl font-normal text-foreground mt-0.5 block">
                  ${activeProduct.price.toLocaleString()}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-500 flex items-center gap-1.5 shrink-0">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available in Salon
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Handcrafted in solid {alloy}. Accompanied by full gemological passport, complimentary insured international transport, and private salon viewing privileges.
            </p>

            <div className="flex flex-col gap-3 pt-2 w-full">
              <Link href={`/products/${activeProduct.slug}`} className="block w-full">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full text-xs sm:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 whitespace-normal text-center">
                    <span>Acquire Piece or Private Viewing</span>
                    <ArrowRight className="size-4 ml-1.5 shrink-0" />
                  </Button>
                </motion.div>
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
