"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShieldCheck, MapPin, Clock } from "lucide-react";
import {
  INQUIRY_TYPES,
  BUDGET_RANGES,
} from "@/lib/schemas/inquiry";
import { submitInquiryAction } from "@/lib/actions/inquiry-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      <div className="mx-auto max-w-xl bg-secondary p-12 text-center">
        <div className="flex justify-center mb-6">
          <SuccessCheckmark size={64} />
        </div>
        <h2 className="font-heading text-3xl font-normal text-foreground mb-4">
          Private Consultation Requested
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
              Explore Salon Pieces
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-16 lg:grid-cols-12 items-start">
      {/* Left Column: Context & Guarantees (5 cols) */}
      <div className="space-y-12 lg:col-span-5">
        <div className="space-y-4">
          <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-6xl">
            Bespoke Commissions &amp; Private Salons
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Every bespoke masterpiece begins with an intimate conversation. Whether you desire an investment-grade solitaire, a re-imagined family heirloom, or a custom High Jewelry suite, our master jewelers bring your vision to life.
          </p>
        </div>

        {/* Atelier Commitments */}
        <div className="space-y-8 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-secondary text-foreground">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-normal text-foreground">
                Conflict-Free &amp; Certified Provenance
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Every stone is hand-selected and accompanied by full GIA or SSEF gemological certificates verifying natural unheated origin.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-secondary text-foreground">
              <MapPin className="size-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-normal text-foreground">
                Private Viewing Salons
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Experience stones in person at our salons in Paris (Place Vendôme), London (New Bond St), Geneva, or New York (Madison Ave).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-secondary text-foreground">
              <Clock className="size-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-normal text-foreground">
                6 to 8 Week Artisan Timeline
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Hand-forged by master jewelers with weekly photographic progress dossiers delivered directly to your private concierge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form (7 cols) */}
      <div className="lg:col-span-7 bg-secondary p-8 sm:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Section: Select Type */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-foreground block">
              Commission Category
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {INQUIRY_TYPES.map((type) => {
                const isSelected = selectedType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue("jewelryType", type)}
                    className={`p-3.5 text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-foreground text-background font-medium"
                        : "bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Budget Allocation */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-foreground block">
              Target Acquisition Budget
            </label>
            <div className="grid gap-2 sm:grid-cols-3">
              {BUDGET_RANGES.map((b) => {
                const isSelected = selectedBudget === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setValue("budgetRange", b)}
                    className={`p-3 text-center text-xs transition-colors ${
                      isSelected
                        ? "bg-foreground text-background font-medium"
                        : "bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Client & Appointment Details */}
          <div className="space-y-4">
            <span className="text-xs font-medium text-foreground block">
              Client &amp; Appointment Details
            </span>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">
                  Full Legal Name *
                </label>
                <Input
                  {...register("fullName")}
                  placeholder="Countess Genevieve de Valois"
                  className="bg-background text-xs"
                />
                {errors.fullName && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1">
                  Email Address *
                </label>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="genevieve@atelier.com"
                  className="bg-background text-xs"
                />
                {errors.email && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">
                  Direct Telephone *
                </label>
                <Input
                  type="tel"
                  {...register("phone")}
                  placeholder="+33 1 42 68 00 00"
                  className="bg-background text-xs"
                />
                {errors.phone && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1">
                  Preferred Salon Date or Timeline *
                </label>
                <Input
                  {...register("preferredDate")}
                  placeholder="Paris Salon, late November"
                  className="bg-background text-xs"
                />
                {errors.preferredDate && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.preferredDate.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                Aesthetic Vision &amp; Stone Preferences
              </label>
              <Textarea
                {...register("notes")}
                rows={4}
                placeholder="Describe your desired gemstone (e.g. unheated Ceylon sapphire, cushion cut), metal preferences, or family heirloom reset details..."
                className="bg-background text-xs leading-relaxed"
              />
              {errors.notes && (
                <span className="text-xs text-destructive mt-1 block">
                  {errors.notes.message}
                </span>
              )}
            </div>
          </div>

          {serverError && (
            <div className="bg-destructive/10 p-3 text-xs text-destructive">
              {serverError}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full text-xs font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Transmitting Dossier..." : "Submit Private Salon Request"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              All inquiries are held in strict discretion under Swiss and French banking-level data privacy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}