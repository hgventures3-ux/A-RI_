import type { Metadata } from "next";
import B2BHomePage from "@/components/B2BHomePage";

export const metadata: Metadata = {
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

export default function Home() {
  return <B2BHomePage />;
}
