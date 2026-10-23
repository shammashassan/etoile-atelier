"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global critical error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background text-foreground text-center px-4 font-sans">
        <h1 className="text-3xl font-bold tracking-tight">Application Error</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          A critical system error occurred. Please try reloading the application.
        </p>
        <Button
          onClick={() => reset()}
          size="sm"
        >
          Reload
        </Button>
      </body>
    </html>
  );
}
