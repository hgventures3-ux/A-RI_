import type { Metadata } from "next";
import Script from "next/script";
import { cookies, headers } from "next/headers";
import Providers from "@/components/Providers";
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
  title: "AÉRI - Le snacking qui vous élève",
  description: "L'équilibre parfait entre tradition millénaire et plaisir instantané",
  alternates: {
    languages: {
      "fr": "https://aerisnacks.com",
      "en": "https://aerisnacks.com",
    },
  },
  openGraph: {
    title: "AÉRI - Le snacking qui vous élève",
    description: "L'équilibre parfait entre tradition millénaire et plaisir instantané",
    url: "https://aerisnacks.com",
    siteName: "AÉRI Snacks",
    images: [
      {
        url: "https://aerisnacks.com/flavor_himalayan_salt_new.png",
        width: 1200,
        height: 630,
        alt: "AÉRI Snacks - Makhana Premium",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AÉRI - Le snacking qui vous élève",
    description: "L'équilibre parfait entre tradition millénaire et plaisir instantané",
    images: ["https://aerisnacks.com/flavor_himalayan_salt_new.png"],
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
      lang="fr"
      className={`${inter.variable} ${montserrat.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
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
      <body className="min-h-full flex flex-col">
        <Providers initialCountry={initialCountry}>{children}</Providers>
      </body>
    </html>
  );
}
