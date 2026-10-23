"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminSettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin settings error:", error);
  }, [error]);

  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4 text-center">
      <h2 className="font-heading text-xl tracking-wide text-foreground">
        Unable to load atelier settings
      </h2>
      <Button variant="outline" size="sm" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
