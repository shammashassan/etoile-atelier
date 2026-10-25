"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, Pause, Play, ArrowUpRight, Eye } from "lucide-react";
import { ShutterImage } from "./motion/MotionSection";
import { CardTilt } from "./motion/CardTilt";
import { FacetGlint } from "./motion/FacetGlint";
import { cn } from "@/lib/utils";

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
    id: "solitaire",
    src: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877317/etoile-atelier/solitaire-lumina-diamond-ring.jpg",
    alt: "The Solitaire Lumina Diamond Ring in sculpted solid Platinum 950",
    title: "Solitaire Lumina in Platinum 950",
    subtitle: "2.15 ct Brilliant Cut • GIA Verified",
    aspectRatio: "aspect-3/4",
    priority: true,
    href: "/products/solitaire-lumina-diamond-ring",
    actionText: "Inspect 2.15ct Pavé",
  },
  {
    id: "sapphire",
    src: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877318/etoile-atelier/celeste-royal-sapphire-pendant.jpg",
    alt: "Céleste Royal Sapphire Pendant in Platinum & 18k White Gold",
    title: "Céleste Royal Sapphire Pendant",
    subtitle: "3.40 ct Ceylon Sapphire • SSEF Certified",
    aspectRatio: "aspect-square",
    href: "/products/celeste-royal-sapphire-pendant",
    actionText: "Examine Ceylon Sapphire",
  },
  {
    id: "workbench",
    src: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877321/etoile-atelier/artisan-workbench.jpg",
    alt: "Master Lapidary Workbench, Place Vendôme Atelier Paris",
    title: "Place Vendôme Lapidary Studio",
    subtitle: "Handcrafted Atelier Heritage • Paris 1924",
    aspectRatio: "aspect-16/10",
    href: "/#studio",
    actionText: "Explore Optical Bench",
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide

export function HeroPhotographicRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const activePrint = HERO_PRINTS[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_PRINTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HERO_PRINTS.length) % HERO_PRINTS.length);
  }, []);

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
              <Sparkles className="size-3 text-primary animate-pulse" />
              Salon Folio 0{activeIndex + 1} / 0{HERO_PRINTS.length}
            </span>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.5 rounded-xs bg-secondary"
              aria-label={isPaused ? "Resume auto slide" : "Pause auto slide"}
            >
              {isPaused ? (
                <>
                  <Play className="size-2.5 text-primary" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="size-2.5 text-primary" />
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
                  sizes="100vw"
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
            {HERO_PRINTS.map((item, idx) => {
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
                      className="h-full bg-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP & TABLET VIEW (md+): Asymmetric Tri-Print Photographic Rail ── */}
      <div className="hidden md:grid gap-8 grid-cols-12 items-start">
        {/* Print 1 (Cols 1-3, offset down): Céleste Royal Sapphire Pendant */}
        <div className="col-span-3 flex flex-col gap-3 mt-16 group/print">
          <CardTilt maxTilt={6}>
            <Link href="/products/celeste-royal-sapphire-pendant" className="block relative overflow-hidden bg-secondary">
              <ShutterImage
                src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877318/etoile-atelier/celeste-royal-sapphire-pendant.jpg"
                alt="Céleste Royal Sapphire Pendant in Platinum & 18k White Gold"
                aspectRatio="aspect-square"
                sizes="(max-width: 1024px) 30vw, 25vw"
                delay={0.1}
              />
              <FacetGlint />
              {/* Floating inspect micro-tag */}
              <div className="pointer-events-none absolute bottom-3 left-3 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/print:opacity-100 group-hover/print:translate-y-0">
                <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3 py-1 text-xs font-mono text-foreground border border-border/60 shadow-lg">
                  <Eye className="size-3 text-primary" />
                  <span>Examine Sapphire ↗</span>
                </span>
              </div>
            </Link>
          </CardTilt>
          <div className="flex flex-col text-base pt-1">
            <Link href="/products/celeste-royal-sapphire-pendant" className="text-foreground font-medium hover:text-primary transition-colors flex items-center justify-between">
              <span>Céleste Royal Sapphire Pendant</span>
              <ArrowUpRight className="size-4 opacity-0 group-hover/print:opacity-100 transition-opacity" />
            </Link>
            <span className="text-sm text-muted-foreground">3.40 ct Ceylon Sapphire • SSEF Certified</span>
          </div>
        </div>

        {/* Print 2 (Cols 4-8): The Solitaire Lumina Diamond Ring in Platinum 950 */}
        <div className="col-span-5 flex flex-col gap-3 group/print">
          <CardTilt maxTilt={7}>
            <Link href="/products/solitaire-lumina-diamond-ring" className="block relative overflow-hidden bg-secondary">
              <ShutterImage
                src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877317/etoile-atelier/solitaire-lumina-diamond-ring.jpg"
                alt="The Solitaire Lumina Diamond Ring in sculpted solid Platinum 950"
                aspectRatio="aspect-3/4"
                priority
                sizes="(max-width: 1024px) 45vw, 42vw"
                delay={0.2}
              />
              <FacetGlint />
              {/* Floating inspect micro-tag */}
              <div className="pointer-events-none absolute bottom-4 left-4 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/print:opacity-100 group-hover/print:translate-y-0">
                <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-foreground border border-border/60 shadow-xl">
                  <Sparkles className="size-3 text-primary animate-pulse" />
                  <span>Inspect 2.15ct Masterwork ↗</span>
                </span>
              </div>
            </Link>
          </CardTilt>
          <div className="flex flex-col sm:flex-row justify-between text-base pt-1 gap-1">
            <Link href="/products/solitaire-lumina-diamond-ring" className="text-foreground font-medium hover:text-primary transition-colors flex items-center gap-1.5">
              <span>Solitaire Lumina in Platinum 950</span>
              <ArrowUpRight className="size-4 opacity-0 group-hover/print:opacity-100 transition-opacity" />
            </Link>
            <span className="text-sm text-muted-foreground">2.15 ct Brilliant Cut • GIA Verified</span>
          </div>
        </div>

        {/* Print 3 (Cols 9-12): Place Vendôme Lapidary Studio */}
        <div className="col-span-4 flex flex-col gap-3 mt-8 group/print">
          <CardTilt maxTilt={6}>
            <Link href="/#studio" className="block relative overflow-hidden bg-secondary">
              <ShutterImage
                src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877321/etoile-atelier/artisan-workbench.jpg"
                alt="Master Lapidary Workbench, Place Vendôme Atelier Paris"
                aspectRatio="aspect-16/10"
                sizes="(max-width: 1024px) 33vw, 33vw"
                delay={0.3}
              />
              <FacetGlint />
              {/* Floating inspect micro-tag */}
              <div className="pointer-events-none absolute bottom-3 left-3 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/print:opacity-100 group-hover/print:translate-y-0">
                <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3 py-1 text-xs font-mono text-foreground border border-border/60 shadow-lg">
                  <Eye className="size-3 text-primary" />
                  <span>Enter Optical Bench ↓</span>
                </span>
              </div>
            </Link>
          </CardTilt>
          <div className="flex flex-col sm:flex-row justify-between text-base pt-1 gap-1">
            <Link href="/#studio" className="text-foreground font-medium hover:text-primary transition-colors flex items-center gap-1.5">
              <span>Place Vendôme Lapidary Studio</span>
              <ArrowUpRight className="size-4 opacity-0 group-hover/print:opacity-100 transition-opacity" />
            </Link>
            <span className="text-sm text-muted-foreground">Handcrafted Heritage • Paris 1924</span>
          </div>
        </div>
      </div>
    </div>
  );
}
