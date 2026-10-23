"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShieldCheck, MapPin, Clock, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import {
  MaskedLineHeadline,
} from "@/components/shared/motion/MotionSection";
import { INQUIRY_TYPES, BUDGET_RANGES } from "@/lib/schemas/inquiry";
import { submitInquiryAction } from "@/lib/actions/inquiry-actions";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { SuccessCheckmark } from "@/components/shared/motion/SuccessCheckmark";

const EASE = [0.22, 1, 0.36, 1] as const;

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

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    title: "Conflict-Free & Certified Provenance",
    body: "Every stone is hand-selected and accompanied by full GIA or SSEF gemological certificates verifying natural unheated origin.",
  },
  {
    icon: MapPin,
    title: "Private Viewing Salons",
    body: "Experience stones in person at our salons in Paris (Place Vendôme), London (New Bond St), Geneva, or New York (Madison Ave).",
  },
  {
    icon: Clock,
    title: "6 to 8 Week Artisan Timeline",
    body: "Hand-forged by master jewelers with weekly photographic progress dossiers delivered directly to your private concierge.",
  },
] as const;

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
      <Empty className="mx-auto max-w-xl bg-secondary p-12 text-center border border-border">
        <EmptyHeader>
          <EmptyMedia className="mb-4">
            <SuccessCheckmark size={64} />
          </EmptyMedia>
          <EmptyTitle className="text-2xl font-normal">
            Private Consultation Requested
          </EmptyTitle>
          <EmptyDescription className="text-sm leading-relaxed max-w-md">
            A dedicated Senior Gemologist from {BRAND.name} has received your commission specifications and will reach out within 24 hours to coordinate your salon appointment.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex flex-row justify-center gap-4 mt-4">
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
          <Button
            render={<Link href="/collections" />}
            nativeButton={false}
            size="sm"
          >
            Explore Salon Pieces
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="grid gap-16 lg:grid-cols-12 items-start">
      {/* Left Column: Context & Guarantees (5 cols) */}
      <div className="space-y-12 lg:col-span-5">
        <div className="space-y-4">
          <MaskedLineHeadline
            lines={["Bespoke Commissions", "& Private Salons"]}
            tag="h1"
            className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            Every bespoke masterpiece begins with an intimate conversation. Whether you desire an investment-grade solitaire, a re-imagined family heirloom, or a custom High Jewelry suite, our master jewelers bring your vision to life.
          </motion.p>
        </div>

        {/* Atelier Commitments */}
        <div className="space-y-8 pt-4">
          {COMMITMENTS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
              className="flex items-start gap-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center bg-secondary text-foreground">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-normal text-foreground">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column: Form (7 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
        className="lg:col-span-7 bg-secondary p-8 sm:p-12 border border-border"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <FieldGroup className="gap-8">
            {/* Section: Select Type using official Shadcn ToggleGroup */}
            <Field>
              <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Commission Category
              </FieldLabel>
              <ToggleGroup
                value={[selectedType]}
                onValueChange={(vals) => {
                  if (vals[0]) setValue("jewelryType", vals[0] as (typeof INQUIRY_TYPES)[number]);
                }}
                className="grid gap-2.5 sm:grid-cols-2 w-full"
              >
                {INQUIRY_TYPES.map((type) => {
                  const isSelected = selectedType === type;
                  return (
                    <ToggleGroupItem
                      key={type}
                      value={type}
                      variant="outline"
                      className={cn(
                        "h-auto p-3.5 text-left text-xs tracking-normal normal-case border justify-start",
                        isSelected
                          ? "bg-foreground text-background border-foreground hover:bg-foreground/90 font-medium"
                          : "bg-background text-foreground border-border hover:bg-muted"
                      )}
                    >
                      {type}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </Field>

            {/* Section: Budget Allocation using official Shadcn ToggleGroup */}
            <Field>
              <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Target Acquisition Budget
              </FieldLabel>
              <ToggleGroup
                value={[selectedBudget]}
                onValueChange={(vals) => {
                  if (vals[0]) setValue("budgetRange", vals[0] as (typeof BUDGET_RANGES)[number]);
                }}
                className="grid gap-2 sm:grid-cols-3 w-full"
              >
                {BUDGET_RANGES.map((b) => {
                  const isSelected = selectedBudget === b;
                  return (
                    <ToggleGroupItem
                      key={b}
                      value={b}
                      variant="outline"
                      className={cn(
                        "h-auto p-3 text-center text-xs tracking-normal normal-case border justify-center",
                        isSelected
                          ? "bg-foreground text-background border-foreground hover:bg-foreground/90 font-medium"
                          : "bg-background text-foreground border-border hover:bg-muted"
                      )}
                    >
                      {b}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </Field>

            {/* Section: Client & Appointment Details */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                Client &amp; Appointment Details
              </span>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="fullName" className="text-xs text-muted-foreground uppercase tracking-wider">
                    Full Legal Name *
                  </FieldLabel>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Countess Genevieve de Valois"
                    className="bg-background text-xs"
                  />
                  {errors.fullName && (
                    <FieldError>{errors.fullName.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-wider">
                    Email Address *
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="genevieve@atelier.com"
                    className="bg-background text-xs"
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="phone" className="text-xs text-muted-foreground uppercase tracking-wider">
                    Direct Telephone *
                  </FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+33 1 42 68 00 00"
                    className="bg-background text-xs"
                  />
                  {errors.phone && (
                    <FieldError>{errors.phone.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="preferredDate" className="text-xs text-muted-foreground uppercase tracking-wider">
                    Preferred Salon Date or Timeline *
                  </FieldLabel>
                  <Input
                    id="preferredDate"
                    {...register("preferredDate")}
                    placeholder="Paris Salon, late November"
                    className="bg-background text-xs"
                  />
                  {errors.preferredDate && (
                    <FieldError>{errors.preferredDate.message}</FieldError>
                  )}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="notes" className="text-xs text-muted-foreground uppercase tracking-wider">
                  Aesthetic Vision &amp; Stone Preferences
                </FieldLabel>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  rows={4}
                  placeholder="Describe your desired gemstone (e.g. unheated Ceylon sapphire, cushion cut), metal preferences, or family heirloom reset details..."
                  className="bg-background text-xs leading-relaxed"
                />
                {errors.notes && (
                  <FieldError>{errors.notes.message}</FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>

          {serverError && (
            <Alert variant="destructive">
              <ShieldAlert className="size-4" />
              <AlertTitle>Submission Error</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full text-xs font-semibold uppercase tracking-wider"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Transmitting Dossier..." : "Submit Private Salon Request"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              All inquiries are held in strict discretion under Swiss and French banking-level data privacy.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
