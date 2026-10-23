"use client";

import { useEffect } from "react";

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
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground text-center px-4 font-sans">
        <h1 className="text-3xl font-bold tracking-tight">Application Error</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          A critical system error occurred. Please try reloading the application.
        </p>
        <button
          onClick={() => reset()}
          className="rounded px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
