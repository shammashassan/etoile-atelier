export default function Loading() {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4">
      <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="font-heading text-sm uppercase tracking-widest text-muted-foreground animate-pulse">
        Loading atelier collection...
      </p>
    </div>
  );
}
