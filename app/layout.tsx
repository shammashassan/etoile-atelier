import type { Metadata } from "next";
import { Geist, Noto_Sans, Playfair_Display } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairDisplay = Playfair_Display({ /* taste-skill-ignore */
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BETTER_AUTH_URL || "https://etoile-atelier.com"),
  title: "Étoile Atelier | Haute Joaillerie & Fine Jewelry",
  description: "Handcrafted fine jewelry, ethical diamonds, and bespoke atelier creations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans",
        geistSans.variable,
        notoSans.variable,
        playfairDisplay.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
