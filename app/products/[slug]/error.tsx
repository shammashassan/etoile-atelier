"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product detail error caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4 py-20">
      <h2 className="font-heading text-2xl tracking-wide text-foreground">
        Unable to Load High Jewelry Piece
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        We encountered an error retrieving this archival dossier from our vault.
      </p>
      <div className="flex gap-4 mt-2">
        <Button variant="outline" onClick={() => reset()}>
          Try Again
        </Button>
        <Link href="/collections">
          <Button variant="default">Return to Salon Collections</Button>
        </Link>
      </div>
    </div>
  );
}
