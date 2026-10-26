"use client";

import React, { useTransition, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useQueryState, parseAsString } from "nuqs";
import { Search, X, ArrowRight } from "lucide-react";
import { type Product, CATEGORIES, METALS } from "@/lib/schemas/product";
import { cn, formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardTilt } from "@/components/shared/motion/CardTilt";
import { FacetGlint } from "@/components/shared/motion/FacetGlint";
import {
  MaskedLineHeadline,
  MotionSection,
} from "@/components/shared/motion/MotionSection";

interface CollectionsFilterClientProps {
  initialProducts: Product[];
}

export function CollectionsFilterClient({ initialProducts }: CollectionsFilterClientProps) {
  const [category, setCategory] = useQueryState("category", parseAsString.withDefault("all"));
  const [metal, setMetal] = useQueryState("metal", parseAsString.withDefault("all"));
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault("newest"));
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [inStockOnly, setInStockOnly] = useQueryState("inStock", parseAsString.withDefault("false"));
  const [isPending, startTransition] = useTransition();

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (category !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (metal !== "all") {
      result = result.filter((p) => p.metals.includes(metal as (typeof METALS)[number]));
    }

    if (inStockOnly === "true") {
      result = result.filter((p) => p.stockStatus === "in_stock");
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.gemstones.some((g) => g.toLowerCase().includes(q))
      );
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
    }

    return result;
  }, [initialProducts, category, metal, inStockOnly, search, sort]);

  const hasActiveFilters =
    category !== "all" ||
    metal !== "all" ||
    inStockOnly === "true" ||
    Boolean(search.trim());

  const resetFilters = () => {
    startTransition(() => {
      void setCategory("all");
      void setMetal("all");
      void setInStockOnly("false");
      void setSearch("");
      void setSort("newest");
    });
  };

  return (
    <div className="space-y-16">
      {/* Editorial Page Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <MaskedLineHeadline
          lines={["The Salon Collection"]}
          tag="h1"
          className="text-4xl font-normal tracking-tight text-foreground sm:text-6xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-base leading-relaxed text-muted-foreground"
        >
          Exceptional solitary diamonds, archival cuffs, and master-crafted necklaces forged from recycled 18-karat gold and certified Platinum 950.
        </motion.p>
      </motion.header>

      {/* Filter and Search Navigation: Pure flat, architectural */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6 bg-primary text-primary-foreground p-6 sm:p-8 border border-border/30 shadow-md"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gemstones, designs, metals..."
              className="pl-10 text-xs bg-background text-foreground rounded-none border-border"
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </Button>
            )}
          </div>

          {/* Secondary Controls (Metal, Stock, Sort) - Full width on mobile */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 w-full lg:w-auto">
            <Select
              value={metal}
              onValueChange={(val) => {
                if (val) startTransition(() => { void setMetal(val); });
              }}
            >
              <SelectTrigger className="h-10 w-full sm:w-48 px-3.5 text-xs tracking-wider uppercase bg-background text-foreground rounded-none border-border">
                <SelectValue placeholder="Precious Metal" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Metallurgy</SelectItem>
                  {METALS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={sort}
              onValueChange={(val) => {
                if (val) startTransition(() => { void setSort(val); });
              }}
            >
              <SelectTrigger className="h-10 w-full sm:w-48 px-3.5 text-xs tracking-wider uppercase bg-background text-foreground rounded-none border-border">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="newest">Recent Releases</SelectItem>
                  <SelectItem value="price-asc">Acquisition: Low to High</SelectItem>
                  <SelectItem value="price-desc">Acquisition: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Toggle
              pressed={inStockOnly === "true"}
              onPressedChange={(pressed) =>
                startTransition(() => {
                  void setInStockOnly(pressed ? "true" : "false");
                })
              }
              variant="outline"
              className={cn(
                "h-10 w-full sm:w-auto px-4 text-xs tracking-wider uppercase font-normal border transition-colors justify-center cursor-pointer",
                inStockOnly === "true"
                  ? "bg-accent text-accent-foreground border-accent font-medium shadow-xs"
                  : "bg-transparent text-primary-foreground/80 border-primary-foreground/25 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              Available in Salon
            </Toggle>

            {hasActiveFilters && (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-primary-foreground/70 hover:text-primary-foreground underline underline-offset-4 self-start sm:self-auto"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter using official Shadcn ToggleGroup & Separator */}
        <div className="pt-2">
          <Separator className="my-4 bg-primary-foreground/20" />
          <ToggleGroup
            value={[category]}
            onValueChange={(vals) => {
              if (vals[0]) startTransition(() => { void setCategory(vals[0]); });
            }}
            className="flex flex-wrap gap-2 justify-start"
          >
            <ToggleGroupItem
              value="all"
              variant="outline"
              className={cn(
                "h-9 px-4 text-xs font-normal uppercase tracking-wider transition-colors cursor-pointer",
                category === "all"
                  ? "bg-accent text-accent-foreground border-accent font-medium shadow-xs"
                  : "bg-transparent text-primary-foreground/80 border-primary-foreground/25 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              All Masterpieces ({initialProducts.length})
            </ToggleGroupItem>
            {CATEGORIES.map((cat) => {
              const count = initialProducts.filter((p) => p.category === cat).length;
              const isSelected = category.toLowerCase() === cat.toLowerCase();
              return (
                <ToggleGroupItem
                  key={cat}
                  value={cat}
                  variant="outline"
                  className={cn(
                    "h-9 px-4 text-xs font-normal uppercase tracking-wider transition-colors cursor-pointer",
                    isSelected
                      ? "bg-accent text-accent-foreground border-accent font-medium shadow-xs"
                      : "bg-transparent text-primary-foreground/80 border-primary-foreground/25 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  {cat} ({count})
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      </motion.div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "salon piece" : "salon pieces"}
        </span>
        {isPending && <span>Updating salon inventory...</span>}
      </div>

      {/* Product Grid / Empty State */}
      {filteredProducts.length === 0 ? (
        <Empty className="border border-dashed border-border bg-secondary/30 p-12">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search className="size-5 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>No Archival Pieces Found</EmptyTitle>
            <EmptyDescription>
              We could not find any jewelry matching your precise criteria. Adjust your search or contact our concierge for bespoke commissions.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              type="button"
              onClick={resetFilters}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
            >
              Clear Filters
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => {
              const primaryImage =
                product.images.find((img) => img.isPrimary) || product.images[0];
              return (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min((idx % 6) * 0.04, 0.2),
                  }}
                  className="h-full"
                >
                  <CardTilt maxTilt={3.5} className="h-full">
                    <Card
                      className="group flex flex-col justify-between h-full overflow-hidden border border-border/60 bg-card py-0 hover:border-foreground/30 transition-colors"
                    >
                      <div>
                        <Link
                          href={`/products/${product.slug}`}
                          className="block relative overflow-hidden bg-secondary group/image"
                        >
                          <AspectRatio ratio={4 / 5} className="w-full">
                            {primaryImage?.url && (
                              <Image
                                src={primaryImage.url}
                                alt={primaryImage.alt || product.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                              />
                            )}
                            <FacetGlint />
                            {/* Discreet status tag */}
                            <div className="absolute top-3 left-3 z-10">
                              <Badge variant="outline" className="bg-background/95 px-3 py-1 text-xs font-medium border-border">
                                {product.stockStatus === "in_stock" ? "Available" : "Bespoke Made to Order"}
                              </Badge>
                            </div>
                            {/* Hover Inspection Badge */}
                            <div className="pointer-events-none absolute bottom-3 right-3 z-20 opacity-0 translate-y-1.5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                              <span className="inline-flex items-center gap-1 bg-background/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-foreground border border-border shadow-md">
                                <span>Inspect Specs ↗</span>
                              </span>
                            </div>
                          </AspectRatio>
                        </Link>

                        <CardHeader className="p-6 pb-2">
                          <div className="flex items-baseline justify-between gap-2">
                            <CardTitle className="font-heading text-xl font-normal text-foreground group-hover:underline">
                              <Link href={`/products/${product.slug}`}>
                                {product.title}
                              </Link>
                            </CardTitle>
                            <span className="font-heading text-base font-light text-foreground shrink-0">
                              {formatPrice(product.price, "INR")}
                            </span>
                          </div>
                          <CardDescription className="text-sm text-muted-foreground">
                            {product.metals[0]} • {product.gemstones[0]} {product.caratWeight ? `(${product.caratWeight} ct)` : ""}
                          </CardDescription>
                          <div className="flex items-center gap-2 pt-1.5 font-mono text-xs">
                            {product.pavanWeight ? (
                              <span className="text-accent font-medium">
                                {product.pavanWeight} Pavans ({product.netGoldWeightGrams}g 916 Gold)
                              </span>
                            ) : (
                              <span className="text-accent font-medium">BIS 916 Certified</span>
                            )}
                            {product.makingChargePercent && (
                              <span className="text-muted-foreground text-[11px]">
                                • VA: {product.makingChargePercent}%
                              </span>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="px-6 py-2">
                          <p className="text-base text-muted-foreground line-clamp-2 leading-relaxed">
                            {product.shortDescription}
                          </p>
                        </CardContent>
                      </div>

                      <CardFooter className="px-6 pb-6 pt-4 border-t border-border/40 mt-4">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline underline-offset-4"
                        >
                          Inspect Details &amp; Gemology
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </CardTilt>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Bespoke Commission Banner: Architectural, High Contrast Card */}
      <MotionSection>
        <div className="bg-secondary p-8 sm:p-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl space-y-2">
            <h3 className="font-heading text-2xl font-normal text-foreground sm:text-3xl">
              Commission a Custom Heirloom
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Our master gemologists source rare untreated stones and sculpt custom one-of-a-kind heirlooms tailored to your private vision.
            </p>
          </div>
          <Link
            href="/consultation"
            className="bg-primary text-primary-foreground px-6 py-3.5 text-base font-medium shrink-0 hover:bg-primary/90 transition-transform active:scale-[0.98]"
          >
            Book Bespoke Consultation
          </Link>
        </div>
      </MotionSection>
    </div>
  );
}
