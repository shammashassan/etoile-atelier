import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex flex-col gap-2">
        <span className="font-heading text-6xl text-muted-foreground/50">404</span>
        <h1 className="font-heading text-2xl tracking-widest uppercase">Page Not Found</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          The jewelry piece or page you are seeking could not be found or has been moved to a new collection.
        </p>
      </div>
      <Button nativeButton={false} render={<Link href="/" />} variant="outline">
        Return to Atelier
      </Button>
    </div>
  );
}
