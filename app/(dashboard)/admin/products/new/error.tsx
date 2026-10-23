"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function NewProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("New product form error:", error);
  }, [error]);

  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4 text-center">
      <h2 className="font-heading text-xl tracking-wide text-foreground">
        Error loading product editor
      </h2>
      <Button variant="outline" size="sm" onClick={() => reset()}>
        Reload Form
      </Button>
    </div>
  );
}
