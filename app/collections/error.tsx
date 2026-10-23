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
    console.error("Collections route error:", error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-125 flex-col items-center justify-center px-6 py-20 text-center">
      <h2 className="font-heading text-3xl font-light text-foreground mb-3">
        The Atelier Archives are Momentarily Unavailable
      </h2>
      <p className="max-w-md text-xs text-muted-foreground mb-8">
        We encountered a synchronization delay fetching the high jewelry collection. Please re-attempt or contact our concierges.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" size="sm" onClick={() => reset()}>
          Retry Catalog
        </Button>
      </div>
    </div>
  );
}
