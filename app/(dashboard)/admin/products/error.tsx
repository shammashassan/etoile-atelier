"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin products error:", error);
  }, [error]);

  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4 text-center">
      <h2 className="font-heading text-xl tracking-wide text-foreground">
        Unable to load jewelry catalog
      </h2>
      <p className="max-w-md text-xs text-muted-foreground">
        Failed to fetch product records from the database.
      </p>
      <Button variant="outline" size="sm" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
