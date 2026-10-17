import type { Metadata } from "next";
import Script from "next/script";
import { cookies, headers } from "next/headers";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";
import { GEO_COUNTRY_COOKIE, normalizeCountryCode } from "@/lib/pricing";

import { Inter, Montserrat, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-didot",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aerisnacks.com"),
  title: "Phool Makhana Exporter India | Raw Makhana & Private Label | AÉRI",
  description:
    "Export-grade raw Phool Makhana (fox nuts) and private-label roasted makhana from certified partner facilities in India. Part of KHT Group.",
  openGraph: {
    title: "Phool Makhana Exporter India | Raw Makhana & Private Label | AÉRI",
    description:
      "Export-grade raw Phool Makhana (fox nuts) and private-label roasted makhana from certified partner facilities in India. Part of KHT Group.",
    url: "https://www.aerisnacks.com",
    siteName: "AÉRI Makhana",
    images: [
      {
        url: "/hero-makhana-bag.webp",
        width: 1200,
        height: 1200,
        alt: "Raw Phool Makhana Export - AÉRI Makhana",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phool Makhana Exporter India | Raw Makhana & Private Label | AÉRI",
    description:
      "Export-grade raw Phool Makhana (fox nuts) and private-label roasted makhana from certified partner facilities in India. Part of KHT Group.",
    images: ["/hero-makhana-bag.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const initialCountry = normalizeCountryCode(
    headerStore.get("x-aeri-country") || cookieStore.get(GEO_COUNTRY_COOKIE)?.value
  );

  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <GoogleAnalytics />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wxhc6xuglt");
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-montserrat">
        <Providers initialCountry={initialCountry}>{children}</Providers>
      </body>
    </html>
  );
}
