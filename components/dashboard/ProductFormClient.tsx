"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import {
  ProductSchema,
  type Product,
  METALS,
  GEMSTONES,
  CATEGORIES,
  STOCK_STATUSES,
} from "@/lib/schemas/product";
import { createProductAction, updateProductAction } from "@/lib/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProductFormClientProps {
  initialProduct?: Product;
}

export function ProductFormClient({ initialProduct }: ProductFormClientProps = {}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const isEditing = Boolean(initialProduct?._id);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialProduct || {
      title: "",
      slug: "",
      sku: "ETO-",
      category: "Rings",
      collection: "Solitaires",
      price: 5000,
      compareAtPrice: null,
      shortDescription: "",
      description: "",
      metals: ["Platinum 950"],
      gemstones: ["Natural Diamond"],
      caratWeight: 1.5,
      clarity: "VVS1",
      cutGrade: "Excellent",
      stockStatus: "in_stock",
      stockQuantity: 1,
      featured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
          alt: "Solitaire diamond ring",
          isPrimary: true,
        },
      ],
    },
  });

  const imagesValue = watch("images");
  const selectedMetals = watch("metals") || [];
  const selectedGemstones = watch("gemstones") || [];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setValue("images.0.url", data.url);
        if (!watch("images.0.alt")) {
          setValue("images.0.alt", `${watch("title") || "Jewelry piece"} photograph`);
        }
      } else {
        setServerError(data.error || "Image upload failed");
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Image upload network error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Auto-slug generator from title if slug is empty or matching
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue("title", val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setValue("slug", generatedSlug);
  };

  const toggleMetal = (metal: (typeof METALS)[number]) => {
    const current = [...selectedMetals];
    const idx = current.indexOf(metal);
    if (idx >= 0) {
      if (current.length > 1) {
        current.splice(idx, 1);
        setValue("metals", current as [typeof METALS[number], ...typeof METALS[number][]]);
      }
    } else {
      current.push(metal);
      setValue("metals", current as [typeof METALS[number], ...typeof METALS[number][]]);
    }
  };

  const toggleGemstone = (gem: (typeof GEMSTONES)[number]) => {
    const current = [...selectedGemstones];
    const idx = current.indexOf(gem);
    if (idx >= 0) {
      if (current.length > 1) {
        current.splice(idx, 1);
        setValue("gemstones", current as [typeof GEMSTONES[number], ...typeof GEMSTONES[number][]]);
      }
    } else {
      current.push(gem);
      setValue("gemstones", current as [typeof GEMSTONES[number], ...typeof GEMSTONES[number][]]);
    }
  };

  const onSubmit = async (data: Product) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = isEditing && initialProduct?._id
        ? await updateProductAction(initialProduct._id, data)
        : await createProductAction(data);

      if (res.success) {
        router.push("/admin/products");
      } else {
        setServerError(res.error);
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button type="button" variant="ghost" size="icon-sm">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-light tracking-wide text-foreground">
              {isEditing ? `Edit: ${initialProduct?.title || "Masterpiece"}` : "Catalog New Atelier Piece"}
            </h1>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {isEditing
                ? "Update craftsmanship specifications, pricing, and availability"
                : "Define craftsmanship specs, metallurgy, and high-resolution assets"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button type="button" variant="outline" size="sm">
              Cancel
            </Button>
          </Link>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            <Save data-icon="inline-start" />
            {isSubmitting
              ? "Preserving..."
              : isEditing
              ? "Update Masterpiece"
              : "Save to Catalog"}
          </Button>
        </div>
      </div>

      {serverError && (
        <div className="border border-destructive/50 bg-destructive/10 p-4 text-xs text-destructive">
          {serverError}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Section 1: Basic Nomenclature */}
          <Card>
            <CardHeader>
              <CardTitle>Piece Nomenclature & Narrative</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Piece Title *
                </label>
                <Input
                  {...register("title")}
                  onChange={handleTitleChange}
                  placeholder="e.g. The Solitaire Lumina Diamond Ring"
                />
                {errors.title && (
                  <p className="text-xs text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                    URL Slug *
                  </label>
                  <Input {...register("slug")} placeholder="solitaire-lumina-diamond-ring" />
                  {errors.slug && (
                    <p className="text-xs text-destructive mt-1">{errors.slug.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Atelier SKU *
                  </label>
                  <Input {...register("sku")} placeholder="ETO-RNG-001" />
                  {errors.sku && (
                    <p className="text-xs text-destructive mt-1">{errors.sku.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Short Summary (for Catalog Cards) *
                </label>
                <Input
                  {...register("shortDescription")}
                  placeholder="2.15ct Round Brilliant Diamond in sculpted Platinum 950."
                />
                {errors.shortDescription && (
                  <p className="text-xs text-destructive mt-1">{errors.shortDescription.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Editorial Craft Storytelling *
                </label>
                <Textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Describe the gemstone provenance, setting technique, and artisanal finish..."
                />
                {errors.description && (
                  <p className="text-xs text-destructive mt-1">{errors.description.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Metallurgy & Gemstones */}
          <Card>
            <CardHeader>
              <CardTitle>Artisanal Metallurgy & Gemstones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2">
                  Available Precious Metals
                </label>
                <div className="flex flex-wrap gap-2">
                  {METALS.map((metal) => {
                    const active = selectedMetals.includes(metal);
                    return (
                      <button
                        key={metal}
                        type="button"
                        onClick={() => toggleMetal(metal)}
                        className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground font-semibold"
                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {metal}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2">
                  Featured Gemstones
                </label>
                <div className="flex flex-wrap gap-2">
                  {GEMSTONES.map((gem) => {
                    const active = selectedGemstones.includes(gem);
                    return (
                      <button
                        key={gem}
                        type="button"
                        onClick={() => toggleGemstone(gem)}
                        className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground font-semibold"
                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {gem}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Carat Weight
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("caratWeight", { valueAsNumber: true })}
                    placeholder="2.15"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Clarity Grade
                  </label>
                  <Input {...register("clarity")} placeholder="VVS1 / Flawless" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Cut Grade
                  </label>
                  <Input {...register("cutGrade")} placeholder="Excellent" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Imagery */}
          <Card>
            <CardHeader>
              <CardTitle>High-Resolution Imagery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Local File Upload Button */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-dashed border-border p-4 bg-muted/10">
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-foreground block">
                    Upload Photograph from Device
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    Saved directly to production asset storage (JPEG, PNG, WEBP up to 10MB)
                  </span>
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud data-icon="inline-start" />
                    {isUploading ? "Uploading File..." : "Choose Image File"}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Primary Image URL or Asset Path *
                </label>
                <Input
                  {...register("images.0.url")}
                  placeholder="https://images.unsplash.com/... or /uploads/..."
                />
                {errors.images?.[0]?.url && (
                  <p className="text-xs text-destructive mt-1">{errors.images[0].url.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Image Alt Text *
                </label>
                <Input
                  {...register("images.0.alt")}
                  placeholder="Studio close-up of solitaire ring"
                />
              </div>

              {/* Thumbnail Preview */}
              {imagesValue?.[0]?.url && (
                <div className="mt-4 flex items-center gap-4 border border-border p-3 bg-muted/20">
                  <div className="relative size-20 overflow-hidden border border-border bg-background">
                    <Image
                      src={imagesValue[0].url}
                      alt={imagesValue[0].alt || "Preview"}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-foreground block">
                      Primary Asset Preview
                    </span>
                    <span className="text-xs text-muted-foreground block truncate max-w-sm font-mono">
                      {imagesValue[0].url}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Valuation, Category, & Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Valuation & Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Retail Price ($ USD) *
                </label>
                <Input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="18500"
                />
                {errors.price && (
                  <p className="text-xs text-destructive mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Compare At Price ($ USD)
                </label>
                <Input
                  type="number"
                  {...register("compareAtPrice", { valueAsNumber: true })}
                  placeholder="Optional anchor value"
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Category *
                </label>
                <select
                  {...register("category")}
                  className="w-full h-9 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground outline-none focus:border-ring"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Collection *
                </label>
                <Input {...register("collection")} placeholder="e.g. Solitaires" />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Availability Status *
                </label>
                <select
                  {...register("stockStatus")}
                  className="w-full h-9 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground outline-none focus:border-ring"
                >
                  {STOCK_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Physical Inventory Count
                </label>
                <Input
                  type="number"
                  {...register("stockQuantity", { valueAsNumber: true })}
                  placeholder="1"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-foreground block">
                    Featured on Storefront
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    Display prominently on the homepage atelier carousel
                  </span>
                </div>
                <input
                  type="checkbox"
                  {...register("featured")}
                  className="size-4 accent-primary"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
