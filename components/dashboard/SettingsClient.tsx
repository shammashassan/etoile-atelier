"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Check, Upload, Sparkles, Loader2, Link2, Trash2 } from "lucide-react";
import { SiteSettingsSchema, type SiteSettings } from "@/lib/schemas/settings";
import { updateSettingsAction } from "@/lib/actions/settings-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const DEFAULT_SLIDES = [
  {
    id: "couture-emerald-necklace",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971894/etoile-atelier/hero-editorial-couture-emerald.jpg",
    alt: "Amara Gold Haute Joaillerie Emerald & Diamond Collar Necklace in 22K Gold",
    title: "Haute Joaillerie Emerald Collar",
    subtitle: "3.40 ct Royal Zambian Emerald • Natural VVS Diamonds",
    href: "/collections?category=Heritage+Palakka+%26+Temple",
    actionText: "Discover Emerald Collar",
  },
  {
    id: "lumina-solitaire",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971502/etoile-atelier/hero-editorial-solitaire-on-figure.jpg",
    alt: "The Amara Gold Lumina Solitaire Diamond Ring on-figure in 22K Gold and Platinum 950",
    title: "The Amara Gold Lumina Solitaire",
    subtitle: "2.15 ct VVS1 Natural Diamond • Hand-Set in Platinum & 22K Gold",
    href: "/products/amara-gold-lumina-solitaire-ring",
    actionText: "Inspect Lumina Solitaire",
  },
  {
    id: "sculpted-gold-cuff",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971895/etoile-atelier/hero-editorial-sculpted-cuff.jpg",
    alt: "Amara Gold Architectural Sculpted Diamond Cuff Bracelet in Solid 22K Gold",
    title: "Architectural Sculpted Gold Cuff",
    subtitle: "4.20 ctw Brilliant Diamonds • Hand-Formed Solid Gold",
    href: "/collections?category=Kasavu+Kadas+%26+Bangles",
    actionText: "Examine Sculpted Cuff",
  },
];

const SLIDE_LABELS = [
  {
    badge: "Hero Print 1 (Left)",
    description: "Haute Joaillerie Emerald Collar Editorial (3:4 portrait ratio)",
  },
  {
    badge: "Hero Print 2 (Center)",
    description: "Flagship Lumina Solitaire On-Figure Editorial (3:4 portrait ratio)",
  },
  {
    badge: "Hero Print 3 (Right)",
    description: "Architectural Sculpted Gold Cuff Editorial (16:10 wide ratio)",
  },
];

