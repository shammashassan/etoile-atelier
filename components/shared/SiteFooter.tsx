import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/data";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface SiteFooterProps {
  atelierName?: string;
}

export function SiteFooter({ atelierName = BRAND.name }: SiteFooterProps) {
  return (
    <footer className="dark bg-background text-foreground px-6 md:px-12 xl:px-16 pt-28 pb-28 md:pb-16">
      <div className="flex flex-col gap-16">
        {/* Monumental Wordmark: Spans Full Screen */}
        <div>
          <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-normal tracking-wide uppercase block text-foreground/90 select-none">
            {atelierName}
          </span>
          <span className="text-base text-muted-foreground block mt-2">
            {BRAND.fullSubtitle}
          </span>
        </div>

        {/* Navigation & Salon Ledger */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-xs text-muted-foreground pt-8 bg-card/60 p-8">
          <div className="flex flex-col gap-2.5">
            <span className="font-medium text-foreground text-xs uppercase tracking-wider block">
              Salons
            </span>
            {BRAND.salons.map((salon) => (
              <p key={salon.id} className="leading-relaxed">
                {salon.city} • {salon.address}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-medium text-foreground text-xs uppercase tracking-wider block">
              Acquisitions
            </span>
            <Link href="/collections" className="hover:text-foreground transition-colors leading-relaxed">
              Solitaire High Jewels
            </Link>
            <Link href="/collections?category=Rings" className="hover:text-foreground transition-colors leading-relaxed">
              Rare Gemstone Rings
            </Link>
            <Link href="/collections?category=Necklaces" className="hover:text-foreground transition-colors leading-relaxed">
              Haute Collars &amp; Pendants
            </Link>
            <Link href="/consultation" className="hover:text-foreground transition-colors leading-relaxed">
              Bespoke Commissions
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-medium text-foreground text-xs uppercase tracking-wider block">
              Atelier Governance
            </span>
            {BRAND.governance.map((item) => (
              <p key={item} className="leading-relaxed">{item}</p>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-medium text-foreground text-xs uppercase tracking-wider block">
              Private Access
            </span>
            <Link href="/consultation" className="hover:text-foreground transition-colors leading-relaxed">
              Schedule Private Viewing
            </Link>
            <Link href="/admin/login" className="hover:text-foreground transition-colors leading-relaxed">
              Director Management Portal
            </Link>
            <p className="mt-1 text-muted-foreground/80 leading-relaxed">
              Direct Inquiries:{" "}
              <a href={`mailto:${BRAND.contact.email}`} className="hover:text-foreground underline underline-offset-2">
                {BRAND.contact.email}
              </a>
            </p>
          </div>
        </div>

        {/* Legal Museum Credits: Discreet Haute Joaillerie Provenance Disclosure */}
        <div className="border-t border-border/40 pt-6 flex flex-col gap-4 text-xs text-muted-foreground/80">
          <Collapsible className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs">
                {BRAND.museumProvenance.title}
              </span>
              <CollapsibleTrigger className="hover:text-foreground text-xs underline underline-offset-4 cursor-pointer transition-colors text-left sm:text-right">
                View Full Provenance &amp; Accession Ledger
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="text-xs leading-relaxed text-muted-foreground/70 bg-card/40 p-4 border border-border/30 mt-2">
              {BRAND.museumProvenance.summary}
            </CollapsibleContent>
          </Collapsible>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 text-xs">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>© 2026 {atelierName}. All rights reserved.</span>
              <span className="text-border/60 hidden sm:inline" aria-hidden="true">•</span>
              <Link href="/terms" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                Terms of Service
              </Link>
              <span className="text-border/60 hidden sm:inline" aria-hidden="true">•</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
            </div>
            <span>{BRAND.citiesSummary}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
