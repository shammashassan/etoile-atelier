"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { KERALA_CATEGORIES } from "@/lib/data";
import { CardTilt } from "@/components/shared/motion/CardTilt";
import { FacetGlint } from "@/components/shared/motion/FacetGlint";
import { MotionSection, MotionItem } from "@/components/shared/motion/MotionSection";

export function KeralaCategoryGrid() {
  return (
    <section className="bg-background text-foreground px-6 md:px-12 xl:px-16 py-16 lg:py-24 border-b border-border/40">
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Sovereign Heritage Taxonomy
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              Kerala Fine Jewellery Traditions
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
            From the ceremonial thali and multilayered bridal harams to hand-chiseled Thrissur Kasavu bangles, explore our 916 sovereign gold curations by tradition.
          </p>
        </div>

        {/* 6-Grid Taxonomy Layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KERALA_CATEGORIES.map((cat, idx) => (
            <MotionItem key={cat.title} delay={0.08 * idx} className="group flex flex-col">
              <CardTilt maxTilt={4} className="h-full flex flex-col bg-card border border-border/60 hover:border-accent/40 transition-colors overflow-hidden">
                <Link href={cat.href} className="flex flex-col h-full">
                  {/* Category Image Frame */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <FacetGlint />

                    {/* Weight Badge Overlay */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1 bg-background/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-foreground border border-border/80 shadow-xs">
                        <Sparkles className="size-2.5 text-accent" />
                        <span>{cat.pavanRange}</span>
                      </span>
                    </div>
                  </div>

                  {/* Category Narrative */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <h3 className="font-heading text-xl font-normal text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
                        <span>{cat.title}</span>
                        <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs font-mono text-accent">
                      <span>Explore Collection</span>
                      <span className="text-[11px] text-muted-foreground">BIS 916 Certified</span>
                    </div>
                  </div>
                </Link>
              </CardTilt>
            </MotionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
