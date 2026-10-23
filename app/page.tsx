import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { JewelryStudioClient } from "@/components/shared/JewelryStudioClient";

export default async function Home() {
  const [products, settings] = await Promise.all([
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Quiet Bar */}
      <div className="bg-secondary px-6 py-2 text-xs text-muted-foreground flex justify-between items-center">
        <span>{settings.announcementBar}</span>
        <span className="hidden sm:inline">Paris • Geneva • London • New York</span>
      </div>

      {/* Main Haute Joaillerie Header: Flat, Architectural, Zero Glass */}
      <header className="sticky top-0 z-40 bg-background border-b border-border/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <nav className="flex items-center gap-8 text-xs tracking-wider text-muted-foreground">
            <Link href="/collections" className="transition-colors hover:text-foreground">
              Collections
            </Link>
            <Link href="/consultation" className="transition-colors hover:text-foreground">
              Bespoke Salon
            </Link>
            <Link href="#atelier" className="transition-colors hover:text-foreground">
              Atelier
            </Link>
          </nav>

          <Link href="/" className="text-center group">
            <span className="font-heading text-2xl font-normal tracking-widest uppercase text-foreground block">
              {settings.atelierName}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground block -mt-0.5">
              Haute Joaillerie
            </span>
          </Link>

          <div className="flex items-center gap-6 text-xs">
            <Link
              href="/admin/login"
              className="hidden md:inline text-muted-foreground hover:text-foreground transition-colors"
            >
              Director Portal
            </Link>
            <Link
              href="/consultation"
              className="bg-foreground text-background px-4 py-2 text-xs font-medium transition-colors hover:bg-foreground/90"
            >
              Book Salon Viewing
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO: Asymmetric Prints with Staggered Type Scale */}
        <section className="px-6 pt-16 pb-24 lg:px-12 lg:pt-24 lg:pb-32">
          <div className="container mx-auto">
            {/* Top Row: Confident 2-Line Headline and Introductory Statement */}
            <div className="grid gap-8 lg:grid-cols-12 items-baseline mb-16">
              <div className="lg:col-span-8">
                <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  Rare Gemstones, Sculpted by Hand.
                </h1>
              </div>
              <div className="lg:col-span-4">
                <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
                  Handcrafted in our Paris Place Vendôme workshops with unheated sapphires, Colombian emeralds, and certified natural diamonds.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-xs font-medium text-foreground hover:text-foreground/80 underline underline-offset-4"
                  >
                    View Salon Collection
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Asymmetric Tri-Print Mosaic: Three Prints, Uneven Heights */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-12 items-end">
              {/* Print 1: Portrait Master Jewel (Cols 1-5) */}
              <div className="md:col-span-5 flex flex-col gap-3">
                <div className="relative aspect-3/4 w-full overflow-hidden bg-secondary">
                  <Image
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"
                    alt="The Solitaire Lumina Diamond Ring in sculpted Platinum 950"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Solitaire Lumina in Platinum 950</span>
                  <span>2.15 ct Brilliant Cut</span>
                </div>
              </div>

              {/* Print 2: Intimate Facet Macro (Cols 6-8) */}
              <div className="md:col-span-3 flex flex-col gap-3">
                <div className="relative aspect-square w-full overflow-hidden bg-secondary">
                  <Image
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
                    alt="Céleste Royal Blue Sapphire Cushion Pendant"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Céleste Royal Sapphire</span>
                  <span>3.40 ct Ceylon</span>
                </div>
              </div>

              {/* Print 3: Historic Met Lapidary Drawing (Cols 9-12) */}
              <div className="md:col-span-4 flex flex-col gap-3">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary">
                  <Image
                    src="/assets/drawing-of-the-koh-i-noor-diamond.jpg"
                    alt="Archival Drawing of the Koh-I-Noor Diamond, 1851"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Archival Lapidary Folio, 1851</span>
                  <span>Met Collection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: The Live Thing — Interactive Optical & Metallurgy Studio */}
        <section id="studio" className="bg-secondary/40 px-6 py-24 lg:px-12 lg:py-32">
          <div className="container mx-auto">
            <JewelryStudioClient products={products} />
          </div>
        </section>

        {/* SECTION: Curated Salon Masterpieces — Asymmetric Editorial Layout */}
        <section id="collections" className="px-6 py-24 lg:px-12 lg:py-32">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 gap-6">
              <div>
                <h2 className="font-heading text-3xl font-normal text-foreground sm:text-5xl">
                  Salon Acquisitions
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Available for immediate private acquisition or private salon viewing in Paris, Geneva, and New York.
                </p>
              </div>
              <Link
                href="/collections"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline underline-offset-4"
              >
                View all salon pieces
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            {/* Uneven Gallery: Hero Piece Left + Stacked Pieces Right */}
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Lead Piece (7 cols) */}
              {products[0] && (
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <Link href={`/products/${products[0].slug}`} className="group block">
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary">
                      {products[0].images[0] && (
                        <Image
                          src={products[0].images[0].url}
                          alt={products[0].title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-103"
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {products[0].metals[0]} • {products[0].gemstones[0]} {products[0].caratWeight ? `(${products[0].caratWeight} ct)` : ""}
                      </p>
                    </div>
                    <span className="font-heading text-xl font-light text-foreground">
                      ${products[0].price.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Secondary Pieces (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-10">
                {products.slice(1, 4).map((item) => (
                  <div key={item.slug} className="flex gap-6 items-center group">
                    <Link href={`/products/${item.slug}`} className="shrink-0 w-28 h-28 relative overflow-hidden bg-secondary">
                      {item.images[0] && (
                        <Image
                          src={item.images[0].url}
                          alt={item.title}
                          fill
                          sizes="112px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-heading text-lg font-normal text-foreground truncate block hover:underline"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {item.category} • {item.metals[0]}
                      </p>
                      <span className="font-heading text-sm text-foreground mt-2 block">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Atelier Heritage & Provenance (Historical Met Museum Imagery) */}
        <section id="atelier" className="bg-secondary/30 px-6 py-24 lg:px-12 lg:py-32">
          <div className="container mx-auto">
            <div className="max-w-2xl mb-16">
              <h2 className="font-heading text-3xl font-normal text-foreground sm:text-5xl">
                Atelier Heritage &amp; Metallurgy
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Every mounting is cast and hand-burnished in solid Platinum 950 and 18-karat recycled gold. We adhere strictly to the Kimberley Process and ethical European lapidary codes.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col gap-4">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary">
                  <Image
                    src="/assets/double-ring.jpg"
                    alt="Historical Double Ring in Gold and Emerald, Marcus and Co., ca. 1895"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading text-xl font-normal text-foreground mt-2">
                  Lapidary Lineage
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our master stone-setters preserve 19th-century open-gallery and micro-pavé techniques, ensuring light refracts through every pavilion facet.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary">
                  <Image
                    src="/assets/necklace.jpg"
                    alt="Historic 18th-century gemological necklace with colorless sapphires and diamonds"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading text-xl font-normal text-foreground mt-2">
                  Unheated Color Specimens
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We specialize exclusively in untreated natural gems: Ceylon royal blue sapphires and Muzo Colombian emeralds certified with minor to zero oil.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary">
                  <Image
                    src="/assets/duchess-of-devonshire-portrait-diamond.jpg"
                    alt="Duchess of Devonshire Portrait Diamond, 19th century Met Museum"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading text-xl font-normal text-foreground mt-2">
                  Bespoke Commissions
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  From initial gouache rendering to final platinum hallmarking, private commissions are crafted alongside our master jeweler over 8 to 12 weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Global Private Salons & Appointment Booking */}
        <section className="px-6 py-24 lg:px-12 lg:py-32">
          <div className="container mx-auto">
            <div className="grid gap-12 lg:grid-cols-12 items-baseline">
              <div className="lg:col-span-6">
                <h2 className="font-heading text-3xl font-normal text-foreground sm:text-5xl">
                  Private Salon Appointments
                </h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-lg">
                  Experience our high jewelry collections in privacy. Each appointment includes one-on-one consultation with a senior gemologist and champagne salon service.
                </p>
                <div className="mt-8">
                  <Link
                    href="/consultation"
                    className="bg-foreground text-background px-6 py-3.5 text-xs font-medium inline-block transition-colors hover:bg-foreground/90"
                  >
                    Schedule Private Consultation
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-heading text-lg font-normal text-foreground">Paris Salon</h4>
                  <p className="text-xs text-muted-foreground mt-1">12 Place Vendôme, 75001 Paris</p>
                  <p className="text-xs text-muted-foreground mt-0.5">By Private Appointment Only</p>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-normal text-foreground">Geneva Salon</h4>
                  <p className="text-xs text-muted-foreground mt-1">Rue du Rhône 42, 1204 Genève</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Tuesday – Saturday</p>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-normal text-foreground">London Salon</h4>
                  <p className="text-xs text-muted-foreground mt-1">14 New Bond Street, Mayfair, London</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Monday – Friday</p>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-normal text-foreground">New York Salon</h4>
                  <p className="text-xs text-muted-foreground mt-1">680 Madison Avenue, New York, NY</p>
                  <p className="text-xs text-muted-foreground mt-0.5">By Private Appointment Only</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Haute Joaillerie Footer: Monumental & Met Credits */}
      <footer className="bg-secondary/80 px-6 py-20 lg:px-12 text-foreground">
        <div className="container mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <div>
              <span className="font-heading text-3xl font-normal tracking-widest uppercase">
                {settings.atelierName}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Haute Joaillerie &amp; Fine Lapidary Arts • Place Vendôme
              </p>
            </div>
            <div className="flex gap-8 text-xs text-muted-foreground">
              <Link href="/collections" className="hover:text-foreground transition-colors">
                Collections
              </Link>
              <Link href="/consultation" className="hover:text-foreground transition-colors">
                Bespoke Salon
              </Link>
              <Link href="/admin/login" className="hover:text-foreground transition-colors">
                Director Portal
              </Link>
            </div>
          </div>

          {/* Legal Credits for Museum Archives as required by assets.mjs */}
          <div className="text-[11px] leading-relaxed text-muted-foreground border-t border-border/40 pt-8 flex flex-col gap-2">
            <p>
              Archival museum imagery: Drawing of the Koh-I-Noor Diamond (1851, R. S. Garrard &amp; Co.), Double Ring (1895, Marcus &amp; Co.), Duchess of Devonshire Portrait Diamond (19th c.), and Necklace (18th c.) via The Metropolitan Museum of Art (CC0 Public Domain).
            </p>
            <div className="flex justify-between items-center pt-4">
              <span>© 2026 {settings.atelierName}. All rights reserved.</span>
              <span>Place Vendôme • Geneva • London • New York</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}