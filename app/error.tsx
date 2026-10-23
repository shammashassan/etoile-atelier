"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error boundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h2 className="font-heading text-2xl tracking-wider text-foreground">
        Something went wrong
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        An unexpected error occurred while loading this page.
      </p>
      <Button variant="outline" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
