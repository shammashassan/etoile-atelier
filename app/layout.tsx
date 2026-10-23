import type { Metadata } from "next";
import { Geist, Noto_Sans, Playfair_Display } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BRAND } from "@/lib/data";
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
  metadataBase: new URL(process.env.BETTER_AUTH_URL || BRAND.url),
  title: {
    default: BRAND.seo.defaultTitle,
    template: BRAND.seo.titleTemplate,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  keywords: [...BRAND.seo.keywords],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BRAND.url,
    siteName: BRAND.name,
    title: BRAND.seo.defaultTitle,
    description: BRAND.description,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.seo.defaultTitle,
    description: BRAND.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans scroll-smooth",
        geistSans.variable,
        notoSans.variable,
        playfairDisplay.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
        <NuqsAdapter>
          <TooltipProvider>{children}</TooltipProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
