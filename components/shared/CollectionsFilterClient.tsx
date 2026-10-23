"use client";

import React, { useTransition, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQueryState, parseAsString } from "nuqs";
import { Search, X, ArrowRight } from "lucide-react";
import { type Product, CATEGORIES, METALS } from "@/lib/schemas/product";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <header className="max-w-3xl">
        <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-6xl">
          The Salon Collection
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Exceptional solitary diamonds, archival cuffs, and master-crafted necklaces forged from recycled 18-karat gold and certified Platinum 950.
        </p>
      </header>

      {/* Filter and Search Navigation: Pure flat, architectural */}
      <div className="space-y-6 bg-secondary/50 p-6 sm:p-8 border border-border/50">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gemstones, designs, metals..."
              className="pl-10 text-xs bg-background rounded-none border-border"
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

          {/* Secondary Controls (Metal, Stock, Sort) */}
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={metal}
              onValueChange={(val) => {
                if (val) startTransition(() => { void setMetal(val); });
              }}
            >
              <SelectTrigger className="w-44 text-xs uppercase tracking-wider bg-background rounded-none border-border">
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
              <SelectTrigger className="w-44 text-xs uppercase tracking-wider bg-background rounded-none border-border">
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
                "h-10 px-4 text-xs font-semibold tracking-wider uppercase border border-border transition-colors",
                inStockOnly === "true"
                  ? "bg-foreground text-background border-foreground hover:bg-foreground/90 hover:text-background"
                  : "bg-background text-foreground hover:bg-muted"
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
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs using official Shadcn Tabs */}
        <div className="border-t border-border/50 pt-4">
          <Tabs
            value={category}
            onValueChange={(val) => {
              if (val) startTransition(() => { void setCategory(val); });
            }}
          >
            <TabsList variant="line" className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className={cn(
                  "px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors shrink-0",
                  category === "all"
                    ? "bg-foreground text-background font-medium hover:text-background"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                All Masterpieces ({initialProducts.length})
              </TabsTrigger>
              {CATEGORIES.map((cat) => {
                const count = initialProducts.filter((p) => p.category === cat).length;
                const isSelected = category.toLowerCase() === cat.toLowerCase();
                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className={cn(
                      "px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors shrink-0",
                      isSelected
                        ? "bg-foreground text-background font-medium hover:text-background"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat} ({count})
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs tracking-wider uppercase text-muted-foreground">
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
              className="bg-foreground text-background hover:bg-foreground/90 uppercase tracking-wider text-xs font-semibold"
            >
              Clear Filters
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const primaryImage =
              product.images.find((img) => img.isPrimary) || product.images[0];
            return (
              <div key={product.slug} className="group flex flex-col gap-4">
                <Link
                  href={`/products/${product.slug}`}
                  className="block relative overflow-hidden bg-secondary"
                >
                  <AspectRatio ratio={4 / 5} className="w-full">
                    {primaryImage?.url && (
                      <Image
                        src={primaryImage.url}
                        alt={primaryImage.alt || product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                      />
                    )}
                    {/* Discreet status tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant="outline" className="bg-background/95 px-3 py-1 text-xs font-medium uppercase tracking-wider border-border">
                        {product.stockStatus === "in_stock" ? "Available" : "Bespoke Made to Order"}
                      </Badge>
                    </div>
                  </AspectRatio>
                </Link>

                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-heading text-xl font-normal text-foreground group-hover:underline"
                    >
                      {product.title}
                    </Link>
                    <span className="font-heading text-base font-light text-foreground shrink-0">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {product.metals[0]} • {product.gemstones[0]} {product.caratWeight ? `(${product.caratWeight} ct)` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                  <div className="mt-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-foreground hover:underline underline-offset-4"
                    >
                      Inspect Details &amp; Gemology
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bespoke Commission Banner: Architectural, High Contrast */}
      <section className="bg-secondary/40 p-8 sm:p-12 border border-border/50">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl space-y-2">
            <h2 className="font-heading text-2xl font-normal text-foreground sm:text-3xl">
              Commission a Custom Heirloom
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Our master gemologists source rare untreated stones and sculpt custom one-of-a-kind heirlooms tailored to your private vision.
            </p>
          </div>
          <Button
            render={<Link href="/consultation" />}
            nativeButton={false}
            size="lg"
            className="bg-foreground text-background shrink-0 hover:bg-foreground/90 uppercase tracking-wider text-xs font-semibold"
          >
            Book Bespoke Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}
