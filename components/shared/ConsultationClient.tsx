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
import { INQUIRY_TYPES, BUDGET_RANGES, SHOWROOM_LOCATIONS } from "@/lib/schemas/inquiry";
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
import { MagneticButton } from "@/components/shared/motion/MagneticButton";

const EASE = [0.22, 1, 0.36, 1] as const;

const ConsultationFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(7, "Phone number is required"),
  preferredDate: z.string().min(1, "Preferred date or timeline is required"),
  jewelryType: z.enum(INQUIRY_TYPES),
  budgetRange: z.enum(BUDGET_RANGES),
  showroomLocation: z.enum(SHOWROOM_LOCATIONS),
  notes: z.string().max(1000),
});

type ConsultationFormValues = z.infer<typeof ConsultationFormSchema>;

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    title: "BIS 916 & Natural Diamond Certification",
    body: "Every jewel carries the official BIS 916 government hallmark and premier GIA or IGI certificates verifying natural untreated diamonds.",
  },
  {
    icon: MapPin,
    title: "Private Amara Gold Salons",
    body: "Experience stones in person at our salons in Kochi (Marine Drive), Kozhikode, Thrissur (Round West), or Dubai (DIFC).",
  },
  {
    icon: Clock,
    title: "6 to 8 Week Hereditary Goldsmith Timeline",
    body: "Hand-sculpted by master Thrissur goldsmiths and certified diamond setters with weekly photographic progress dossiers delivered to your concierge.",
  },
] as const;

interface CategoryMeta {
  title: string;
  subtitle: string;
  tag?: string;
}

const CATEGORY_META: Record<(typeof INQUIRY_TYPES)[number], CategoryMeta> = {
  "Kerala Bridal Trousseau (20+ Pavans)": {
    title: "Kerala Bridal Trousseau",
    subtitle: "Custom 22K Trousseau Suites",
    tag: "20+ Pavans",
  },
  "Custom Solitaire Engagement Ring": {
    title: "Solitaire Engagement Ring",
    subtitle: "GIA & IGI Natural Diamonds",
    tag: "Solitaire",
  },
  "Heritage Antique & Temple Gold Commission": {
    title: "Heritage Antique & Temple Gold",
    subtitle: "Hereditary Goldsmith Art",
    tag: "Temple Gold",
  },
  "Private Atelier Viewing Appointment": {
    title: "Private Atelier Viewing",
    subtitle: "Dedicated Salon Session",
    tag: "Salon VIP",
  },
  "Family Gold Remodeling & Exchange": {
    title: "Family Gold Remodeling",
    subtitle: "Heirloom Melt & Exchange",
    tag: "Exchange",
  },
  "Anniversary Band & Diamond Jewelry": {
    title: "Anniversary & Fine Jewelry",
    subtitle: "Eternity Bands & Haute Suites",
    tag: "Diamonds",
  },
};

interface BudgetMeta {
  fullAmount: string;
  compactAmount: string;
  weight: string;
}

const BUDGET_META: Record<(typeof BUDGET_RANGES)[number], BudgetMeta> = {
  "₹1,00,000 – ₹3,00,000 (15–40g)": {
    fullAmount: "₹1,00,000 – ₹3,00,000",
    compactAmount: "₹1L – ₹3L",
    weight: "15–40g Gold",
  },
  "₹3,00,000 – ₹7,00,000 (5–10 Pavans)": {
    fullAmount: "₹3,00,000 – ₹7,00,000",
    compactAmount: "₹3L – ₹7L",
    weight: "5–10 Pavans",
  },
  "₹7,00,000 – ₹15,00,000 (10–20 Pavans)": {
    fullAmount: "₹7,00,000 – ₹15,00,000",
    compactAmount: "₹7L – ₹15L",
    weight: "10–20 Pavans",
  },
  "₹15,00,000 – ₹35,00,000 (20–50 Pavans)": {
    fullAmount: "₹15,00,000 – ₹35,00,000",
    compactAmount: "₹15L – ₹35L",
    weight: "20–50 Pavans",
  },
  "₹35,00,000+ (Imperial Bridal Trousseau)": {
    fullAmount: "₹35,00,000+",
    compactAmount: "₹35L+",
    weight: "Imperial Bridal Trousseau",
  },
};

interface ShowroomMeta {
  city: string;
  lounge: string;
  isVirtual?: boolean;
}

