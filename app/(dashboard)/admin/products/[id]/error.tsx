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
    console.error("Edit product route error:", error);
  }, [error]);

  return (
    <div className="flex min-h-100 flex-col items-center justify-center text-center p-8">
      <h2 className="font-heading text-2xl font-light text-foreground mb-2">
        Unable to Load Jewelry Masterpiece
      </h2>
      <p className="text-xs text-muted-foreground mb-6 max-w-md">
        The requested archival piece could not be retrieved from the atelier catalog.
      </p>
      <Button variant="outline" size="sm" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
