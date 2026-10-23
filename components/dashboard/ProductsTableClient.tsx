"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQueryState, parseAsString } from "nuqs";
import { Search, Plus, Trash2, Star, Eye } from "lucide-react";
import { type Product } from "@/lib/schemas/product";
import { deleteProductAction, toggleFeaturedAction } from "@/lib/actions/product-actions";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductsTableClientProps {
  initialProducts: Product[];
}

export function ProductsTableClient({ initialProducts }: ProductsTableClientProps) {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [category, setCategory] = useQueryState("category", parseAsString.withDefault("all"));
  const [stockStatus, setStockStatus] = useQueryState("status", parseAsString.withDefault("all"));
  const [isPending, startTransition] = useTransition();

  // Client-side filtering on live query state
  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch =
      !search ||
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category.toLowerCase() === category.toLowerCase();

    const matchesStock =
      stockStatus === "all" || product.stockStatus === stockStatus;

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleToggleFeatured = (id?: string, currentFeatured?: boolean) => {
    if (!id) return;
    startTransition(async () => {
      await toggleFeaturedAction(id, !currentFeatured);
    });
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to remove this piece from the catalog?")) {
      startTransition(async () => {
        await deleteProductAction(id);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & New CTA */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-light tracking-wide text-foreground">
            Jewelry Collection
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            Manage your fine jewelry catalog, diamonds, metallurgy, and availability
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button size="sm">
            <Plus data-icon="inline-start" />
            Add New Piece
          </Button>
        </Link>
      </div>

      {/* Filter Bar (powered by Nuqs) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or SKU..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground outline-none focus:border-ring"
          >
            <option value="all">All Categories</option>
            <option value="rings">Rings</option>
            <option value="necklaces">Necklaces</option>
            <option value="bracelets">Bracelets</option>
            <option value="earrings">Earrings</option>
            <option value="high jewelry">High Jewelry</option>
          </select>

          <select
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
            className="h-9 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground outline-none focus:border-ring"
          >
            <option value="all">All Statuses</option>
            <option value="in_stock">In Stock</option>
            <option value="made_to_order">Made to Order</option>
            <option value="sold_out">Sold Out</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Preview</TableHead>
              <TableHead>Piece & SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Metals & Gemstones</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-xs text-muted-foreground uppercase tracking-wider">
                  No jewelry matching your filter parameters.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => {
                const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
                return (
                  <TableRow key={product.slug} className={isPending ? "opacity-60" : ""}>
                    <TableCell>
                      <div className="relative size-12 overflow-hidden border border-border bg-muted/40">
                        {primaryImage?.url && (
                          <Image
                            src={primaryImage.url}
                            alt={primaryImage.alt || product.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        <span className="font-heading text-sm font-light text-foreground block">
                          {product.title}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {product.sku}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground space-y-0.5">
                        <div>{product.metals.join(", ")}</div>
                        <div className="text-xs text-muted-foreground/80 italic">
                          {product.gemstones.join(", ")} {product.caratWeight ? `(${product.caratWeight}ct)` : ""}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-semibold text-foreground">
                        ${product.price.toLocaleString()}
                        {product.compareAtPrice && (
                          <span className="ml-1.5 text-xs text-muted-foreground line-through font-normal">
                            ${product.compareAtPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.stockStatus === "in_stock" ? "default" : "secondary"}>
                        {product.stockStatus.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleToggleFeatured(product._id, product.featured)}
                          title={product.featured ? "Remove from Featured" : "Mark as Featured"}
                        >
                          <Star className={`size-3.5 ${product.featured ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                        </Button>
                        <Link href={`/products/${product.slug}`} target="_blank">
                          <Button variant="ghost" size="icon-xs" title="View Public Page">
                            <Eye className="size-3.5 text-muted-foreground" />
                          </Button>
                        </Link>
                        {product._id && (
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleDelete(product._id)}
                            title="Delete piece"
                          >
                            <Trash2 className="size-3.5 text-destructive/80 hover:text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