const SHOWROOM_META: Record<(typeof SHOWROOM_LOCATIONS)[number], ShowroomMeta> = {
  "Kochi • Marine Drive Flagship": {
    city: "Kochi",
    lounge: "Marine Drive Flagship",
  },
  "Kozhikode • Mavoor Road Lounge": {
    city: "Kozhikode",
    lounge: "Mavoor Road Lounge",
  },
  "Thrissur • Round West Sovereign Salon": {
    city: "Thrissur",
    lounge: "Round West Sovereign",
  },
  "Dubai • DIFC Gate Precinct Suite": {
    city: "Dubai",
    lounge: "DIFC Gate Precinct",
  },
  "Virtual WhatsApp Video Consultation": {
    city: "Virtual Salon",
    lounge: "WhatsApp Video Call",
    isVirtual: true,
  },
};

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
      jewelryType: "Kerala Bridal Trousseau (20+ Pavans)",
      budgetRange: "₹7,00,000 – ₹15,00,000 (10–20 Pavans)",
      showroomLocation: "Kochi • Marine Drive Flagship",
      notes: "",
    },
  });

  const selectedType = watch("jewelryType");
  const selectedBudget = watch("budgetRange");
  const selectedShowroom = watch("showroomLocation");

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
    <div className="grid gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-12 items-start max-w-7xl mx-auto">
      {/* Left Column: Context & Guarantees (4 cols, sticky on desktop) */}
      <div className="space-y-10 lg:col-span-4 xl:col-span-4 lg:sticky lg:top-28">
        <div className="space-y-4">
          <MaskedLineHeadline
            lines={["Bespoke Commissions", "& Private Salons"]}
            tag="h1"
            className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl xl:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="text-sm sm:text-base leading-relaxed text-muted-foreground"
          >
            Every bespoke masterpiece begins with an intimate conversation. Whether you desire an investment-grade solitaire, a re-imagined family heirloom, or a custom High Jewelry suite, our master jewelers bring your vision to life.
          </motion.p>
        </div>

        {/* Atelier Commitments */}
        <div className="space-y-6 pt-2">
          {COMMITMENTS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
              className="flex items-start gap-3.5"
            >
              <div className="flex size-9 shrink-0 items-center justify-center bg-accent/15 text-accent border border-accent/30">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-base font-normal text-foreground leading-snug">
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

      {/* Right Column: Form (8 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
        className="lg:col-span-8 xl:col-span-8 bg-secondary p-5 sm:p-7 md:p-8 lg:p-10 border border-border"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
          <FieldGroup className="gap-7">
            {/* Section: Commission Category Tabs */}
            <Field>
              <div className="flex items-center justify-between pb-1">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Commission Category
                </FieldLabel>
                <span className="text-[11px] text-muted-foreground hidden sm:inline">
                  Select 1 category
                </span>
              </div>
              <ToggleGroup
                value={[selectedType]}
                onValueChange={(vals) => {
                  if (vals[0]) setValue("jewelryType", vals[0] as (typeof INQUIRY_TYPES)[number], { shouldValidate: true });
                }}
                className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full"
              >
                {INQUIRY_TYPES.map((type) => {
                  const isSelected = selectedType === type;
                  const meta = CATEGORY_META[type];
                  return (
                    <ToggleGroupItem
                      key={type}
                      value={type}
                      variant="outline"
                      className={cn(
                        "shrink min-w-0 w-full h-auto p-3 text-left flex flex-col justify-between items-start transition-all duration-150 cursor-pointer border rounded-none whitespace-normal normal-case tracking-normal active:scale-[0.98]",
                        isSelected
                          ? "bg-accent text-accent-foreground border-accent font-medium shadow-xs ring-1 ring-accent"
                          : "bg-background text-foreground border-border hover:bg-muted/70 hover:border-foreground/20"
                      )}
                    >
                      <div className="flex items-start justify-between gap-1.5 w-full min-w-0">
                        <span className="text-xs font-medium leading-snug break-words">
                          {meta.title}
                        </span>
                        {meta.tag && (
                          <span
                            className={cn(
                              "shrink-0 text-[10px] font-semibold px-1.5 py-0.5 border leading-none tracking-tight",
                              isSelected
                                ? "bg-accent-foreground/15 border-accent-foreground/30 text-accent-foreground"
                                : "bg-accent/10 border-accent/25 text-accent"
                            )}
                          >
                            {meta.tag}
                          </span>
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] mt-1.5 leading-normal block w-full break-words",
                          isSelected ? "text-accent-foreground/80 font-normal" : "text-muted-foreground"
                        )}
                      >
                        {meta.subtitle}
                      </span>
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </Field>

            {/* Section: Target Acquisition Budget Tabs */}
            <Field>
              <div className="flex items-center justify-between pb-1">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Target Acquisition Budget
                </FieldLabel>
                <span className="text-[11px] text-muted-foreground hidden sm:inline">
                  Gold weight &amp; pavans
                </span>
              </div>
              <ToggleGroup
                value={[selectedBudget]}
                onValueChange={(vals) => {
                  if (vals[0]) setValue("budgetRange", vals[0] as (typeof BUDGET_RANGES)[number], { shouldValidate: true });
                }}
                className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full"
              >
                {BUDGET_RANGES.map((b, index) => {
                  const isSelected = selectedBudget === b;
                  const meta = BUDGET_META[b];
                  const isLast = index === BUDGET_RANGES.length - 1;
                  return (
                    <ToggleGroupItem
                      key={b}
                      value={b}
                      variant="outline"
                      className={cn(
                        "shrink min-w-0 w-full h-auto p-2.5 sm:p-3 text-center flex flex-col items-center justify-center transition-all duration-150 cursor-pointer border rounded-none whitespace-normal normal-case tracking-normal active:scale-[0.98]",
                        isLast && "col-span-2 sm:col-span-1",
                        isSelected
                          ? "bg-accent text-accent-foreground border-accent font-medium shadow-xs ring-1 ring-accent"
                          : "bg-background text-foreground border-border hover:bg-muted/70 hover:border-foreground/20"
                      )}
                    >
                      <span className="text-[11px] sm:text-xs font-semibold tracking-tight text-foreground leading-tight block w-full break-words">
                        <span className="hidden xl:inline">{meta.fullAmount}</span>
                        <span className="xl:hidden">{meta.compactAmount}</span>
                      </span>
                      <span
                        className={cn(
                          "text-[10px] mt-1 leading-tight block w-full break-words",
                          isSelected ? "text-accent-foreground/85 font-medium" : "text-muted-foreground"
                        )}
                      >
                        {meta.weight}
                      </span>
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </Field>

            {/* Section: Preferred Showroom or Virtual Medium Tabs */}
            <Field>
              <div className="flex items-center justify-between pb-1">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Preferred Showroom / Consultation Lounge
                </FieldLabel>
                <span className="text-[11px] text-muted-foreground hidden sm:inline">
                  Private salon or video call
                </span>
              </div>
              <ToggleGroup
                value={[selectedShowroom]}
                onValueChange={(vals) => {
                  if (vals[0]) setValue("showroomLocation", vals[0] as (typeof SHOWROOM_LOCATIONS)[number], { shouldValidate: true });
                }}
                className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full"
              >
                {SHOWROOM_LOCATIONS.map((loc) => {
                  const isSelected = selectedShowroom === loc;
                  const meta = SHOWROOM_META[loc];
                  return (
                    <ToggleGroupItem
                      key={loc}
                      value={loc}
                      variant="outline"
                      className={cn(
                        "shrink min-w-0 w-full h-auto p-2.5 sm:p-3 text-center sm:text-left flex flex-col justify-between transition-all duration-150 cursor-pointer border rounded-none whitespace-normal normal-case tracking-normal active:scale-[0.98]",
                        meta.isVirtual && "col-span-2 sm:col-span-1",
                        isSelected
                          ? "bg-accent text-accent-foreground border-accent font-medium shadow-xs ring-1 ring-accent"
                          : "bg-background text-foreground border-border hover:bg-muted/70 hover:border-foreground/20"
                      )}
                    >
                      <div className="flex items-center justify-between w-full gap-1">
                        <span className="text-[11px] sm:text-xs font-semibold tracking-tight leading-tight block truncate sm:whitespace-normal">
                          {meta.city}
                        </span>
                        {meta.isVirtual ? (
                          <span className="shrink-0 size-2 rounded-full bg-emerald-500 animate-pulse" title="Online Live Consultation" />
                        ) : (
                          <MapPin className={cn("size-3 shrink-0 opacity-60 hidden sm:block", isSelected && "opacity-100")} />
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] mt-1.5 leading-tight block break-words",
                          isSelected ? "text-accent-foreground/85 font-medium" : "text-muted-foreground"
                        )}
                      >
                        {meta.lounge}
                      </span>
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
                    Full Name *
                  </FieldLabel>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Dr. Lakshmi Menon"
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
                    placeholder="lakshmi.menon@example.com"
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
                    Telephone (WhatsApp enabled) *
                  </FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+91 98470 12345 or +971 50 123 4567"
                    className="bg-background text-xs"
                  />
                  {errors.phone && (
                    <FieldError>{errors.phone.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="preferredDate" className="text-xs text-muted-foreground uppercase tracking-wider">
                    Preferred Date &amp; Time *
                  </FieldLabel>
                  <Input
                    id="preferredDate"
                    {...register("preferredDate")}
                    placeholder="Kochi Salon, next Sunday at 3:00 PM"
                    className="bg-background text-xs"
                  />
                  {errors.preferredDate && (
                    <FieldError>{errors.preferredDate.message}</FieldError>
                  )}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="notes" className="text-xs text-muted-foreground uppercase tracking-wider">
                  Trousseau Requirements &amp; Gold Weight Specifications
                </FieldLabel>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  rows={4}
                  placeholder="Mention desired pavan target (e.g. 35 pavans for bridal set), specific Kerala ornaments (Palakka, Manga Mala, Kasavu Kadas), or old gold exchange details..."
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
            <MagneticButton
              type="submit"
              variant="accent"
              strength={0.25}
              className="w-full h-12 font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Transmitting Dossier..." : "Submit Private Salon Request"}</span>
            </MagneticButton>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              All inquiries are held in strict discretion under Swiss and French banking-level data privacy.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
