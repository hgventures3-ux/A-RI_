import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Boutique | AÉRI Snacks",
  description: "Découvrez notre collection de Makhana premium. L'équilibre parfait entre tradition millénaire et plaisir instantané.",
  openGraph: {
    title: "Boutique | AÉRI Snacks",
    description: "Découvrez notre collection de Makhana premium. L'équilibre parfait entre tradition millénaire et plaisir instantané.",
    url: "https://aerisnacks.com/products",
    images: [
      {
        url: "https://aerisnacks.com/flavor_himalayan_salt_new.png",
        width: 1200,
        height: 630,
        alt: "AÉRI Snacks Boutique",
      },
    ],
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
