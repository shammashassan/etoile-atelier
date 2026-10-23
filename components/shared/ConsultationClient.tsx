"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Gem,
  Calendar,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
} from "lucide-react";
import {
  INQUIRY_TYPES,
  BUDGET_RANGES,
} from "@/lib/schemas/inquiry";
import { submitInquiryAction } from "@/lib/actions/inquiry-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SuccessCheckmark } from "@/components/shared/motion/SuccessCheckmark";

const ConsultationFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(7, "Phone number is required"),
  preferredDate: z.string().min(1, "Preferred date or timeline is required"),
  jewelryType: z.enum(INQUIRY_TYPES),
  budgetRange: z.enum(BUDGET_RANGES),
  notes: z.string().max(1000),
});

type ConsultationFormValues = z.infer<typeof ConsultationFormSchema>;

export function ConsultationClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(ConsultationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredDate: "Next 2-3 weeks",
      jewelryType: "Custom Solitaire Engagement Ring",
      budgetRange: "$15,000 – $35,000",
      notes: "",
    },
  });

  const selectedType = watch("jewelryType");
  const selectedBudget = watch("budgetRange");

  const onSubmit = async (values: ConsultationFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await submitInquiryAction(values);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.error || "Failed to submit commission request.");
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-xl border border-border bg-card p-12 text-center shadow-lg">
        <div className="flex justify-center mb-6">
          <SuccessCheckmark size={64} />
        </div>
        <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          Commission Dossier Received
        </span>
        <h2 className="font-heading text-3xl font-light text-foreground mb-4">
          Your Private Consultation is Requested
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-8">
          A dedicated Senior Gemologist from Étoile Atelier has received your commission specifications and will reach out within 24 hours to coordinate your salon appointment.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSuccess(false);
              reset();
            }}
          >
            Submit Another Request
          </Button>
          <Link href="/collections">
            <Button size="sm">
              Explore Archival Pieces
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      {/* Left Column: Context & Guarantees */}
      <div className="space-y-8 lg:col-span-5">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Gem className="size-3.5" />
            Haute Joaillerie Commission
          </div>
          <h1 className="font-heading text-4xl font-light tracking-wide text-foreground sm:text-5xl">
            Bespoke Creations & Private Salons
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every bespoke masterpiece begins with an intimate conversation. Whether you desire an investment-grade solitaire, a re-imagined family heirloom, or a custom High Jewelry suite, our master jewelers bring your vision to life.
          </p>
        </div>

        {/* Atelier Commitments */}
        <div className="space-y-4 border-t border-border pt-6">
          <div className="flex items-start gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center border border-border bg-card text-primary">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <h3 className="font-heading text-base font-medium text-foreground">
                Conflict-Free & Certified Provenance
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Every stone is hand-selected and accompanied by full GIA or SSEF gemological certificates verifying natural origin.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center border border-border bg-card text-primary">
              <MapPin className="size-4" />
            </div>
            <div>
              <h3 className="font-heading text-base font-medium text-foreground">
                Private Viewing Salons
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Experience stones in person at our salons in Paris (Place Vendôme), London (New Bond St), or via secure encrypted digital salon.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center border border-border bg-card text-primary">
              <Clock className="size-4" />
            </div>
            <div>
              <h3 className="font-heading text-base font-medium text-foreground">
                6 to 8 Week Artisan Timeline
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Hand-forged by master jewelers with weekly photographic progress dossiers delivered directly to your portal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="lg:col-span-7">
        <Card className="border-border bg-card">
          <CardContent className="p-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: Select Type */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-muted-foreground block">
                  1. Commission Type
                </label>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {INQUIRY_TYPES.map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setValue("jewelryType", type)}
                        className={`flex items-center justify-between border p-3.5 text-left text-xs transition-colors ${
                          isSelected
                            ? "border-foreground bg-muted/60 font-semibold text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                        }`}
                      >
                        <span>{type}</span>
                        {isSelected && <Sparkles className="size-3.5 text-primary shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget Allocation */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-muted-foreground block">
                  2. Target Acquisition Budget
                </label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {BUDGET_RANGES.map((b) => {
                    const isSelected = selectedBudget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setValue("budgetRange", b)}
                        className={`border p-3 text-center text-xs transition-colors ${
                          isSelected
                            ? "border-foreground bg-muted/60 font-semibold text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Client Particulars */}
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-muted-foreground block">
                  3. Client Contact Information
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <User className="size-3" /> Full Name
                    </span>
                    <Input
                      {...register("fullName")}
                      placeholder="e.g. Lady Vivienne Vance"
                      className="text-xs"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-destructive">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Mail className="size-3" /> Email Address
                    </span>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="vivienne@domain.com"
                      className="text-xs"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Phone className="size-3" /> Mobile / WhatsApp
                    </span>
                    <Input
                      {...register("phone")}
                      placeholder="+1 (555) 019-2834"
                      className="text-xs"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="size-3" /> Target Date / Timeline
                    </span>
                    <Input
                      {...register("preferredDate")}
                      placeholder="e.g. November 2026 or Immediate"
                      className="text-xs"
                    />
                    {errors.preferredDate && (
                      <p className="text-xs text-destructive">{errors.preferredDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground">
                    Custom Vision, Gemstone Preferences, or Ring Size
                  </span>
                  <Textarea
                    {...register("notes")}
                    rows={4}
                    placeholder="Describe any particular stone silhouette (Emerald Cut, Cushion, Oval), preferred metal (Platinum, Yellow Gold), or family engraving..."
                    className="text-xs"
                  />
                  {errors.notes && (
                    <p className="text-xs text-destructive">{errors.notes.message}</p>
                  )}
                </div>
              </div>

              {serverError && (
                <div className="border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
                  {serverError}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                <Sparkles data-icon="inline-start" />
                {isSubmitting ? "Transmitting Dossier..." : "Submit Bespoke Commission Dossier"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
