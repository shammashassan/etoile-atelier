"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, Scale, Clock, ShieldCheck, ChevronRight, X, Info } from "lucide-react";
import { DAILY_GOLD_RATES, BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function DailyGoldRateBar() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [pavanInput, setPavanInput] = useState<string>("5");
  const [gramInput, setGramInput] = useState<string>("40");

  const handlePavanChange = (val: string) => {
    setPavanInput(val);
    if (val.trim() === "" || val === ".") {
      setGramInput("");
      return;
    }
    const p = parseFloat(val);
    if (!isNaN(p)) {
      setGramInput(String(Math.round(p * 8 * 100) / 100));
    }
  };

  const handleGramChange = (val: string) => {
    setGramInput(val);
    if (val.trim() === "" || val === ".") {
      setPavanInput("");
      return;
    }
    const g = parseFloat(val);
    if (!isNaN(g)) {
      setPavanInput(String(Math.round((g / 8) * 100) / 100));
    }
  };

  const numGrams = parseFloat(gramInput) || 0;
  const estimatedGoldValue = Math.round(numGrams * DAILY_GOLD_RATES.gold22kPerGram);
  const estimatedVaValue = Math.round(estimatedGoldValue * 0.08); // avg 8% making charge
  const estimatedGstValue = Math.round((estimatedGoldValue + estimatedVaValue) * 0.03);
  const totalEstimatedCost = estimatedGoldValue + estimatedVaValue + estimatedGstValue;

  return (
    <>
      <aside aria-label="Daily Kerala Gold Rate" className="w-full bg-secondary/80 border-b border-border/60 text-foreground py-2 px-4 sm:px-6 md:px-12 xl:px-16 text-xs transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          {/* Left: Benchmark Rates Ticker */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
              <span className="font-heading font-semibold text-[13px] tracking-wide text-foreground">
                Today&apos;s Gold Rate
              </span>
              <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                ({DAILY_GOLD_RATES.marketLocation.split("&")[0].trim()})
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground uppercase text-[11px]">22K / Pavan (8g):</span>
                <span className="font-semibold text-foreground tabular-nums">
                  ₹{DAILY_GOLD_RATES.gold22kPerPavan.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center" aria-label="up 15 rupees">
                  <TrendingUp className="size-3 inline ml-0.5" aria-hidden="true" />
                  {DAILY_GOLD_RATES.change22k}
                </span>
              </div>

              <span className="text-border hidden sm:inline" aria-hidden="true">|</span>

              <div className="hidden md:flex items-center gap-1">
                <span className="text-muted-foreground uppercase text-[11px]">22K / Gram:</span>
                <span className="font-semibold text-foreground tabular-nums">
                  ₹{DAILY_GOLD_RATES.gold22kPerGram.toLocaleString("en-IN")}
                </span>
              </div>

              <span className="text-border hidden md:inline" aria-hidden="true">|</span>

              <div className="hidden lg:flex items-center gap-1">
                <span className="text-muted-foreground uppercase text-[11px]">24K Pure:</span>
                <span className="font-medium text-foreground tabular-nums">
                  ₹{DAILY_GOLD_RATES.gold24kPerGram.toLocaleString("en-IN")} /g
                </span>
              </div>

              <span className="text-border hidden xl:inline" aria-hidden="true">|</span>

              <div className="hidden xl:flex items-center gap-1">
                <span className="text-muted-foreground uppercase text-[11px]">18K:</span>
                <span className="font-medium text-foreground tabular-nums">
                  ₹{DAILY_GOLD_RATES.gold18kPerGram.toLocaleString("en-IN")} /g
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Calculator Trigger & Timestamp */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setCalculatorOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono text-accent hover:text-accent/80 transition-colors underline underline-offset-4 cursor-pointer"
            >
              <Scale className="size-3" aria-hidden="true" />
              <span>Pavan Calculator</span>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
              <Clock className="size-3" aria-hidden="true" />
              <span>{DAILY_GOLD_RATES.lastUpdated}</span>
            </span>
          </div>
        </div>
      </aside>

      {/* Gold & Pavan Calculator Modal */}
      <Dialog open={calculatorOpen} onOpenChange={setCalculatorOpen}>
        <DialogContent className="max-w-md bg-background border border-border p-6">
          <DialogHeader className="pb-3 border-b border-border/50">
            <DialogTitle className="font-heading text-xl font-normal text-foreground">
              Kerala Sovereign Gold Calculator
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Live estimate based on today&apos;s 22K rate (₹{DAILY_GOLD_RATES.gold22kPerGram}/g • ₹{DAILY_GOLD_RATES.gold22kPerPavan}/Pavan).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-3">
            {/* Input Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pavan-input" className="text-xs font-mono uppercase text-muted-foreground block mb-1.5">
                  Pavans (Sovereigns)
                </label>
                <div className="relative">
                  <input
                    id="pavan-input"
                    type="number"
                    inputMode="decimal"
                    step="any"
                    placeholder="0"
                    value={pavanInput}
                    onChange={(e) => handlePavanChange(e.target.value)}
                    className="w-full bg-secondary border border-border px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-accent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-muted-foreground pointer-events-none">
                    Pavan
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="gram-input" className="text-xs font-mono uppercase text-muted-foreground block mb-1.5">
                  Grams Equivalent
                </label>
                <div className="relative">
                  <input
                    id="gram-input"
                    type="number"
                    inputMode="decimal"
                    step="any"
                    placeholder="0"
                    value={gramInput}
                    onChange={(e) => handleGramChange(e.target.value)}
                    className="w-full bg-secondary border border-border px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-accent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-muted-foreground pointer-events-none">
                    Grams
                  </span>
                </div>
              </div>
            </div>

            {/* Transparent Calculation Breakdown */}
            <div className="bg-secondary/60 p-4 border border-border/40 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Net Gold Value ({numGrams}g × ₹{DAILY_GOLD_RATES.gold22kPerGram})</span>
                <span className="tabular-nums text-foreground font-medium">₹{estimatedGoldValue.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Approx. Making Charges (VA ~8%)</span>
                <span className="tabular-nums text-foreground font-medium">₹{estimatedVaValue.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>GST (3% on Gold + VA)</span>
                <span className="tabular-nums text-foreground font-medium">₹{estimatedGstValue.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between items-baseline text-sm font-bold text-foreground">
                <span>Estimated Billing:</span>
                <span className="font-heading text-lg text-accent tabular-nums">
                  ₹{totalEstimatedCost.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Note & Action */}
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground">
              <Info className="size-4 shrink-0 text-accent mt-0.5" aria-hidden="true" />
              <p>
                All Amara Gold jewelry is 100% BIS 916 laser hallmarked with government HUID. Making charges vary between 6% to 14% based on filigree complexity.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link
                href="/collections"
                onClick={() => setCalculatorOpen(false)}
                className="w-full py-2.5 px-4 bg-primary text-primary-foreground text-center text-xs font-medium uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Browse 916 Catalog for this Weight
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
