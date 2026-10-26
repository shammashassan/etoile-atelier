"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ArrowLeft, Save, UploadCloud, ShieldAlert, Trash2, Upload, Loader2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    resolver: zodResolver(ProductSchema) as any,
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
          url: "/images/products/solitaire-lumina-diamond-ring.jpg",
          alt: "Solitaire diamond ring",
          isPrimary: true,
        },
      ],
    },
  });

  const imagesValue = watch("images");
  const selectedMetals = watch("metals") || [];
  const selectedGemstones = watch("gemstones") || [];
  const selectedCategory = watch("category");
  const selectedStockStatus = watch("stockStatus");
  const isFeatured = watch("featured");

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
        <Alert variant="destructive">
          <ShieldAlert className="size-4" />
          <AlertTitle>Catalog Update Failed</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
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
              <Field>
                <FieldLabel htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Piece Title *
                </FieldLabel>
                <Input
                  id="title"
                  {...register("title")}
                  onChange={handleTitleChange}
                  placeholder="e.g. The Solitaire Lumina Diamond Ring"
                />
                {errors.title && (
                  <FieldError>{errors.title.message}</FieldError>
                )}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="slug" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    URL Slug *
                  </FieldLabel>
                  <Input id="slug" {...register("slug")} placeholder="solitaire-lumina-diamond-ring" />
                  {errors.slug && (
                    <FieldError>{errors.slug.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="sku" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Atelier SKU *
                  </FieldLabel>
                  <Input id="sku" {...register("sku")} placeholder="ETO-RNG-001" />
                  {errors.sku && (
                    <FieldError>{errors.sku.message}</FieldError>
                  )}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="shortDescription" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Short Summary (for Catalog Cards) *
                </FieldLabel>
                <Input
                  id="shortDescription"
                  {...register("shortDescription")}
                  placeholder="2.15ct Round Brilliant Diamond in sculpted Platinum 950."
                />
                {errors.shortDescription && (
                  <FieldError>{errors.shortDescription.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Editorial Craft Storytelling *
                </FieldLabel>
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={4}
                  placeholder="Describe the gemstone provenance, setting technique, and artisanal finish..."
                />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>
            </CardContent>
          </Card>

          {/* Section 2: Metallurgy & Gemstones */}
          <Card>
            <CardHeader>
              <CardTitle>Artisanal Metallurgy & Gemstones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field>
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Available Precious Metals
                </FieldLabel>
                <ToggleGroup
                  multiple
                  value={selectedMetals}
                  onValueChange={(vals) => {
                    if (vals.length > 0) {
                      setValue("metals", vals as [typeof METALS[number], ...typeof METALS[number][]]);
                    }
                  }}
                  className="flex flex-wrap gap-2 w-full"
                >
                  {METALS.map((metal) => {
                    const active = selectedMetals.includes(metal);
                    return (
                      <ToggleGroupItem
                        key={metal}
                        value={metal}
                        variant="outline"
                        className={cn(
                          "h-auto px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-colors",
                          active
                            ? "border-primary bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {metal}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>

              <Field>
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Featured Gemstones
                </FieldLabel>
                <ToggleGroup
                  multiple
                  value={selectedGemstones}
                  onValueChange={(vals) => {
                    if (vals.length > 0) {
                      setValue("gemstones", vals as [typeof GEMSTONES[number], ...typeof GEMSTONES[number][]]);
                    }
                  }}
                  className="flex flex-wrap gap-2 w-full"
                >
                  {GEMSTONES.map((gem) => {
                    const active = selectedGemstones.includes(gem);
                    return (
                      <ToggleGroupItem
                        key={gem}
                        value={gem}
                        variant="outline"
                        className={cn(
                          "h-auto px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-colors",
                          active
                            ? "border-primary bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {gem}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field>
                  <FieldLabel htmlFor="caratWeight" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Carat Weight
                  </FieldLabel>
                  <Input
                    id="caratWeight"
                    type="number"
                    step="0.01"
                    {...register("caratWeight", { valueAsNumber: true })}
                    placeholder="2.15"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="clarity" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Clarity Grade
                  </FieldLabel>
                  <Input id="clarity" {...register("clarity")} placeholder="VVS1 / Flawless" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cutGrade" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Cut Grade
                  </FieldLabel>
                  <Input id="cutGrade" {...register("cutGrade")} placeholder="Excellent" />
                </Field>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Imagery */}
          <Card>
            <CardHeader>
              <CardTitle>High-Resolution Imagery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <input type="hidden" {...register("images.0.url")} />
              {errors.images?.[0]?.url && (
                <FieldError>{errors.images[0].url.message}</FieldError>
              )}

              {/* Case 1: Image exists - show preview with Change/Remove actions, hide upload dropzone */}
              {imagesValue?.[0]?.url ? (
                <div className="border border-border p-4 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Primary Catalog Photograph
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs h-7 px-2.5 cursor-pointer"
                      >
                        <Upload className="size-3 mr-1" />
                        {isUploading ? "Uploading..." : "Change Photo"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={isUploading}
                        onClick={() => {
                          setValue("images.0.url", "", { shouldDirty: true, shouldValidate: true });
                        }}
                        className="text-xs h-7 px-2.5 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        <Trash2 className="size-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative size-24 shrink-0 overflow-hidden border border-border bg-background">
                      <Image
                        src={imagesValue[0].url}
                        alt={imagesValue[0].alt || "Preview"}
                        fill
                        sizes="96px"
                        className="object-cover"
                        unoptimized
                      />
                      {isUploading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <Loader2 className="size-5 animate-spin text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-xs font-medium text-foreground block">
                        Masterpiece Photo Ready
                      </span>
                      <span className="text-xs text-muted-foreground block">
                        Stored securely on production cloud CDN
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Case 2: No image exists - show the upload box */
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-dashed border-border p-6 bg-muted/10 text-center sm:text-left">
                  <div className="space-y-0.5">
                    <span className="text-xs font-medium text-foreground block">
                      Upload Photograph from Device
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      JPEG, PNG, or WEBP up to 10MB (automatically stored on CDN)
                    </span>
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer"
                    >
                      <UploadCloud data-icon="inline-start" />
                      {isUploading ? "Uploading File..." : "Choose Image File"}
                    </Button>
                  </div>
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="imageAlt" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Image Alt Text *
                </FieldLabel>
                <Input
                  id="imageAlt"
                  {...register("images.0.alt")}
                  placeholder="Studio close-up of solitaire ring"
                />
              </Field>
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
              <Field>
                <FieldLabel htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Retail Price ($ USD) *
                </FieldLabel>
                <Input
                  id="price"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="18500"
                />
                {errors.price && (
                  <FieldError>{errors.price.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="compareAtPrice" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Compare At Price ($ USD)
                </FieldLabel>
                <Input
                  id="compareAtPrice"
                  type="number"
                  {...register("compareAtPrice", { valueAsNumber: true })}
                  placeholder="Optional anchor value"
                />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category *
                </FieldLabel>
                <Select
                  value={selectedCategory}
                  onValueChange={(val) => {
                    if (val) setValue("category", val as (typeof CATEGORIES)[number]);
                  }}
                >
                  <SelectTrigger className="w-full h-9 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="collection" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Collection *
                </FieldLabel>
                <Input id="collection" {...register("collection")} placeholder="e.g. Solitaires" />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Availability Status *
                </FieldLabel>
                <Select
                  value={selectedStockStatus}
                  onValueChange={(val) => {
                    if (val) setValue("stockStatus", val as (typeof STOCK_STATUSES)[number]);
                  }}
                >
                  <SelectTrigger className="w-full h-9 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground">
                    <SelectValue placeholder="Availability Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {STOCK_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="stockQuantity" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Physical Inventory Count
                </FieldLabel>
                <Input
                  id="stockQuantity"
                  type="number"
                  {...register("stockQuantity", { valueAsNumber: true })}
                  placeholder="1"
                />
              </Field>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                    Featured on Storefront
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    Display prominently on the homepage atelier carousel
                  </span>
                </div>
                <Switch
                  checked={Boolean(isFeatured)}
                  onCheckedChange={(checked) => setValue("featured", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
