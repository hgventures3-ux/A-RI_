import type { Metadata } from "next";
import B2BHomePage from "@/components/B2BHomePage";

export const metadata: Metadata = {
  title: "Phool Makhana Exporter India | Raw Makhana & Private Label | AÉRI",
  description:
    "Export-grade raw Phool Makhana (fox nuts, 4 to 6 suta) and private-label roasted makhana from certified partner facilities in India. FOB Mundra. Request a quote.",
  keywords: [
    "phool makhana exporter",
    "fox nuts export India",
    "private label makhana",
    "raw makhana bulk",
    "makhana supplier India",
  ],
};

export default function Home() {
  return <B2BHomePage />;
}
