"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, Pause, Play, ArrowUpRight, Eye } from "lucide-react";
import { ShutterImage } from "./motion/MotionSection";
import { type Product } from "@/lib/schemas/product";
import { type SiteSettings } from "@/lib/schemas/settings";
import { ScrollParallax } from "./motion/ScrollParallax";
import { CardTilt } from "./motion/CardTilt";
import { FacetGlint } from "./motion/FacetGlint";

interface HeroPrint {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  aspectRatio: string;
  priority?: boolean;
  href: string;
  actionText: string;
}

const HERO_PRINTS: HeroPrint[] = [
  {
    id: "couture-emerald-necklace",
    src: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971894/etoile-atelier/hero-editorial-couture-emerald.jpg",
    alt: "Amara Gold Haute Joaillerie Emerald & Diamond Collar Necklace in 22K Gold",
    title: "Haute Joaillerie Emerald Collar",
    subtitle: "3.40 ct Royal Zambian Emerald • Natural VVS Diamonds",
    aspectRatio: "aspect-3/4",
    priority: true,
    href: "/collections?category=Heritage+Palakka+%26+Temple",
    actionText: "Discover Emerald Collar",
  },
  {
    id: "lumina-solitaire",
    src: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971502/etoile-atelier/hero-editorial-solitaire-on-figure.jpg",
    alt: "The Amara Gold Lumina Solitaire Diamond Ring on-figure in 22K Gold and Platinum 950",
    title: "The Amara Gold Lumina Solitaire",
    subtitle: "2.15 ct VVS1 Natural Diamond • Hand-Set in Platinum & 22K Gold",
    aspectRatio: "aspect-3/4",
    href: "/products/amara-gold-lumina-solitaire-ring",
    actionText: "Inspect Lumina Solitaire",
  },
  {
    id: "sculpted-gold-cuff",
    src: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971895/etoile-atelier/hero-editorial-sculpted-cuff.jpg",
    alt: "Amara Gold Architectural Sculpted Diamond Cuff Bracelet in Solid 22K Gold",
    title: "Architectural Sculpted Gold Cuff",
    subtitle: "4.20 ctw Brilliant Diamonds • Hand-Formed Solid Gold",
    aspectRatio: "aspect-16/10",
    href: "/collections?category=Kasavu+Kadas+%26+Bangles",
    actionText: "Examine Sculpted Cuff",
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide

interface HeroPhotographicRailProps {
  products?: Product[];
  settings?: SiteSettings;
}

export function HeroPhotographicRail({ products, settings }: HeroPhotographicRailProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const s0 = settings?.heroSlides?.[0];
  const s1 = settings?.heroSlides?.[1];
  const s2 = settings?.heroSlides?.[2];

  const prints: HeroPrint[] = [
    {
      id: s0?.id || "couture-emerald-necklace",
      src: s0?.image || "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971894/etoile-atelier/hero-editorial-couture-emerald.jpg",
      alt: s0?.alt || "Amara Gold Haute Joaillerie Emerald & Diamond Collar Necklace in 22K Gold",
      title: s0?.title || "Haute Joaillerie Emerald Collar",
      subtitle: s0?.subtitle || "3.40 ct Royal Zambian Emerald • Natural VVS Diamonds",
      aspectRatio: "aspect-3/4",
      priority: true,
      href: s0?.href || "/collections?category=Heritage+Palakka+%26+Temple",
      actionText: s0?.actionText || "Discover Emerald Collar",
    },
    {
      id: s1?.id || "lumina-solitaire",
      src: s1?.image || "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971502/etoile-atelier/hero-editorial-solitaire-on-figure.jpg",
      alt: s1?.alt || "The Amara Gold Lumina Solitaire Diamond Ring on-figure in 22K Gold and Platinum 950",
      title: s1?.title || "The Amara Gold Lumina Solitaire",
      subtitle: s1?.subtitle || "2.15 ct VVS1 Natural Diamond • Hand-Set in Platinum & 22K Gold",
      aspectRatio: "aspect-3/4",
      href: s1?.href || "/products/amara-gold-lumina-solitaire-ring",
      actionText: s1?.actionText || "Inspect Lumina Solitaire",
    },
    {
      id: s2?.id || "sculpted-gold-cuff",
      src: s2?.image || "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971895/etoile-atelier/hero-editorial-sculpted-cuff.jpg",
      alt: s2?.alt || "Amara Gold Architectural Sculpted Diamond Cuff Bracelet in Solid 22K Gold",
      title: s2?.title || "Architectural Sculpted Gold Cuff",
      subtitle: s2?.subtitle || "4.20 ctw Brilliant Diamonds • Hand-Formed Solid Gold",
      aspectRatio: "aspect-16/10",
      href: s2?.href || "/collections?category=Kasavu+Kadas+%26+Bangles",
      actionText: s2?.actionText || "Examine Sculpted Cuff",
    },
  ];

  const activePrint = prints[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % prints.length);
  }, [prints.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + prints.length) % prints.length);
  }, [prints.length]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, handleNext, activeIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart !== null) {
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStart - touchEnd;
      if (diff > 45) {
        handleNext();
      } else if (diff < -45) {
        handlePrev();
      }
    }
    setTouchStart(null);
    setIsPaused(false);
  };

  return (
    <div className="w-full">
      {/* ── MOBILE VIEW (< md): Tactile Auto-Sliding Showcase ── */}
      <div className="block md:hidden w-full">
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full overflow-hidden bg-card border border-border/40 p-4"
        >
          {/* Header pill indicator & Auto-play status */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/30 text-xs">
            <span className="font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="size-3 text-accent animate-pulse" />
              Salon Folio 0{activeIndex + 1} / 0{prints.length}
            </span>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.5 rounded-xs bg-secondary cursor-pointer"
              aria-label={isPaused ? "Resume auto slide" : "Pause auto slide"}
            >
              {isPaused ? (
                <>
                  <Play className="size-2.5 text-accent" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="size-2.5 text-accent" />
                  <span>Auto</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Slide Frame */}
          <div className="relative aspect-4/5 w-full overflow-hidden bg-secondary">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePrint.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative size-full"
              >
                <Image
                  src={activePrint.src}
                  alt={activePrint.alt}
                  fill
                  priority={activePrint.priority}
                  sizes="(max-width: 768px) 92vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Quick left/right floating tap hit areas */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous archival print"
              className="absolute left-2 top-1/2 -translate-y-1/2 size-9 bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next archival print"
              className="absolute right-2 top-1/2 -translate-y-1/2 size-9 bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Slide Caption */}
          <div className="pt-3 flex flex-col gap-0.5">
            <h3 className="font-heading text-lg font-normal text-foreground">
              {activePrint.title}
            </h3>
            <p className="text-xs text-muted-foreground">{activePrint.subtitle}</p>
          </div>

          {/* Pagination Indicators with Filling Progress Bar */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {prints.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="relative h-1.5 w-10 bg-muted-foreground/20 overflow-hidden cursor-pointer"
                >
                  {isActive && (
                    <motion.div
                      key={`progress-${activeIndex}-${isPaused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "100%" : "100%" }}
                      transition={{
                        duration: isPaused ? 0 : AUTOPLAY_INTERVAL / 1000,
                        ease: "linear",
                      }}
                      className="h-full bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP & TABLET VIEW (md+): Asymmetric Tri-Print Photographic Rail with Scroll Parallax ── */}
      <div className="hidden md:grid gap-8 grid-cols-12 items-start">
        {/* Print 1 (Cols 1-3, offset down): Left Hero Print - Royal Kerala Bride */}
        <ScrollParallax offsetY={32} className="col-span-3">
          <div className="flex flex-col gap-3 mt-14 group/print">
            <CardTilt maxTilt={6}>
              <Link href={prints[0].href} className="block relative overflow-hidden bg-secondary">
                <ShutterImage
                  src={prints[0].src}
                  alt={prints[0].alt}
                  aspectRatio="aspect-3/4"
                  sizes="(max-width: 1024px) 30vw, 25vw"
                  delay={0.1}
                />
                <FacetGlint />
                {/* Floating inspect micro-tag */}
                <div className="pointer-events-none absolute bottom-3 left-3 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/print:opacity-100 group-hover/print:translate-y-0">
                  <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3 py-1 text-xs font-mono text-foreground border border-border/60 shadow-lg">
                    <Eye className="size-3 text-accent" />
                    <span>{prints[0].actionText} ↗</span>
                  </span>
                </div>
              </Link>
            </CardTilt>
            <div className="flex flex-col text-base pt-1">
              <Link href={prints[0].href} className="text-foreground font-medium hover:text-accent transition-colors flex items-center justify-between">
                <span>{prints[0].title}</span>
                <ArrowUpRight className="size-4 opacity-0 group-hover/print:opacity-100 transition-opacity" />
              </Link>
              <span className="text-sm text-muted-foreground">{prints[0].subtitle}</span>
            </div>
          </div>
        </ScrollParallax>

        {/* Print 2 (Cols 4-8): Center Hero Print - The Lumina Solitaire On-Figure */}
        <ScrollParallax offsetY={-16} className="col-span-5">
          <div className="flex flex-col gap-3 group/print">
            <CardTilt maxTilt={7}>
              <Link href={prints[1].href} className="block relative overflow-hidden bg-secondary">
                <ShutterImage
                  src={prints[1].src}
                  alt={prints[1].alt}
                  aspectRatio="aspect-3/4"
                  priority
                  sizes="(max-width: 1024px) 45vw, 42vw"
                  delay={0.2}
                />
                <FacetGlint />
                {/* Floating inspect micro-tag */}
                <div className="pointer-events-none absolute bottom-4 left-4 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/print:opacity-100 group-hover/print:translate-y-0">
                  <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-foreground border border-border/60 shadow-xl">
                    <Sparkles className="size-3 text-accent animate-pulse" />
                    <span>{prints[1].actionText} ↗</span>
                  </span>
                </div>
              </Link>
            </CardTilt>
            <div className="flex flex-col sm:flex-row justify-between text-base pt-1 gap-1">
              <Link href={prints[1].href} className="text-foreground font-medium hover:text-accent transition-colors flex items-center gap-1.5">
                <span>{prints[1].title}</span>
                <ArrowUpRight className="size-4 opacity-0 group-hover/print:opacity-100 transition-opacity" />
              </Link>
              <span className="text-sm text-muted-foreground">{prints[1].subtitle}</span>
            </div>
          </div>
        </ScrollParallax>

        {/* Print 3 (Cols 9-12): Amara Gold & Thrissur Goldsmith Studio */}
        <ScrollParallax offsetY={42} className="col-span-4">
          <div className="flex flex-col gap-3 mt-7 group/print">
            <CardTilt maxTilt={6}>
              <Link href={prints[2].href} className="block relative overflow-hidden bg-secondary">
                <ShutterImage
                  src={prints[2].src}
                  alt={prints[2].alt}
                  aspectRatio="aspect-16/10"
                  sizes="(max-width: 1024px) 33vw, 33vw"
                  delay={0.3}
                />
                <FacetGlint />
                {/* Floating inspect micro-tag */}
                <div className="pointer-events-none absolute bottom-3 left-3 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/print:opacity-100 group-hover/print:translate-y-0">
                  <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3 py-1 text-xs font-mono text-foreground border border-border/60 shadow-lg">
                    <Eye className="size-3 text-accent" />
                    <span>{prints[2].actionText} ↓</span>
                  </span>
                </div>
              </Link>
            </CardTilt>
            <div className="flex flex-col sm:flex-row justify-between text-base pt-1 gap-1">
              <Link href={prints[2].href} className="text-foreground font-medium hover:text-accent transition-colors flex items-center gap-1.5">
                <span>{prints[2].title}</span>
                <ArrowUpRight className="size-4 opacity-0 group-hover/print:opacity-100 transition-opacity" />
              </Link>
              <span className="text-sm text-muted-foreground">{prints[2].subtitle}</span>
            </div>
          </div>
        </ScrollParallax>
      </div>
    </div>
  );
}
