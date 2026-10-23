import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { JewelryStudioClient } from "@/components/shared/JewelryStudioClient";
import {
  MotionSection,
  MotionItem,
  MaskedLineHeadline,
  ShutterImage,
} from "@/components/shared/motion/MotionSection";

export default async function Home() {
  const [products, settings] = await Promise.all([
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground overflow-x-clip selection:bg-primary selection:text-primary-foreground">
      {/* ── CHAPTER 1: THE ALABASTER PAVILION (Warm French Limestone Field) ── */}
      <section className="bg-background text-foreground">
        {/* Top Quiet Bar */}
        <div className="bg-secondary px-6 md:px-12 xl:px-16 py-3 text-base text-muted-foreground flex justify-between items-center">
          <span>{settings.announcementBar}</span>
          <span className="hidden sm:inline">Paris • Geneva • London • New York</span>
        </div>

        {/* Haute Joaillerie Navigation */}
        <header className="sticky top-0 z-40 bg-background px-6 md:px-12 xl:px-16 py-6">
          <div className="flex items-center justify-between">
            <nav className="hidden md:flex items-center gap-10 text-base text-muted-foreground">
              <Link href="/collections" className="transition-colors hover:text-foreground">
                Collections
              </Link>
              <Link href="/consultation" className="transition-colors hover:text-foreground">
                Bespoke Salon
              </Link>
              <Link href="#studio" className="transition-colors hover:text-foreground">
                Optical Studio
              </Link>
              <Link href="#vault" className="transition-colors hover:text-foreground">
                Vendôme Vault
              </Link>
            </nav>

            <Link href="/" className="text-center group">
              <span className="font-heading text-2xl md:text-3xl font-normal tracking-wide text-foreground block">
                {settings.atelierName}
              </span>
              <span className="text-sm text-muted-foreground block -mt-0.5">
                Place Vendôme • Haute Joaillerie
              </span>
            </Link>

            <div className="flex items-center gap-6 text-base">
              <Link
                href="/admin/login"
                className="hidden lg:inline text-muted-foreground hover:text-foreground transition-colors"
              >
                Director Portal
              </Link>
              <Link
                href="/consultation"
                className="bg-primary text-primary-foreground px-6 py-3 text-base font-medium transition-transform duration-150 active:scale-[0.98] hover:bg-primary/90"
              >
                Book Private Viewing
              </Link>
            </div>
          </div>
        </header>

        {/* HERO: Asymmetric Photographic Rail (three-prints-one-line) */}
        <div className="px-6 md:px-12 xl:px-16 pt-12 pb-24 lg:pt-16 lg:pb-32">
          {/* Top Line: Monumental Masked Headline Left + Off-Center Statement Right */}
          <div className="grid gap-8 lg:grid-cols-12 items-baseline mb-20">
            <div className="lg:col-span-7">
              <MaskedLineHeadline
                lines={["Rare Gemstones,", "Sculpted by Hand."]}
                tag="h1"
                className="text-4xl sm:text-6xl lg:text-7xl leading-[1.05]"
              />
            </div>
            <MotionItem delay={0.2} className="lg:col-span-5">
              <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                Handcrafted in our Place Vendôme workshops with unheated Ceylon sapphires, Muzo emeralds, and certified natural diamonds set in solid Platinum 950.
              </p>
              <div className="mt-6">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  View Salon Catalog
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </MotionItem>
          </div>

          {/* Uneven Tri-Print Rail: Three Archival & Salon Masterpieces */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-12 items-start">
            {/* Print 1 (Cols 1-3, offset down): 11th–13th c. Sapphire Gold Ring (The Met) */}
            <div className="md:col-span-3 flex flex-col gap-3 md:mt-16">
              <ShutterImage
                src="/assets/ring.jpg"
                alt="Imperial Gold and Sapphire Ring, 11th–13th century, The Metropolitan Museum of Art"
                aspectRatio="aspect-square"
                sizes="(max-width: 768px) 100vw, 25vw"
                delay={0.1}
              />
              <div className="flex flex-col text-base pt-1">
                <span className="text-foreground font-medium">Imperial Sapphire &amp; Gold Ring</span>
                <span className="text-sm text-muted-foreground">11th–13th Century • The Met Collection</span>
              </div>
            </div>

            {/* Print 2 (Cols 4-8): The Solitaire Lumina Diamond Ring in Platinum 950 */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <ShutterImage
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"
                alt="The Solitaire Lumina Diamond Ring in sculpted solid Platinum 950"
                aspectRatio="aspect-3/4"
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                delay={0.2}
              />
              <div className="flex flex-col sm:flex-row justify-between text-base pt-1 gap-1">
                <span className="text-foreground font-medium">Solitaire Lumina in Platinum 950</span>
                <span className="text-sm text-muted-foreground">2.15 ct Brilliant Cut • GIA Verified</span>
              </div>
            </div>

            {/* Print 3 (Cols 9-12): 1851 Koh-I-Noor Lapidary Plate (The Met) */}
            <div className="md:col-span-4 flex flex-col gap-3 md:mt-8">
              <ShutterImage
                src="/assets/drawing-of-the-koh-i-noor-diamond.jpg"
                alt="Archival Drawing of the Koh-I-Noor Diamond, 1851, R. S. Garrard & Co."
                aspectRatio="aspect-16/10"
                sizes="(max-width: 768px) 100vw, 33vw"
                delay={0.3}
              />
              <div className="flex flex-col sm:flex-row justify-between text-base pt-1 gap-1">
                <span className="text-foreground font-medium">Koh-I-Noor Lapidary Folio, 1851</span>
                <span className="text-sm text-muted-foreground">The Met Collection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 2: THE OPTICAL & METALLURGY BENCH (Dark Gemological Slate Field) ── */}
      <section id="studio" className="dark bg-background text-foreground px-6 md:px-12 xl:px-16 py-28 lg:py-36">
        <JewelryStudioClient products={products} />
      </section>

      {/* ── CHAPTER 3: CURATED SALON ACQUISITIONS (Warm Ivory Suede Field) ── */}
      <section id="collections" className="bg-card text-card-foreground px-6 md:px-12 xl:px-16 py-28 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Editorial Anchor Column (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <MotionSection>
              <h2 className="font-heading text-3xl font-normal text-foreground sm:text-5xl leading-tight">
                Salon Acquisitions
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-prose">
                Direct private acquisition or confidential salon viewing in Paris, Geneva, London, and New York. Each creation is unique and hallmarked.
              </p>
              <div className="mt-6">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-1.5 text-base font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  View Complete Salon Catalog
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </MotionSection>

            {/* Curated Editorial Notes */}
            <div className="flex flex-col gap-6 pt-6 text-base text-muted-foreground">
              <MotionItem delay={0.1} className="bg-secondary p-6">
                <span className="font-medium text-foreground block mb-1">
                  Dual Gemological Certification
                </span>
                <p className="leading-relaxed">
                  Every solitaire is documented with concurrent GIA and LFG Paris laboratory dossiers detailing origin, clarity, and unheated status.
                </p>
              </MotionItem>
              <MotionItem delay={0.2} className="bg-secondary p-6">
                <span className="font-medium text-foreground block mb-1">
                  Place Vendôme Handover
                </span>
                <p className="leading-relaxed">
                  Hand delivery arranged via armored courier worldwide or personal handover in our private salon suite.
                </p>
              </MotionItem>
            </div>
          </div>

          {/* Right Showcase: Blueprint frame-run-one-lifted (Cols 5-12) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* The Lifted Piece: Masterpiece at Full Scale */}
            {products[0] && (
              <MotionItem delay={0.1} className="flex flex-col gap-4 group">
                <Link href={`/products/${products[0].slug}`} className="block overflow-hidden bg-secondary">
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    {products[0].images[0] && (
                      <Image
                        src={products[0].images[0].url}
                        alt={products[0].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2">
                  <div>
                    <Link
                      href={`/products/${products[0].slug}`}
                      className="font-heading text-2xl font-normal text-foreground hover:underline"
                    >
                      {products[0].title}
                    </Link>
                    <p className="text-base text-muted-foreground mt-1">
                      {products[0].metals[0]} • {products[0].gemstones[0]} {products[0].caratWeight ? `(${products[0].caratWeight} ct)` : ""} • {products[0].clarity || "Natural Untreated"}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="font-heading text-2xl font-light text-foreground block">
                      ${products[0].price.toLocaleString()}
                    </span>
                    <span className="text-sm text-primary font-medium">Immediate Acquisition</span>
                  </div>
                </div>
              </MotionItem>
            )}

            {/* Secondary Pieces: Staggered Pair with Offsets */}
            <div className="grid gap-8 sm:grid-cols-2">
              {products.slice(1, 3).map((item, idx) => (
                <MotionItem key={item.slug} delay={0.2 * (idx + 1)} className="flex flex-col gap-3 group">
                  <Link href={`/products/${item.slug}`} className="block overflow-hidden bg-secondary">
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      {item.images[0] && (
                        <Image
                          src={item.images[0].url}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                    </div>
                  </Link>
                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-heading text-xl font-normal text-foreground block hover:underline"
                      >
                        {item.title}
                      </Link>
                      <span className="text-base text-muted-foreground">
                        {item.metals[0]} • {item.gemstones[0]}
                      </span>
                    </div>
                    <span className="font-heading text-xl font-normal text-foreground">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                </MotionItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 4: THE NOCTURNE VAULT (Deep Obsidian Velvet Noir Field) ── */}
      <section id="vault" className="dark bg-background text-foreground px-6 md:px-12 xl:px-16 py-28 lg:py-36">
        <div className="flex flex-col gap-20">
          {/* Header on Dark Ground */}
          <div className="grid gap-8 lg:grid-cols-12 items-baseline">
            <div className="lg:col-span-8">
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                The Place Vendôme Vault: Lapidary Provenance
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                Historic mountings, master stone-setting techniques, and unheated gemstone specimens preserved in European high jewelry archives.
              </p>
            </div>
          </div>

          {/* Asymmetric Staggered Pairs in Dark Room (Met Museum Masterworks) */}
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Met Archive 1: Marcus & Co. Double Ring (Cols 1-5, Tall Portrait Frame) */}
            <MotionItem delay={0.1} className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-card">
                <Image
                  src="/assets/double-ring.jpg"
                  alt="Double Ring in Gold and Emerald, Marcus and Co., ca. 1895, Met Museum"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <h3 className="font-heading text-2xl font-normal text-foreground">
                  Marcus &amp; Co. Double Ring (ca. 1895)
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Emerald, natural pearls, and 18-karat sculpted gold. Open pavilion setting allowing uninhibited light dispersion.
                </p>
                <span className="text-sm text-primary font-medium mt-1">
                  Accession 16835 • The Metropolitan Museum of Art (CC0)
                </span>
              </div>
            </MotionItem>

            {/* Met Archive 2 & 3: Staggered Right Stack (Cols 6-12) */}
            <div className="lg:col-span-7 flex flex-col gap-16 lg:mt-12">
              {/* Met Archive 2: Gemological Royal Sapphire Necklace (Wide Landscape) */}
              <MotionItem delay={0.2} className="flex flex-col gap-4">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-card">
                  <Image
                    src="/assets/necklace.jpg"
                    alt="Historic 18th-century necklace with colorless sapphires and gold collets, Met Museum"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <h3 className="font-heading text-2xl font-normal text-foreground">
                    18th-Century Colorless Sapphire Collet Necklace
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Uncut table and rose-cut sapphire specimens linked with individual hand-soldered bezels, illustrating raw mineral refractory index.
                  </p>
                  <span className="text-sm text-primary font-medium mt-1">
                    Accession 446767 • The Metropolitan Museum of Art (CC0)
                  </span>
                </div>
              </MotionItem>

              {/* Met Archive 3: Duchess of Devonshire Portrait Diamond */}
              <MotionItem delay={0.3} className="grid sm:grid-cols-12 gap-6 items-center bg-card p-6 md:p-8">
                <div className="sm:col-span-5 relative aspect-square w-full overflow-hidden bg-secondary">
                  <Image
                    src="/assets/duchess-of-devonshire-portrait-diamond.jpg"
                    alt="Duchess of Devonshire Portrait Diamond, 19th c. Met Museum"
                    fill
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="sm:col-span-7 flex flex-col gap-2">
                  <h3 className="font-heading text-xl font-normal text-foreground">
                    Duchess of Devonshire Portrait Diamond
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    19th-century portrait diamond cut so extraordinarily thin it was mounted over miniature portraits like optical glass.
                  </p>
                  <span className="text-sm text-primary font-medium">
                    Accession 811876 • The Metropolitan Museum of Art (CC0)
                  </span>
                </div>
              </MotionItem>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 5: BESPOKE SALON CONCIERGE (Warm Architectural Sand Field) ── */}
      <section className="bg-muted text-foreground px-6 md:px-12 xl:px-16 py-28 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 items-baseline">
          {/* Left Invitation */}
          <MotionSection className="lg:col-span-5">
            <h2 className="font-heading text-3xl font-normal text-foreground sm:text-5xl leading-tight">
              Private Salon Appointments
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-prose">
              Experience high jewelry collections in total privacy. Each appointment provides dedicated gemological consultation, champagne service, and complete vault access.
            </p>
            <div className="mt-8">
              <Link
                href="/consultation"
                className="bg-primary text-primary-foreground px-8 py-4 text-base font-medium inline-block transition-transform duration-150 active:scale-[0.98] hover:bg-primary/90"
              >
                Schedule Private Consultation
              </Link>
            </div>
          </MotionSection>

          {/* Right Coordinates: Architectural 4-City Tabular Ledger */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <MotionItem delay={0.1} className="bg-secondary p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-normal text-foreground">
                  Paris Vendôme Salon
                </h3>
                <p className="text-base text-muted-foreground mt-0.5">12 Place Vendôme, 75001 Paris • By Private Appointment Only</p>
              </div>
              <Link
                href="/consultation"
                className="text-base font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 shrink-0"
              >
                Request Paris Salon
              </Link>
            </MotionItem>

            <MotionItem delay={0.15} className="bg-secondary p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-normal text-foreground">
                  Geneva Rhône Salon
                </h3>
                <p className="text-base text-muted-foreground mt-0.5">Rue du Rhône 42, 1204 Genève • Tuesday – Saturday</p>
              </div>
              <Link
                href="/consultation"
                className="text-base font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 shrink-0"
              >
                Request Geneva Salon
              </Link>
            </MotionItem>

            <MotionItem delay={0.2} className="bg-secondary p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-normal text-foreground">
                  London Mayfair Salon
                </h3>
                <p className="text-base text-muted-foreground mt-0.5">14 New Bond Street, Mayfair, London • Monday – Friday</p>
              </div>
              <Link
                href="/consultation"
                className="text-base font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 shrink-0"
              >
                Request London Salon
              </Link>
            </MotionItem>

            <MotionItem delay={0.25} className="bg-secondary p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-normal text-foreground">
                  New York Madison Salon
                </h3>
                <p className="text-base text-muted-foreground mt-0.5">680 Madison Avenue, New York, NY • By Private Appointment Only</p>
              </div>
              <Link
                href="/consultation"
                className="text-base font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 shrink-0"
              >
                Request New York Salon
              </Link>
            </MotionItem>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 6: MONUMENTAL NOIR CLOSE (Footer) ── */}
      <footer className="dark bg-background text-foreground px-6 md:px-12 xl:px-16 pt-28 pb-16">
        <div className="flex flex-col gap-16">
          {/* Monumental Wordmark: Spans Full Screen */}
          <div>
            <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-normal tracking-wide uppercase block text-foreground/90 select-none">
              {settings.atelierName}
            </span>
            <span className="text-base text-muted-foreground block mt-2">
              Haute Joaillerie &amp; Fine Lapidary Arts • Place Vendôme • Established 1924
            </span>
          </div>

          {/* Navigation & Salon Ledger */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-base text-muted-foreground pt-8 bg-card/60 p-8">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-foreground text-base block">
                Salons
              </span>
              <p>Paris • 12 Place Vendôme</p>
              <p>Geneva • Rue du Rhône 42</p>
              <p>London • 14 New Bond Street</p>
              <p>New York • 680 Madison Avenue</p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-medium text-foreground text-base block">
                Acquisitions
              </span>
              <Link href="/collections" className="hover:text-foreground transition-colors">
                Solitaire High Jewels
              </Link>
              <Link href="/collections?category=Rings" className="hover:text-foreground transition-colors">
                Rare Gemstone Rings
              </Link>
              <Link href="/collections?category=Necklaces" className="hover:text-foreground transition-colors">
                Haute Collars &amp; Pendants
              </Link>
              <Link href="/consultation" className="hover:text-foreground transition-colors">
                Bespoke Commissions
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-medium text-foreground text-base block">
                Atelier Governance
              </span>
              <p>Solid Platinum 950 Metallurgy</p>
              <p>18-Karat Recycled Gold</p>
              <p>Kimberley Process Audited</p>
              <p>GIA &amp; LFG Double Certification</p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-medium text-foreground text-base block">
                Private Access
              </span>
              <Link href="/consultation" className="hover:text-foreground transition-colors">
                Schedule Private Viewing
              </Link>
              <Link href="/admin/login" className="hover:text-foreground transition-colors">
                Director Management Portal
              </Link>
              <p className="text-sm mt-2 text-muted-foreground/80">
                Direct Inquiries: concierge@etoile-atelier.com
              </p>
            </div>
          </div>

          {/* Legal Museum Credits */}
          <div className="text-base leading-relaxed text-muted-foreground pt-4 flex flex-col gap-4">
            <p className="max-w-prose text-sm">
              Archival museum imagery: Drawing of the Koh-I-Noor Diamond (1851, R. S. Garrard &amp; Co., Acc. 363608), Double Ring (ca. 1895, Marcus &amp; Co., Acc. 16835), Duchess of Devonshire Portrait Diamond (19th c., Acc. 811876), Sapphire Necklace (18th c., Acc. 446767), and Imperial Gold Ring (11th–13th c., Acc. 451108) via The Metropolitan Museum of Art (CC0 Public Domain).
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 text-sm">
              <span>© 2026 {settings.atelierName}. All rights reserved.</span>
              <span>Place Vendôme • Geneva • London • New York</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
