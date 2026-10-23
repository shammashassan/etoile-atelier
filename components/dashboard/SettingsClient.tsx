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
          <CardTitle>Branding & Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
              Atelier Brand Name
            </label>
            <Input {...register("atelierName")} />
            {errors.atelierName && (
              <p className="text-xs text-destructive mt-1">{errors.atelierName.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
              Brand Tagline
            </label>
            <Input {...register("tagline")} />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
              Announcement Banner Text (Top of Storefront)
            </label>
            <Textarea {...register("announcementBar")} rows={2} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Concierge & Client Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                Concierge Email
              </label>
              <Input type="email" {...register("contactEmail")} />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                Private Line / Telephone
              </label>
              <Input {...register("contactPhone")} />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
