"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQueryState, parseAsString } from "nuqs";
import { Search, Plus, Trash2, Star, Eye, Pencil } from "lucide-react";
import { type Product, CATEGORIES, STOCK_STATUSES } from "@/lib/schemas/product";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

interface ProductsTableClientProps {
  initialProducts: Product[];
}

export function ProductsTableClient({ initialProducts }: ProductsTableClientProps) {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [category, setCategory] = useQueryState("category", parseAsString.withDefault("all"));
  const [stockStatus, setStockStatus] = useQueryState("status", parseAsString.withDefault("all"));
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
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

  const handleConfirmDelete = () => {
    if (!deletingProductId) return;
    const id = deletingProductId;
    setDeletingProductId(null);
    startTransition(async () => {
      await deleteProductAction(id);
    });
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
        <Button render={<Link href="/admin/products/new" />} size="sm">
          <Plus data-icon="inline-start" />
          Add New Piece
        </Button>
      </div>

      {/* Filter Bar (powered by Nuqs & Shadcn Select) */}
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
          <Select
            value={category}
            onValueChange={(val) => {
              if (val) void setCategory(val);
            }}
          >
            <SelectTrigger className="h-9 w-40 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={stockStatus}
            onValueChange={(val) => {
              if (val) void setStockStatus(val);
            }}
          >
            <SelectTrigger className="h-9 w-40 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                {STOCK_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Preview</TableHead>
              <TableHead>Piece &amp; SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Metals &amp; Gemstones</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="p-8">
                  <Empty className="p-4 border-none">
                    <EmptyHeader>
                      <EmptyTitle className="text-sm font-semibold">No Pieces Found</EmptyTitle>
                      <EmptyDescription className="text-xs">
                        No jewelry matching your search or filter parameters.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
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
                        <Button
                          render={<Link href={`/admin/products/${product._id || product.slug}`} />}
                          variant="ghost"
                          size="icon-xs"
                          title="Edit Masterpiece"
                        >
                          <Pencil className="size-3.5 text-muted-foreground" />
                        </Button>
                        <Button
                          render={<Link href={`/products/${product.slug}`} target="_blank" />}
                          variant="ghost"
                          size="icon-xs"
                          title="View Public Page"
                        >
                          <Eye className="size-3.5 text-muted-foreground" />
                        </Button>
                        {product._id && (
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => setDeletingProductId(product._id || null)}
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

      {/* Official Shadcn Alert Dialog for Delete Confirmation */}
      <AlertDialog
        open={Boolean(deletingProductId)}
        onOpenChange={(open) => {
          if (!open) setDeletingProductId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>De-catalog Masterpiece</AlertDialogTitle>
            <AlertDialogDescription>
              Are you certain you wish to remove this jewelry piece from the atelier catalog? This action will immediately archive its public listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Confirm Deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
