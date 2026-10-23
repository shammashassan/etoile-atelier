"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Consultation route error:", error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-125 flex-col items-center justify-center px-6 py-20 text-center">
      <h2 className="font-heading text-3xl font-light text-foreground mb-3">
        Unable to Initialize Bespoke Dossier
      </h2>
      <p className="max-w-md text-xs text-muted-foreground mb-8">
        We experienced a connection issue loading the consultation portal. Please retry or contact our concierge directly.
      </p>
      <Button variant="outline" size="sm" onClick={() => reset()}>
        Retry Commission Form
      </Button>
    </div>
  );
}
