"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, Check } from "lucide-react";
import { type Product } from "@/lib/schemas/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CardTilt } from "@/components/shared/motion/CardTilt";
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-border bg-background/80 py-4 px-6 lg:px-12 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/collections"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>All Collections</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Atelier</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-foreground">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Gallery with 3D CardTilt */}
          <div className="space-y-4">
            <CardTilt maxTilt={8} perspective={1200} className="w-full">
              <div className="relative aspect-square w-full overflow-hidden border border-border bg-muted/20">
                {activeImage?.url && (
                  <Image
                    src={activeImage.url}
                    alt={activeImage.alt || product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                )}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant={product.stockStatus === "in_stock" ? "default" : "secondary"}>
                    {product.stockStatus.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </CardTilt>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative size-20 overflow-hidden border transition-all ${
                      activeImageIdx === idx ? "border-primary ring-1 ring-primary" : "border-border opacity-70 hover:opacity-100"
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
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {product.collection} Collection • SKU: {product.sku}
              </div>
              <h1 className="font-heading text-3xl font-light tracking-wide text-foreground sm:text-4xl lg:text-5xl">
                {product.title}
              </h1>
              <div className="pt-2 flex items-baseline gap-4">
                <span className="font-heading text-2xl font-light text-foreground sm:text-3xl">
                  ${product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Metal Selection */}
            {product.metals.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block">
                  Select Precious Metal
                </span>
                <MetalSelector
                  metals={product.metals}
                  selectedMetal={selectedMetal}
                  onSelect={setSelectedMetal}
                />
              </div>
            )}

            {/* Short Narrative */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Specifications Matrix */}
            <div className="border-y border-border py-6 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block">
                Atelier Specifications
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground block">Gemstone</span>
                  <span className="font-medium text-foreground">{product.gemstones.join(", ")}</span>
                </div>
                {product.caratWeight && (
                  <div>
                    <span className="text-muted-foreground block">Carat Weight</span>
                    <span className="font-medium text-foreground">{product.caratWeight} ct</span>
                  </div>
                )}
                {product.clarity && (
                  <div>
                    <span className="text-muted-foreground block">Clarity Grade</span>
                    <span className="font-medium text-foreground">{product.clarity}</span>
                  </div>
                )}
                {product.cutGrade && (
                  <div>
                    <span className="text-muted-foreground block">Cut Quality</span>
                    <span className="font-medium text-foreground">{product.cutGrade}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA and Consultation Trigger */}
            <div className="space-y-4 pt-2">
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger render={<Button size="lg" className="w-full" />}>
                  <Sparkles data-icon="inline-start" />
                  Book Private Atelier Viewing
                </DialogTrigger>

                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-heading text-xl font-light tracking-wide">
                        Private Atelier Consultation
                      </DialogTitle>
                      <DialogDescription className="text-xs">
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
                          <p className="text-xs text-muted-foreground">
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
                          <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                            Your Full Name *
                          </label>
                          <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="Lady Evelyn Sinclair"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="evelyn@sinclair.com"
                            />
                          </div>
                          <div>
                            <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                              Telephone *
                            </label>
                            <Input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              placeholder="+1 (555) 019-2831"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                            Preferred Viewing Date *
                          </label>
                          <Input
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                            Special Requests / Sizing Details
                          </label>
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Ring size 6.5, interest in matching band..."
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

              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" />
                  Insured Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" />
                  GIA / IGI Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
