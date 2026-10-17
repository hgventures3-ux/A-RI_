import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "AÉRI Makhana | Premium Roasted Makhana Range",
  description:
    "AÉRI Makhana: premium roasted makhana in Himalayan Salt & Pepper, Gourmet Truffle and Dark Chocolate. For distributors and importers.",
  openGraph: {
    title: "AÉRI Makhana | Premium Roasted Makhana Range",
    description:
      "AÉRI Makhana: premium roasted makhana in Himalayan Salt & Pepper, Gourmet Truffle and Dark Chocolate. For distributors and importers.",
    url: "https://www.aerisnacks.com/products",
    images: [
      {
        url: "/flavor_himalayan_salt_new.png",
        width: 1200,
        height: 630,
        alt: "AÉRI Makhana Products",
      },
    ],
    locale: "en_US",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
