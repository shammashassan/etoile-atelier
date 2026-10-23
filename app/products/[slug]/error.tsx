"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product detail error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-6">
      <h2 className="font-heading text-2xl tracking-wide text-foreground">
        Unable to load jewelry presentation
      </h2>
      <p className="max-w-md text-xs text-muted-foreground">
        An error occurred while loading this piece from the atelier catalog.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={() => reset()}>
          Retry
        </Button>
        <Link href="/">
          <Button size="sm">Return to Atelier</Button>
        </Link>
      </div>
    </div>
  );
}
