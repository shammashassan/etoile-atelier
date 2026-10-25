import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/queries/settings";
import { BRAND } from "@/lib/data";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MaskedLineHeadline } from "@/components/shared/motion/MotionSection";
import {
  ShieldCheck,
  Landmark,
  Truck,
  Award,
  ArrowRight,
  Scale,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: BRAND.seo.termsTitle,
  description: BRAND.seo.termsDescription,
  alternates: {
    canonical: "/terms",
  },
};

const TERMS_SECTIONS = [
  { id: "entity", num: "01", label: "Entity & Jurisdiction" },
  { id: "commissions", num: "02", label: "Bespoke Commissions" },
  { id: "certification", num: "03", label: "Gemological Certification" },
  { id: "metallurgy", num: "04", label: "Metallurgy & Hallmarks" },
  { id: "logistics", num: "05", label: "Armored Logistics" },
  { id: "warranty", num: "06", label: "Care & Lifetime Warranty" },
  { id: "concierge", num: "07", label: "Concierge & Governance" },
];

const GUARANTEES = [
  {
    icon: Award,
    title: "Dual Gemological Dossiers",
    body: "Every solitaire diamond is verified concurrently by GIA and LFG Paris laboratory dossiers.",
  },
  {
    icon: Truck,
    title: "Armored White-Glove Transit",
    body: "Malca-Amit / Brink's armored courier dispatch with 100% door-to-door transit insurance.",
  },
  {
    icon: ShieldCheck,
    title: "Kimberley Process Audited",
    body: "100% natural, ethical gemstones adhering strictly to World Diamond Council protocols.",
  },
];

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-svh flex-col text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Uniform Haute Joaillerie Header */}
      <SiteHeader
        announcementBar={settings.announcementBar}
        atelierName={settings.atelierName}
      />

      {/* Main Content Area */}
      <main className="flex-1 bg-background px-6 md:px-12 xl:px-16 py-12 lg:py-20">
        {/* Editorial Page Hero (Aligned with Collections & Consultation pages) */}
        <header className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-medium">
            <Landmark className="size-3.5" />
            <span>Place Vendôme • Governance &amp; Protocol</span>
          </div>

          <MaskedLineHeadline
            lines={["Atelier Governance", "& Terms of Sale"]}
            tag="h1"
            className="text-4xl font-normal tracking-tight text-foreground sm:text-6xl"
          />

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Official protocols governing bespoke high-jewelry commissions, dual gemological laboratory verification, French Bureau de Garantie metallurgy, and fully-insured armored transit for {settings.atelierName}.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-normal rounded-none border-border">
              Paris S.A.S. • Est. 1924
            </Badge>
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-normal rounded-none border-border">
              Kimberley Audited
            </Badge>
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-normal rounded-none border-border">
              Solid Platinum 950
            </Badge>
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-normal rounded-none border-border">
              GIA &amp; LFG Paris Certified
            </Badge>
          </div>
        </header>

        {/* 12-Column Architectural Split (Matching ConsultationClient grid) */}
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Column: Index & Atelier Guarantees (5 cols) */}
          <aside className="space-y-8 lg:col-span-5 lg:sticky lg:top-28">
            {/* Quick Ledger Navigation Card */}
            <div className="bg-secondary p-6 sm:p-8 border border-border space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                  Governance Index
                </span>
                <p className="text-xs text-muted-foreground">
                  Codified Version 2026.1 • Legal Entity: {BRAND.legalName}
                </p>
              </div>

              <Separator className="opacity-50" />

              <nav className="flex flex-col space-y-2">
                {TERMS_SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="group flex items-center justify-between text-xs py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-muted-foreground/60 group-hover:text-primary transition-colors">
                        {sec.num}
                      </span>
                      <span>{sec.label}</span>
                    </span>
                    <ArrowRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Atelier Commitments Pillar (Matching Consultation Page Guarantee Badges) */}
            <div className="space-y-6 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                Atelier Standards
              </span>

              {GUARANTEES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-secondary text-foreground border border-border">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-normal text-foreground">
                      {title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Private Consultation Direct Action */}
            <div className="bg-secondary/60 p-6 border border-border space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground font-medium">
                <Calendar className="size-4 text-primary" />
                <span>Bespoke Commission Consultation</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Wish to discuss private acquisitions, diamond allocation, or custom setting designs with our master gemologists?
              </p>
              <Button
                variant="default"
                size="sm"
                className="w-full text-xs rounded-none border-border"
                render={<Link href="/consultation" />}
                nativeButton={false}
              >
                Schedule Private Viewing
              </Button>
            </div>
          </aside>

          {/* Right Column: Legal Articles & Specifications (7 cols) */}
          <div className="lg:col-span-7 bg-secondary p-8 sm:p-12 border border-border space-y-12">
            {/* Article 1 */}
            <section id="entity" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <Scale className="size-3.5" />
                <span>Article 01</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Atelier Entity &amp; Applicable Jurisdiction
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  These terms govern all transactions, private viewings, custom jewelry commissions, and digital acquisitions concluded through {settings.atelierName} (operated by {BRAND.legalName}, with its historic headquarters registered at {BRAND.headquarters.fullAddress}).
                </p>
                <p>
                  All contractual relationships are governed exclusively by the laws of the Republic of France. Any disputes arising in connection with the validity, interpretation, or execution of these terms shall be subject to the exclusive jurisdiction of the Commercial Tribunal of Paris (Tribunal de Commerce de Paris).
                </p>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 2 */}
            <section id="commissions" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 02</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Bespoke Commissions &amp; Private Viewing Protocols
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Private salon viewings in Paris, Geneva, London, and New York are arranged strictly by appointment. For bespoke high-jewelry commissions sculpted in our workshops:
                </p>
                <div className="bg-background/80 p-5 border border-border/60 space-y-2 text-xs">
                  <p><strong className="text-foreground">50% Creation Retainer:</strong> A non-refundable 50% deposit is required upon formal client sign-off of archival gouache drawings and 3D wax prototypes.</p>
                  <p><strong className="text-foreground">Irrevocable Gemstone Allocation:</strong> Once rare Ceylon sapphires, Colombian emeralds, or GIA-certified diamonds are mounted or cut to specification, orders cannot be cancelled or altered.</p>
                  <p><strong className="text-foreground">Workshop Timelines:</strong> Creation cycles generally require 6 to 12 weeks. Clients receive photographic progress ledgers directly from our master bench jewelers.</p>
                </div>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 3 */}
            <section id="certification" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 03</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Gemological Certification &amp; Ethical Provenance
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Every gemstone curated by {settings.atelierName} undergoes dual-tier gemological examination. All solitaires exceeding 0.50 carats are accompanied by authentic independent laboratory dossiers:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs">
                  <li><strong className="text-foreground">Gemological Institute of America (GIA):</strong> Primary certification of cut grade, clarity, carat weight, and 4Cs criteria.</li>
                  <li><strong className="text-foreground">Laboratoire Français de Gemmologie (LFG Paris):</strong> Paris accession report verifying natural, unheated, untreated geological origin.</li>
                  <li><strong className="text-foreground">Kimberley Process Auditing:</strong> Unconditional compliance with the Kimberley Process Certification Scheme (KPCS) and the World Diamond Council System of Warranties.</li>
                </ul>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 4 */}
            <section id="metallurgy" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 04</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                French Hallmarking &amp; Metallurgy Standards
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  In accordance with the French Bureau de Garantie (Paris Guarantee Office), all precious metal creations are stamped with statutory national hallmarks:
                </p>
                <div className="grid gap-3 sm:grid-cols-2 text-xs pt-1">
                  <div className="bg-background/80 p-4 border border-border/60 space-y-1">
                    <span className="font-heading text-sm text-foreground block">Solid Platinum 950</span>
                    <p className="text-muted-foreground">Struck with the French Dog&apos;s Head (Tête de Chien) hallmark. 950‰ pure platinum, hypoallergenic and nickel-free.</p>
                  </div>
                  <div className="bg-background/80 p-4 border border-border/60 space-y-1">
                    <span className="font-heading text-sm text-foreground block">18-Karat Recycled Gold</span>
                    <p className="text-muted-foreground">Struck with the French Eagle&apos;s Head (Tête d&apos;Aigle) hallmark. 100% recycled gold certified by the Responsible Jewellery Council.</p>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 5 */}
            <section id="logistics" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 05</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Insured Armored Logistics &amp; Salon Handover
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  All completed orders are dispatched using specialized high-value armored freight carriers (Malca-Amit or Brink&apos;s) with comprehensive insurance coverage:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs">
                  <li>Full 100% door-to-door transit insurance covering declared valuation until physical client signature.</li>
                  <li>Mandatory verification of government-issued photo ID upon handover.</li>
                  <li>Complimentary personal reception and handover at our salons in Paris, Geneva, London, or New York.</li>
                </ul>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 6 */}
            <section id="warranty" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 06</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Lifetime Atelier Care &amp; Alteration Limits
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Every authentic creation is protected by our lifetime atelier care guarantee, which includes complimentary ultrasonic cleansing, prong retipping inspection, and annual surface repolishing at any global salon.
                </p>
                <div className="bg-background/80 p-4 border border-border/60 text-xs text-muted-foreground">
                  <strong className="text-foreground">Important Warranty Notice:</strong> Any structural modification, ring sizing, or repair executed by an unaccredited third-party jeweler voids the atelier&apos;s warranty and accession dossier.
                </div>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 7 */}
            <section id="concierge" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 07</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Concierge Governance &amp; Inquiries
              </h2>
              <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  For inquiries concerning legal terms, institutional provenance dossiers, or bespoke viewing arrangements, please contact our director concierge:
                </p>
                <div className="bg-background/80 p-5 border border-border/60 space-y-1.5 text-xs">
                  <p><span className="text-foreground font-medium">Place Vendôme Concierge:</span> {BRAND.contact.email}</p>
                  <p><span className="text-foreground font-medium">Telephone Concierge:</span> {BRAND.contact.phone}</p>
                  <p><span className="text-foreground font-medium">Registered Address:</span> {BRAND.headquarters.fullAddress}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Uniform Monumental Footer */}
      <SiteFooter atelierName={settings.atelierName} />
    </div>
  );
}
