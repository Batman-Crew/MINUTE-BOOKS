import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Analytics } from "@/components/layout/Analytics";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { site } from "@/lib/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Minute Books — Run your business. Not your paperwork.",
    template: "%s · Minute Books",
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["business management software", "POS billing software", "GST billing", "inventory management", "accounting software India", "payroll software", "restaurant QR ordering", "RestoConnect", "Minute Books"],
  openGraph: { siteName: site.name, locale: site.locale, type: "website", url: site.url },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/minutebooks-logo-original.png`,
  email: site.email,
  slogan: "Accounting made simple.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {/* reveal animations start hidden; keep content readable without JavaScript */}
        <noscript><style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style></noscript>
        <SmoothScroll />
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