interface SettingsClientProps {
  initialSettings: SiteSettings;
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeSlideTab, setActiveSlideTab] = useState(0);

  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const mergedSlides =
    initialSettings.heroSlides && initialSettings.heroSlides.length === 3
      ? initialSettings.heroSlides
      : DEFAULT_SLIDES;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SiteSettings>({
    resolver: zodResolver(SiteSettingsSchema) as any,
    defaultValues: {
      ...initialSettings,
      heroSlides: mergedSlides,
    },
  });

  const heroSlides = watch("heroSlides") || mergedSlides;

  const handleSlideUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setValue(`heroSlides.${index}.image`, data.url, { shouldDirty: true, shouldValidate: true });
      } else {
        setUploadError(data.error || "Image upload failed");
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Image upload network error");
    } finally {
      setUploadingIndex(null);
      if (fileInputRefs[index].current) {
        fileInputRefs[index].current.value = "";
      }
    }
  };

  const onSubmit = async (data: SiteSettings) => {
    setIsSubmitting(true);
    setSavedSuccess(false);

    try {
      const res = await updateSettingsAction(data);
      if (res.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-light tracking-wide text-foreground">
            Atelier Settings
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            Global boutique identity, announcement banner, and homepage hero showcase
          </p>
        </div>
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {savedSuccess ? (
            <>
              <Check data-icon="inline-start" className="text-primary" />
              Settings Updated
            </>
          ) : (
            <>
              <Save data-icon="inline-start" />
              {isSubmitting ? "Saving..." : "Save Settings"}
            </>
          )}
        </Button>
      </div>

      {/* Brand Identity & Announcement */}
      <Card>
        <CardHeader>
          <CardTitle>Branding &amp; Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="atelierName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Atelier Brand Name
              </FieldLabel>
              <Input id="atelierName" {...register("atelierName")} />
              {errors.atelierName && (
                <FieldError>{errors.atelierName.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="tagline" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Brand Tagline
              </FieldLabel>
              <Input id="tagline" {...register("tagline")} />
              {errors.tagline && (
                <FieldError>{errors.tagline.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="announcementBar" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Announcement Banner Text (Top of Storefront)
              </FieldLabel>
              <Textarea id="announcementBar" {...register("announcementBar")} rows={2} />
              {errors.announcementBar && (
                <FieldError>{errors.announcementBar.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Unified Homepage Hero Showcase Manager */}
      <Card>
        <CardHeader>
          <CardTitle>Homepage Hero Showcase (3 Hero Prints)</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Manage all three prints shown in the storefront top hero section. Upload photos directly from your computer, set titles, subtitles, and link destinations.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-secondary/40 border border-border p-3.5 text-xs text-muted-foreground flex items-start gap-3">
            <Sparkles className="size-4 text-accent shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground font-medium block">How these 3 prints appear on the storefront:</strong>
              <p className="mt-1 leading-relaxed">
                On desktop, they display side-by-side as an asymmetric 3-print gallery (Left, Center, and Right). On mobile, they form the 3 auto-playing slides in the swipeable hero carousel.
              </p>
            </div>
          </div>

          {uploadError && (
            <Alert variant="destructive">
              <AlertTitle>Upload Error</AlertTitle>
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}

          {/* Slide Switcher Tabs */}
          <div className="grid grid-cols-3 gap-2 border-b border-border pb-3">
            {[0, 1, 2].map((idx) => {
              const isActive = activeSlideTab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlideTab(idx)}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary font-medium shadow-xs"
                      : "bg-card text-muted-foreground hover:text-foreground border-border/40"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-80 block font-mono">
                    {SLIDE_LABELS[idx].badge}
                  </span>
                  <span className="text-xs font-normal truncate block mt-0.5">
                    {heroSlides[idx]?.title || `Hero Slide ${idx + 1}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Slide Editor */}
          {[0, 1, 2].map((idx) => {
            if (activeSlideTab !== idx) return null;
            const slide = heroSlides[idx] || DEFAULT_SLIDES[idx];
            const isUploading = uploadingIndex === idx;
            const watchedImage = watch(`heroSlides.${idx}.image`);
            const currentImage = watchedImage !== undefined ? watchedImage : slide?.image;
            const hasImage = Boolean(currentImage && currentImage.trim() !== "");

            return (
              <div key={idx} className="space-y-6 pt-1">
                {/* Hidden inputs to bind the image URL and slide ID without exposing raw URLs */}
                <input type="hidden" {...register(`heroSlides.${idx}.id`)} value={slide.id || `slide-${idx}`} />
                <input type="hidden" {...register(`heroSlides.${idx}.image`)} />

                {/* Always-accessible hidden file input for device photo selection */}
                <input
                  type="file"
                  ref={fileInputRefs[idx]}
                  onChange={(e) => handleSlideUpload(idx, e)}
                  accept="image/*"
                  className="hidden"
                />

                {/* Case 1: Photo is present - Show clean Photo Card with Change and Remove actions (Upload box hidden) */}
                {hasImage ? (
                  <div className="border border-border p-5 bg-card space-y-4">
                    <div className="flex items-center justify-between border-b border-border/40 pb-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                          Active Slide Photo
                        </span>
                        <span className="text-accent font-medium flex items-center gap-1">
                          • {SLIDE_LABELS[idx].badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRefs[idx].current?.click()}
                          disabled={isUploading}
                          className="text-xs h-8 px-3 cursor-pointer"
                        >
                          <Upload className="size-3.5 mr-1.5" />
                          {isUploading ? "Uploading..." : "Change Photo"}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setValue(`heroSlides.${idx}.image`, "", { shouldDirty: true, shouldValidate: true });
                          }}
                          disabled={isUploading}
                          className="text-xs h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                        >
                          <Trash2 className="size-3.5 mr-1.5" />
                          Remove Photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-12 gap-5 items-center">
                      <div className="sm:col-span-5 relative aspect-square sm:aspect-4/3 w-full overflow-hidden bg-secondary border border-border">
                        <Image
                          src={currentImage}
                          alt={watch(`heroSlides.${idx}.alt`) || slide.alt || "Slide preview"}
                          fill
                          sizes="(max-width: 640px) 100vw, 30vw"
                          className="object-cover"
                          unoptimized
                        />
                        {isUploading && (
                          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center">
                            <Loader2 className="size-6 animate-spin text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="sm:col-span-7 space-y-2.5 min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
                          <Sparkles className="size-3" />
                          <span>Active on Storefront</span>
                        </div>
                        <h4 className="font-heading text-lg font-normal text-foreground truncate">
                          {watch(`heroSlides.${idx}.title`) || slide.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {watch(`heroSlides.${idx}.subtitle`) || slide.subtitle}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate pt-1 font-mono">
                          <Link2 className="size-3 shrink-0 text-accent" />
                          <span className="truncate">{watch(`heroSlides.${idx}.href`) || slide.href}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Case 2: No photo present - Show the Upload Dropzone */
                  <div className="border border-dashed border-border p-8 text-center hover:bg-muted/10 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-10 rounded-full bg-secondary flex items-center justify-center">
                        {isUploading ? (
                          <Loader2 className="size-5 animate-spin text-primary" />
                        ) : (
                          <Upload className="size-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-foreground block">
                          {isUploading ? "Uploading photo..." : `Upload Photo for ${SLIDE_LABELS[idx].badge}`}
                        </span>
                        <span className="text-[11px] text-muted-foreground block">
                          {SLIDE_LABELS[idx].description} • PNG, JPG, or WEBP up to 10MB
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRefs[idx].current?.click()}
                        disabled={isUploading}
                        className="mt-2 text-xs cursor-pointer"
                      >
                        <Upload className="size-3.5 mr-1.5" />
                        Select Photo from Computer
                      </Button>
                    </div>
                  </div>
                )}

                {/* Slide Details */}
                <FieldGroup className="gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor={`slide-${idx}-title`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Slide Title *
                      </FieldLabel>
                      <Input
                        id={`slide-${idx}-title`}
                        {...register(`heroSlides.${idx}.title`)}
                        placeholder="Masterpiece Name or Studio Title"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor={`slide-${idx}-subtitle`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Subtitle / Hallmark *
                      </FieldLabel>
                      <Input
                        id={`slide-${idx}-subtitle`}
                        {...register(`heroSlides.${idx}.subtitle`)}
                        placeholder="Carat, metal purity, or provenance"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor={`slide-${idx}-href`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Click Destination (Link) *
                      </FieldLabel>
                      <Input
                        id={`slide-${idx}-href`}
                        {...register(`heroSlides.${idx}.href`)}
                        placeholder="/products/your-product-slug or /#studio"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor={`slide-${idx}-actionText`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Action Tag (Hover Micro-Text)
                      </FieldLabel>
                      <Input
                        id={`slide-${idx}-actionText`}
                        {...register(`heroSlides.${idx}.actionText`)}
                        placeholder="Inspect Masterwork"
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor={`slide-${idx}-alt`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Photo Description (for accessibility)
                    </FieldLabel>
                    <Input
                      id={`slide-${idx}-alt`}
                      {...register(`heroSlides.${idx}.alt`)}
                      placeholder="Detailed visual description"
                    />
                  </Field>
                </FieldGroup>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Concierge & Client Services */}
      <Card>
        <CardHeader>
          <CardTitle>Concierge &amp; Client Services</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contactEmail" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Concierge Email
                </FieldLabel>
                <Input id="contactEmail" type="email" {...register("contactEmail")} />
                {errors.contactEmail && (
                  <FieldError>{errors.contactEmail.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="contactPhone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Private Line / Telephone
                </FieldLabel>
                <Input id="contactPhone" {...register("contactPhone")} />
                {errors.contactPhone && (
                  <FieldError>{errors.contactPhone.message}</FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    </form>
  );
}
