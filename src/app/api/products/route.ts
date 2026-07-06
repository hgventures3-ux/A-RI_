import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import {
  currencyForCountry,
  detectCountryFromHeaders,
  formatMoney,
  getProductUnitPrice,
} from "@/lib/pricing";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const country = detectCountryFromHeaders(request.headers);
    const currency = currencyForCountry(country, "EUR");
    
    // Only return products that are marked as "Active"
    const products = await Product.find({ status: "Active" }).sort({ createdAt: 1 });
    const localizedProducts = products.map((product) => {
      const data = product.toObject();
      const localizedPrice = getProductUnitPrice(data, currency);

      return {
        ...data,
        currency,
        localizedPrice,
        localizedPriceDisplay: formatMoney(localizedPrice, currency),
      };
    });
    
    return NextResponse.json({ success: true, data: localizedProducts }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching public products:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}
