import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { headers } from "next/headers";
import { site } from "@/config/site";
import { SiteChrome } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { HideOnHome } from "@/components/HideOnHome";
import { OrganicGuide } from "@/components/OrganicGuide";
import { ServiceCards } from "@/components/ServiceCards";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Safety Nets & Invisible Grills in Hyderabad | Tirumala Safety Nets",
    template: "%s | Tirumala Safety Nets",
  },
  description: site.description,
  openGraph: {
    title: "Safety Nets & Invisible Grills in Hyderabad",
    description: site.description,
    locale: "en_IN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description: site.description,
  email: site.email,
  areaServed: { "@type": "City", name: "Hyderabad" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  url: site.url,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const path = (await headers()).get("x-pathname") ?? "";
  return (
    <html lang="en">
      <body id="top" className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <SiteChrome />
        <main id="content">{children}</main>
        {path && path !== "/" ? <OrganicGuide path={path} /> : null}
        <HideOnHome>
          <ServiceCards />
        </HideOnHome>
        <Footer />
      </body>
    </html>
  );
}
