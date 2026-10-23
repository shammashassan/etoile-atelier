import Link from "next/link";
import Image from "next/image";
import { Sparkles, Gem, ShieldCheck, ArrowRight, Compass, Settings } from "lucide-react";
import { getFeaturedProducts } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextReveal } from "@/components/shared/motion/TextReveal";
import { CardTilt } from "@/components/shared/motion/CardTilt";

export default async function Home() {
  const [products, settings] = await Promise.all([
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Editorial Announcement Bar */}
      <div className="border-b border-border bg-muted/40 py-2.5 text-center text-xs tracking-widest uppercase text-muted-foreground px-4">
        {settings.announcementBar}
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-widest text-muted-foreground md:flex">
            <Link href="#collections" className="transition-colors hover:text-foreground">
              Collections
            </Link>
            <Link href="#craft" className="transition-colors hover:text-foreground">
              Atelier
            </Link>
            <Link href="/admin" className="transition-colors hover:text-foreground flex items-center gap-1.5 text-primary font-semibold">
              <Settings className="size-3.5" />
              Atelier CMS
            </Link>
          </nav>

          <Link href="/" className="flex flex-col items-center">
            <span className="font-heading text-2xl font-normal tracking-widest uppercase text-foreground">
              {settings.atelierName}
            </span>
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              {settings.tagline}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:inline-flex">
              <Link href="/admin/login">
                <Button variant="ghost" size="sm">
                  Director Portal
                </Button>
              </Link>
            </div>
            <Link href="#collections">
              <Button size="sm">
                <Sparkles data-icon="inline-start" />
                View Collection
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Silk-Eased Text Reveal */}
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border py-28 sm:py-36">
          <div className="container mx-auto px-6 text-center lg:px-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              <Gem className="size-3.5" />
              Haute Joaillerie Atelier
            </div>

            <h1 className="mx-auto max-w-4xl font-heading text-4xl font-light tracking-wide text-foreground sm:text-6xl md:text-7xl">
              <TextReveal delay={0.1}>
                Timeless Radiance, Sculpted by Hand.
              </TextReveal>
            </h1>

            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Each piece is an enduring statement of rare gemstones, sustainable metallurgy,
              and master artisanal craftsmanship from our European workshops.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="#collections">
                <Button size="lg">
                  Explore Masterpieces
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" size="lg">
                  Access Atelier CMS
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid / Live Collections with 3D Tilt */}
        <section id="collections" className="py-20 sm:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Current Salon Selection
              </span>
              <h2 className="mt-2 font-heading text-3xl font-light tracking-wider sm:text-4xl">
                Curated High Jewelry Pieces
              </h2>
              <p className="text-xs text-muted-foreground mt-2">
                Live database inventory • Click any piece for full gemological specs
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {products.map((item) => {
                const primaryImage = item.images.find((img) => img.isPrimary) || item.images[0];
                return (
                  <CardTilt key={item.slug} maxTilt={6} perspective={1000}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                            {item.collection} • {item.category}
                          </span>
                          <Badge variant={item.stockStatus === "in_stock" ? "default" : "secondary"}>
                            {item.stockStatus.replace("_", " ")}
                          </Badge>
                        </div>
                        <CardTitle>
                          {item.title}
                        </CardTitle>
                        <CardDescription>
                          {item.shortDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative aspect-4/3 w-full overflow-hidden border-y border-border/60 bg-muted/20 my-2">
                          {primaryImage?.url && (
                            <Image
                              src={primaryImage.url}
                              alt={primaryImage.alt || item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="pt-3 flex items-baseline justify-between text-xs">
                          <span className="text-muted-foreground">
                            {item.metals[0]} {item.caratWeight ? `• ${item.caratWeight}ct` : ""}
                          </span>
                          <span className="font-heading text-base font-medium text-foreground">
                            ${item.price.toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="w-full">
                          <Link href={`/products/${item.slug}`} className="block w-full">
                            <Button variant="outline" size="sm" className="w-full">
                              Inspect Piece & Details
                            </Button>
                          </Link>
                        </div>
                      </CardFooter>
                    </Card>
                  </CardTilt>
                );
              })}
            </div>
          </div>
        </section>

        <Separator />

        {/* Craft & Provenance Section */}
        <section id="craft" className="py-20 bg-muted/20 sm:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col gap-4 text-center items-center lg:items-start lg:text-left">
                <div className="flex size-10 items-center justify-center border border-border bg-background">
                  <ShieldCheck className="size-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-light tracking-wider">
                  Ethical Provenance
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Every diamond is Kimberley Process certified and mined under audited fair-trade labor standards.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-center items-center lg:items-start lg:text-left">
                <div className="flex size-10 items-center justify-center border border-border bg-background">
                  <Compass className="size-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-light tracking-wider">
                  Artisanal Precision
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Hand-crafted micro-pavé settings assembled under microscopic magnification by master jewelers.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-center items-center lg:items-start lg:text-left">
                <div className="flex size-10 items-center justify-center border border-border bg-background">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-light tracking-wider">
                  Lifetime Atelier Care
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Complimentary annual ultrasonic cleaning, inspection, and rhodium replating for life.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Luxury Footer with Global Locations */}
      <footer className="border-t border-border bg-background py-16 text-center text-xs tracking-wider uppercase text-muted-foreground">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <span className="font-heading text-lg tracking-widest text-foreground">
            {settings.atelierName}
          </span>
          <p className="max-w-md text-xs leading-relaxed lowercase text-muted-foreground">
            {settings.locations.join(" • ")}
          </p>
          <div className="text-xs text-muted-foreground/60">
            © 2026 {settings.atelierName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
