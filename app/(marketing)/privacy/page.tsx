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
  Lock,
  Shield,
  EyeOff,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: BRAND.seo.privacyTitle,
  description: BRAND.seo.privacyDescription,
  alternates: {
    canonical: "/privacy",
  },
};

const PRIVACY_SECTIONS = [
  { id: "heritage", num: "01", label: "Discretion Heritage" },
  { id: "dossiers", num: "02", label: "Dossier Information" },
  { id: "lawful-basis", num: "03", label: "GDPR Lawful Bases" },
  { id: "third-parties", num: "04", label: "Armored Couriers & Third Parties" },
  { id: "security", num: "05", label: "Vault Security & Encryption" },
  { id: "rights", num: "06", label: "Your Statutory Rights" },
  { id: "dpo", num: "07", label: "Data Protection Officer" },
];

const DISCRETION_PILLARS = [
  {
    icon: EyeOff,
    title: "Zero Third-Party Data Resale",
    body: "We never monetize, broker, or trade client identities, viewing notes, or purchasing histories.",
  },
  {
    icon: Lock,
    title: "Encrypted Salon Dossiers",
    body: "Access to private records is restricted strictly to the Atelier Director and your appointed master gemologist.",
  },
  {
    icon: Shield,
    title: "GDPR & Swiss FADP Standard",
    body: "Full compliance with the European General Data Protection Regulation and Swiss banking data secrecy conventions.",
  },
];

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-svh flex-col text-foreground">
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
            <span>Place Vendôme • Confidentiality Standard</span>
          </div>

          <MaskedLineHeadline
            lines={["Client Discretion", "& Privacy Charter"]}
            tag="h1"
            className="text-4xl font-normal tracking-tight text-foreground sm:text-6xl"
          />

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our uncompromised charter protecting private collector records, salon appointments, and gemological accession dossiers under Swiss and French banking-level data confidentiality standards.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-normal rounded-none border-border">
              GDPR &amp; FADP Standard
            </Badge>
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-normal rounded-none border-border">
              Zero Data Resale
            </Badge>
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-normal rounded-none border-border">
              Encrypted Vault Dossiers
            </Badge>
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-normal rounded-none border-border">
              Director-Restricted Access
            </Badge>
          </div>
        </header>

        {/* 12-Column Architectural Split (Matching ConsultationClient grid) */}
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Column: Index & Discretion Commitments (5 cols) */}
          <aside className="space-y-8 lg:col-span-5 lg:sticky lg:top-28">
            {/* Quick Ledger Navigation Card */}
            <div className="bg-secondary p-6 sm:p-8 border border-border space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                  Confidentiality Index
                </span>
                <p className="text-xs text-muted-foreground">
                  Codified Version 2026.1 • Data Controller: {BRAND.legalName}
                </p>
              </div>

              <Separator className="opacity-50" />

              <nav className="flex flex-col space-y-2">
                {PRIVACY_SECTIONS.map((sec) => (
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

            {/* Discretion Commitments Pillar */}
            <div className="space-y-6 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                Discretion Pillars
              </span>

              {DISCRETION_PILLARS.map(({ icon: Icon, title, body }) => (
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
                <span>Confidential Consultation</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All bespoke inquiries and appointment requests are transmitted via end-to-end encrypted protocols directly to our Place Vendôme director.
              </p>
              <Button
                variant="default"
                size="sm"
                className="w-full text-xs rounded-none"
                render={<Link href="/consultation" />}
                nativeButton={false}
              >
                Request Private Appointment
              </Button>
            </div>
          </aside>

          {/* Right Column: Privacy Articles & Policy Terms (7 cols) */}
          <div className="lg:col-span-7 bg-secondary p-8 sm:p-12 border border-border space-y-12">
            {/* Article 1 */}
            <section id="heritage" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <ShieldCheck className="size-3.5" />
                <span>Article 01</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Commitment to Collector Discretion
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  At {settings.atelierName}, discretion is the cornerstone of haute joaillerie. Rooted in the century-old tradition of Parisian high jewelry and Swiss private client confidentiality, we treat all personal, gemological, and financial information with utmost reserve.
                </p>
                <p>
                  This charter outlines the protocols under which {BRAND.legalName} collects, stores, processes, and safeguards client information across our digital salon portal and our physical showrooms in Kochi, Kozhikode, Thrissur, and Dubai.
                </p>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 2 */}
            <section id="dossiers" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 02</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Information Collected Within Commission Dossiers
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  To provide tailored lapidary and goldsmithing services, we collect only necessary information voluntarily provided by you:
                </p>
                <div className="bg-background/80 p-5 border border-border/60 space-y-2 text-xs">
                  <p><strong className="text-foreground">Identity &amp; Logistics:</strong> Legal client name, verified email, telephone number, and physical courier address for insured armored handover.</p>
                  <p><strong className="text-foreground">Sizing &amp; Commission Specifications:</strong> Accurate ring measurements, wrist dimensions, metal preferences (Platinum 950 / 18k gold), and custom engraving inscriptions.</p>
                  <p><strong className="text-foreground">Accession Records:</strong> Original laboratory certificates from GIA and LFG Paris, unique laser-inscribed serial identifiers, and lifetime maintenance ledgers.</p>
                </div>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 3 */}
            <section id="lawful-basis" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 03</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Lawful Bases of Processing (GDPR Article 6)
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  All data processing is conducted strictly under lawful bases codified in European Union Regulation (EU 2016/679) and Swiss Federal Data Protection Act (FADP):
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs">
                  <li><strong className="text-foreground">Contractual Necessity:</strong> Executing bespoke creation orders, allocating rare gemstones, and coordinating insured armored logistics.</li>
                  <li><strong className="text-foreground">Regulatory Compliance:</strong> Adhering to French, Swiss, and international Anti-Money Laundering (AML) standards and Kimberley Process diamond origin registers.</li>
                  <li><strong className="text-foreground">Archival Provenance:</strong> Maintaining immutable authenticity records to facilitate lifetime authentication and salon maintenance across generations.</li>
                </ul>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 4 */}
            <section id="third-parties" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 04</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Armored Freight Couriers &amp; Third Parties
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  We maintain a strict prohibition against selling, renting, or trading client data with ad brokers or marketing syndicates. Data is shared exclusively on a confidential need-to-know basis with verified operational partners:
                </p>
                <div className="grid gap-3 sm:grid-cols-2 text-xs pt-1">
                  <div className="bg-background/80 p-4 border border-border/60 space-y-1">
                    <span className="font-heading text-sm text-foreground block">Armored Logistics</span>
                    <p className="text-muted-foreground">Malca-Amit and Brink&apos;s armored transport strictly for secure physical handover and verified signature delivery.</p>
                  </div>
                  <div className="bg-background/80 p-4 border border-border/60 space-y-1">
                    <span className="font-heading text-sm text-foreground block">Gemological Laboratories</span>
                    <p className="text-muted-foreground">GIA, LFG Paris, or SSEF strictly for gemstone accession, grading, and laser girdle inscription verification.</p>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 5 */}
            <section id="security" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 05</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Vault Security &amp; Archival Encryption
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Digital dossiers are protected with industry-standard AES-256 encryption at rest and TLS 1.3 in transit. Internal access is protected by multi-factor authentication restricted exclusively to the Atelier Director and assigned master gemologists.
                </p>
                <p>
                  Archival gouache drawings, accession books, and original gemological dossiers are held under climate-controlled vault security at our 12 Place Vendôme workshops.
                </p>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 6 */}
            <section id="rights" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 06</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Your Inviolable Statutory Rights
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Under the European General Data Protection Regulation (GDPR) and Swiss FADP, you possess complete control over your private information:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs">
                  <li><strong className="text-foreground">Right of Access:</strong> Request a complete copy of your commission ledger and contact profile.</li>
                  <li><strong className="text-foreground">Right to Rectification:</strong> Update contact records, preferred salon locations, or sizing dossiers.</li>
                  <li><strong className="text-foreground">Right to Erasure:</strong> Request the deletion of marketing and contact records (excluding records legally required for tax and precious metal traceability audits).</li>
                  <li><strong className="text-foreground">Zero Tracking Telemetry:</strong> Our portal operates without third-party ad tracking pixels or behavioural cookies.</li>
                </ul>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* Article 7 */}
            <section id="dpo" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <span>Article 07</span>
              </div>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                Data Protection Officer &amp; Inquiries
              </h2>
              <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  To exercise any of your privacy rights or request dossier consultation, please contact our Data Protection Office directly:
                </p>
                <div className="bg-background/80 p-5 border border-border/60 space-y-1.5 text-xs">
                  <p><span className="text-foreground font-medium">Direct Concierge Email:</span> {BRAND.contact.email}</p>
                  <p><span className="text-foreground font-medium">Corporate Entity:</span> {BRAND.legalName}</p>
                  <p><span className="text-foreground font-medium">Postal Address:</span> Attention: Data Protection Officer, {BRAND.headquarters.fullAddress}</p>
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
