import type { Metadata } from "next";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Atelier Sign In",
  description: `Secure administrative access for ${BRAND.name} staff and gemologists.`,
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
