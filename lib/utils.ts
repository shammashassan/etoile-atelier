import { cn } from "cn";

export { cn };

/**
 * Format currency with Indian numbering system (Lakhs / Crores) or USD fallback.
 * e.g., 1850000 -> "₹18,50,000"
 */
export function formatPrice(amount: number, currency: "INR" | "USD" | string = "INR"): string {
  try {
    if (currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString()}`;
  }
}
