"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminOverviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin overview error:", error);
  }, [error]);

  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4 text-center">
      <h2 className="font-heading text-xl tracking-wide text-foreground">
        Unable to load atelier overview
      </h2>
      <p className="max-w-md text-xs text-muted-foreground">
        A database or network error occurred while retrieving current metrics.
      </p>
      <Button variant="outline" size="sm" onClick={() => reset()}>
        Retry Loading
      </Button>
    </div>
  );
}
