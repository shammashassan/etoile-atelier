"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Check } from "lucide-react";
import { type Product } from "@/lib/schemas/product";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { MetalSelector } from "@/components/shared/motion/MetalSelector";
import { SuccessCheckmark } from "@/components/shared/motion/SuccessCheckmark";
import { submitInquiryAction } from "@/lib/actions/inquiry-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedMetal, setSelectedMetal] = useState<string>(
    product.metals[0] || "Platinum 950"
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeImage = product.images[activeImageIdx] || product.images[0];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await submitInquiryAction({
        fullName,
        email,
        phone,
        preferredDate,
        jewelryType: "Private Atelier Viewing Appointment",
        budgetRange: "$15,000 – $35,000",
        notes: `Interest in ${product.title} (${selectedMetal}). ${notes}`,
      });

      if (res.success) {
        setIsSubmitted(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* Top Breadcrumb Header: Official Shadcn Breadcrumb */}
      <div className="border-b border-border/60 bg-background py-4 px-6 lg:px-12">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            render={<Link href="/collections" />}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground h-auto p-0"
          >
            <ArrowLeft className="size-4" />
            <span>Salon Collection</span>
          </Button>
          <Breadcrumb>
            <BreadcrumbList className="text-xs uppercase tracking-wider">
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Atelier</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/collections" />}>{product.category}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-foreground truncate max-w-48 sm:max-w-none">
                  {product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Left: Gallery with High Resolution Artistry */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-secondary border border-border">
              <AspectRatio ratio={4 / 5} className="w-full">
                {activeImage?.url && (
                  <Image
                    src={activeImage.url}
                    alt={activeImage.alt || product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-1000 ease-out hover:scale-103"
                  />
                )}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="outline" className="bg-background/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground border-border">
                    {product.stockStatus === "in_stock" ? "Available in Salon" : "Bespoke Made to Order"}
                  </Badge>
                </div>
              </AspectRatio>
            </div>

            {/* Thumbnail selector using official Shadcn ToggleGroup */}
            {product.images.length > 1 && (
              <ToggleGroup
                value={[String(activeImageIdx)]}
                onValueChange={(vals) => {
                  if (vals[0] !== undefined) setActiveImageIdx(Number(vals[0]));
                }}
                className="flex gap-3 justify-start"
              >
                {product.images.map((img, idx) => (
                  <ToggleGroupItem
                    key={img.url}
                    value={String(idx)}
                    variant="outline"
                    className={cn(
                      "relative size-20 p-0 overflow-hidden bg-secondary transition-all border",
                      activeImageIdx === idx ? "border-foreground ring-2 ring-foreground" : "opacity-60 hover:opacity-100 border-border"
                    )}
                  >
                    <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          </div>

          {/* Right: Jewelry Details & Specifications */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground block font-mono">
                {product.collection} Salon Series • Reference {product.sku}
              </span>
              <h1 className="font-heading text-3xl font-normal tracking-tight text-foreground sm:text-5xl">
                {product.title}
              </h1>
              <div className="pt-2 flex items-baseline gap-4">
                <span className="font-heading text-2xl font-light text-foreground sm:text-3xl">
                  ${product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    ${product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Metallurgy Selector */}
            <div className="space-y-3 pt-2 border-t border-border/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Selected Alloy: <strong className="text-foreground">{selectedMetal}</strong>
              </span>
              <MetalSelector
                metals={product.metals}
                selectedMetal={selectedMetal}
                onSelect={setSelectedMetal}
              />
            </div>

            {/* Gemological Specs Summary */}
            <div className="space-y-3 py-4 border-y border-border/50 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider">Primary Gemstones</span>
                  <span className="font-medium text-foreground text-sm">{product.gemstones.join(", ")}</span>
                </div>
                {product.caratWeight && (
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wider">Total Carat Weight</span>
                    <span className="font-medium text-foreground text-sm">{product.caratWeight} ct</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {product.clarity && (
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wider">Clarity Grade</span>
                    <span className="font-medium text-foreground text-sm">{product.clarity} (GIA Certified)</span>
                  </div>
                )}
                {product.cutGrade && (
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wider">Cut Symmetry</span>
                    <span className="font-medium text-foreground text-sm">{product.cutGrade} Proportion</span>
                  </div>
                )}
              </div>
            </div>

            {/* Craft Narrative */}
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-normal text-foreground">
                Artisanal Metallurgy &amp; Provenance
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Action Buttons & Viewing Dialog */}
            <div className="space-y-4 pt-4">
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger
                  render={
                    <Button size="lg" className="w-full text-xs font-semibold uppercase tracking-wider">
                      Request Private Salon Viewing
                    </Button>
                  }
                />
                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent className="max-w-md bg-background border border-border">
                    <DialogHeader>
                      <DialogTitle className="font-heading text-xl font-normal">
                        Private Atelier Consultation
                      </DialogTitle>
                      <DialogDescription className="text-xs text-muted-foreground uppercase tracking-wider">
                        Schedule a private viewing of {product.title} with an atelier gemologist.
                      </DialogDescription>
                    </DialogHeader>

                    {isSubmitted ? (
                      <div className="py-8 text-center space-y-4">
                        <SuccessCheckmark size={56} className="mx-auto" />
                        <div className="space-y-1">
                          <h4 className="font-heading text-lg text-foreground">
                            Viewing Requested
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Our concierge will contact you via {email || "email"} within 24 hours to confirm your private appointment.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsSubmitted(false);
                            setIsBookingOpen(false);
                          }}
                        >
                          Close Confirmation
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
                        <FieldGroup className="gap-4">
                          <Field>
                            <FieldLabel htmlFor="booking-name" className="text-xs text-muted-foreground uppercase tracking-wider">
                              Your Full Name *
                            </FieldLabel>
                            <Input
                              id="booking-name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              required
                              placeholder="Lady Evelyn Sinclair"
                              className="text-xs"
                            />
                          </Field>

                          <div className="grid grid-cols-2 gap-3">
                            <Field>
                              <FieldLabel htmlFor="booking-email" className="text-xs text-muted-foreground uppercase tracking-wider">
                                Email Address *
                              </FieldLabel>
                              <Input
                                id="booking-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="evelyn@sinclair.com"
                                className="text-xs"
                              />
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="booking-phone" className="text-xs text-muted-foreground uppercase tracking-wider">
                                Telephone *
                              </FieldLabel>
                              <Input
                                id="booking-phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="+1 (555) 019-2831"
                                className="text-xs"
                              />
                            </Field>
                          </div>

                          <Field>
                            <FieldLabel htmlFor="booking-date" className="text-xs text-muted-foreground uppercase tracking-wider">
                              Preferred Viewing Date *
                            </FieldLabel>
                            <Input
                              id="booking-date"
                              type="date"
                              value={preferredDate}
                              onChange={(e) => setPreferredDate(e.target.value)}
                              required
                              className="text-xs"
                            />
                          </Field>

                          <Field>
                            <FieldLabel htmlFor="booking-notes" className="text-xs text-muted-foreground uppercase tracking-wider">
                              Special Requests / Sizing Details
                            </FieldLabel>
                            <Textarea
                              id="booking-notes"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              rows={3}
                              placeholder="Ring size 6.5, interest in matching band..."
                              className="text-xs"
                            />
                          </Field>
                        </FieldGroup>

                        <div className="flex justify-end gap-3 pt-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsBookingOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" size="sm" disabled={isSubmitting}>
                            {isSubmitting ? "Transmitting..." : "Confirm Viewing Request"}
                          </Button>
                        </div>
                      </form>
                    )}
                  </DialogContent>
                </DialogPortal>
              </Dialog>

              <div className="flex items-center justify-between text-xs tracking-wider uppercase text-muted-foreground pt-3 border-t border-border/50">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-foreground" />
                  Insured Global Transport
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-foreground" />
                  Kimberley Audited Gemstones
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
