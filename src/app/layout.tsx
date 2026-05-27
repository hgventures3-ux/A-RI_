import type { Metadata } from "next";
import Script from "next/script";import Providers from "@/components/Providers";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AÉRI - Le snacking qui vous élève",
  description: "L'équilibre parfait entre tradition millénaire et plaisir instantané",
  alternates: {
    languages: {
      "fr-FR": "https://aerisnacks.com/fr",
      "en-US": "https://aerisnacks.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AÉRI Snacks",
    "url": "https://aerisnacks.com",
    "logo": "https://aerisnacks.com/logo.png",
    "sameAs": [
      "https://www.instagram.com/aerisnacks",
      "https://www.linkedin.com/company/aeri-snacks"
    ]
  };

  return (
    <html
      lang="fr"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
