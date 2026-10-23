"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Check } from "lucide-react";
import { type Product } from "@/lib/schemas/product";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
      {/* Top Breadcrumb Header: Flat, clean */}
      <div className="border-b border-border/60 bg-background py-4 px-6 lg:px-12">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/collections"
            className="flex items-center gap-2 text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Salon Collection</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Atelier</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-foreground">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Left: Gallery with High Resolution Artistry */}
          <div className="space-y-4">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-secondary">
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
              <div className="absolute top-4 left-4 bg-background/95 px-3 py-1.5 text-sm text-foreground">
                {product.stockStatus === "in_stock" ? "Available in Salon" : "Bespoke Made to Order"}
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative size-20 overflow-hidden bg-secondary transition-all ${
                      activeImageIdx === idx ? "ring-2 ring-foreground" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Jewelry Details & Specifications */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-sm text-muted-foreground block">
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

            {/* Metal Selection */}
            {product.metals.length > 0 && (
              <div className="space-y-3">
                <span className="text-sm font-medium text-foreground block">
                  Select Precious Metal Alloy
                </span>
                <MetalSelector
                  metals={product.metals}
                  selectedMetal={selectedMetal}
                  onSelect={setSelectedMetal}
                />
              </div>
            )}

            {/* Short Narrative */}
            <p className="text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Gemological Specifications Matrix */}
            <div className="bg-secondary/40 p-6 space-y-4">
              <h3 className="font-heading text-lg font-normal text-foreground">
                Atelier Gemological Specifications
              </h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground block">Primary Gemstone</dt>
                  <dd className="font-medium text-foreground">{product.gemstones.join(", ")}</dd>
                </div>
                {product.caratWeight && (
                  <div>
                    <dt className="text-muted-foreground block">Carat Weight</dt>
                    <dd className="font-medium text-foreground">{product.caratWeight} ct</dd>
                  </div>
                )}
                {product.clarity && (
                  <div>
                    <dt className="text-muted-foreground block">Clarity Certification</dt>
                    <dd className="font-medium text-foreground">{product.clarity} (GIA Verified)</dd>
                  </div>
                )}
                {product.cutGrade && (
                  <div>
                    <dt className="text-muted-foreground block">Cut Symmetry</dt>
                    <dd className="font-medium text-foreground">{product.cutGrade}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* CTA and Consultation Trigger */}
            <div className="space-y-4 pt-2">
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger render={<Button size="lg" className="w-full text-sm font-medium" />}>
                  Request Private Salon Viewing
                </DialogTrigger>

                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent className="max-w-md bg-background border border-border">
                    <DialogHeader>
                      <DialogTitle className="font-heading text-xl font-normal">
                        Private Atelier Consultation
                      </DialogTitle>
                      <DialogDescription className="text-sm text-muted-foreground">
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
                        <div>
                          <label className="text-sm text-muted-foreground block mb-1">
                            Your Full Name *
                          </label>
                          <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="Lady Evelyn Sinclair"
                            className="text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm text-muted-foreground block mb-1">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="evelyn@sinclair.com"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground block mb-1">
                              Telephone *
                            </label>
                            <Input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              placeholder="+1 (555) 019-2831"
                              className="text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-muted-foreground block mb-1">
                            Preferred Viewing Date *
                          </label>
                          <Input
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            required
                            className="text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-muted-foreground block mb-1">
                            Special Requests / Sizing Details
                          </label>
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Ring size 6.5, interest in matching band..."
                            className="text-sm"
                          />
                        </div>

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

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/50">
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