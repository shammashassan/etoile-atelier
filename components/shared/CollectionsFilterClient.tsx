"use client";

import React, { useTransition, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQueryState, parseAsString } from "nuqs";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowRight,
  Gem,
  Check,
} from "lucide-react";
import { type Product, CATEGORIES, METALS } from "@/lib/schemas/product";
import { CardTilt } from "@/components/shared/motion/CardTilt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
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
      // newest
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
    <div className="space-y-12">
      {/* Editorial Page Header */}
      <header className="border-b border-border pb-10 pt-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Gem className="size-3.5" />
              Archives of Haute Joaillerie
            </div>
            <h1 className="font-heading text-4xl font-light tracking-wide text-foreground sm:text-5xl">
              The Atelier Collection
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Explore our curation of exceptional solitary gems, archival diamond cuffs, and master-crafted necklaces forged from recycled 18k gold and certified platinum.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/consultation">
              <Button variant="outline" size="sm">
                <Sparkles data-icon="inline-start" />
                Commission Bespoke
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Filter and Search Bar */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by gemstone, design, or collection..."
              className="pl-10 text-xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Secondary Controls (Metal, Stock, Sort) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Metal Select */}
            <Select
              value={metal}
              onValueChange={(val) => startTransition(() => { void setMetal(val); })}
            >
              <SelectTrigger className="w-44 text-xs">
                <SelectValue placeholder="Precious Metal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Metals</SelectItem>
                {METALS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select
              value={sort}
              onValueChange={(val) => startTransition(() => { void setSort(val); })}
            >
              <SelectTrigger className="w-44 text-xs">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Releases</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* In-Stock Filter Pill */}
            <Button
              type="button"
              variant={inStockOnly === "true" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                startTransition(() => {
                  void setInStockOnly(inStockOnly === "true" ? "false" : "true");
                })
              }
              className="text-xs"
            >
              {inStockOnly === "true" && <Check data-icon="inline-start" />}
              Available Now
            </Button>

            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-muted-foreground"
              >
                Reset All
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Button
            type="button"
            variant={category === "all" ? "default" : "secondary"}
            size="sm"
            onClick={() => startTransition(() => { void setCategory("all"); })}
            className="rounded-full text-xs"
          >
            All Categories ({initialProducts.length})
          </Button>
          {CATEGORIES.map((cat) => {
            const count = initialProducts.filter((p) => p.category === cat).length;
            const isSelected = category.toLowerCase() === cat.toLowerCase();
            return (
              <Button
                key={cat}
                type="button"
                variant={isSelected ? "default" : "secondary"}
                size="sm"
                onClick={() => startTransition(() => { void setCategory(cat); })}
                className="rounded-full text-xs"
              >
                {cat} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-border pb-4 text-xs text-muted-foreground">
        <span>
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "specimen" : "specimens"}
        </span>
        {isPending && <span className="animate-pulse">Refreshing archival index...</span>}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex min-h-85 flex-col items-center justify-center border border-dashed border-border p-12 text-center">
          <SlidersHorizontal className="size-8 text-muted-foreground mb-4" />
          <h3 className="font-heading text-xl font-light text-foreground mb-2">
            No Archival Pieces Found
          </h3>
          <p className="max-w-md text-xs text-muted-foreground mb-6">
            We could not find any jewelry matching your precise criteria. Adjust your filters or explore our bespoke commission services.
          </p>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Clear Search Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const primaryImage =
              product.images.find((img) => img.isPrimary) || product.images[0];
            return (
              <CardTilt key={product.slug} maxTilt={6}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-colors hover:border-foreground/30"
                >
                  {/* High-res Imagery Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/40">
                    {primaryImage?.url && (
                      <Image
                        src={primaryImage.url}
                        alt={primaryImage.alt || product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="backdrop-blur-md">
                        {product.category}
                      </Badge>
                      {product.stockStatus === "made_to_order" && (
                        <Badge variant="outline" className="backdrop-blur-md">
                          Made to Order
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Editorial Details */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {product.collection}
                      </div>
                      <h3 className="font-heading text-lg font-light text-foreground group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <span className="text-xs text-muted-foreground block">
                          Acquisition
                        </span>
                        <span className="font-heading text-base font-normal text-foreground">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-medium text-foreground transition-transform group-hover:translate-x-1">
                        View Piece
                        <ArrowRight className="size-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CardTilt>
            );
          })}
        </div>
      )}

      {/* Bespoke Commission Banner */}
      <section className="relative overflow-hidden border border-border bg-card p-8 sm:p-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Haute Joaillerie Atelier
            </span>
            <h2 className="font-heading text-2xl font-light text-foreground sm:text-3xl">
              Can’t find the exact carat, cut, or setting?
            </h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Our master gemologists source rare untreated stones and sculpt custom one-of-a-kind heirlooms tailored to your private vision.
            </p>
          </div>
          <Link href="/consultation">
            <Button size="lg">
              Book Private Consultation
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
