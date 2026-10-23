import Link from "next/link";
import { Sparkles, Gem, ShieldCheck, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const collections = [
  {
    name: "Fine Solitaires",
    category: "Rings",
    description: "Hand-selected brilliant cuts set in 18k solid gold and platinum.",
    tag: "High Jewelry",
  },
  {
    name: "Lumina Pendants",
    category: "Necklaces",
    description: "Delicate chains accented with ethically sourced natural diamonds.",
    tag: "Signature",
  },
  {
    name: "Aura Cuffs",
    category: "Bracelets",
    description: "Architectural silhouettes sculpted with pavé diamond detailing.",
    tag: "Editorial",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Editorial Announcement Bar */}
      <div className="border-b border-border bg-muted/40 py-2.5 text-center text-xs tracking-widest uppercase text-muted-foreground">
        Complimentary insured global shipping & private atelier consultation
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
            <Link href="#bespoke" className="transition-colors hover:text-foreground">
              Bespoke
            </Link>
          </nav>

          <div className="flex flex-col items-center">
            <span className="font-heading text-2xl font-normal tracking-[0.25em] uppercase text-foreground">
              Étoile
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Fine Jewelry
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button size="sm">
              <Sparkles data-icon="inline-start" />
              Book Viewing
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border py-24 sm:py-32">
          <div className="container mx-auto px-6 text-center lg:px-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Gem className="size-3.5" />
              Autumn / Winter Atelier
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-light tracking-wide text-foreground sm:text-6xl md:text-7xl">
              Timeless Radiance, <br />
              Sculpted by Hand.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Each piece is an enduring statement of rare gemstones, sustainable metallurgy,
              and master artisanal craftsmanship.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg">
                Explore Collections
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button variant="outline" size="lg">
                Bespoke Commissions
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Grid / Collections */}
        <section id="collections" className="py-20 sm:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Curated Editions
              </span>
              <h2 className="mt-2 font-heading text-3xl font-light tracking-wider sm:text-4xl">
                Featured Collections
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {collections.map((item) => (
                <Card key={item.name} className="flex flex-col justify-between border-border bg-card">
                  <CardHeader>
                    <div className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                      {item.tag} • {item.category}
                    </div>
                    <CardTitle className="font-heading text-2xl font-light tracking-wide mt-2">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground mt-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-40 flex items-center justify-center border-y border-border/60 bg-muted/20 my-4">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground/70 font-mono">
                      [ High-Res Gallery Preview ]
                    </span>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Collection
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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

      {/* Footer */}
      <footer className="border-t border-border bg-background py-16 text-center text-xs tracking-wider uppercase text-muted-foreground">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <span className="font-heading text-lg tracking-[0.2em] text-foreground">
            Étoile Atelier
          </span>
          <p className="max-w-md text-xs leading-relaxed lowercase text-muted-foreground">
            paris • london • new york • geneva
          </p>
          <div className="text-[11px] text-muted-foreground/60">
            © 2026 Étoile Atelier. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
