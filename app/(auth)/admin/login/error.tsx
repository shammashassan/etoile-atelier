"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminLoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin login error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-4">
      <h2 className="font-heading text-xl tracking-wide text-foreground">
        Authentication Error
      </h2>
      <Button variant="outline" size="sm" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
}
