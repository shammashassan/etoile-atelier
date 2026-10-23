"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Check } from "lucide-react";
import { SiteSettingsSchema, type SiteSettings } from "@/lib/schemas/settings";
import { updateSettingsAction } from "@/lib/actions/settings-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";

interface SettingsClientProps {
  initialSettings: SiteSettings;
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteSettings>({
    resolver: zodResolver(SiteSettingsSchema),
    defaultValues: initialSettings,
  });

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-light tracking-wide text-foreground">
            Atelier Settings
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            Global boutique identity, announcement banner, and concierge coordinates
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
