import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { items, currency } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const isIndia = currency === "INR";

    // Securely calculate total on the backend to prevent price spoofing
    let calculatedSubtotal = 0;
    
    for (const item of items) {
      const itemId = item.id || item.productId;
      let dbProduct;
      
      const mongoose = require("mongoose");
      if (mongoose.Types.ObjectId.isValid(itemId)) {
        dbProduct = await Product.findById(itemId);
      } else {
        // Fallback for hardcoded frontend strings mapping to slugs
        const slugMap: Record<string, string> = {
          "herb": "mediterranean-herb-fusion",
          "salt": "himalayan-salt",
          "truffle": "black-truffle"
        };
        const actualSlug = slugMap[itemId] || itemId;
        dbProduct = await Product.findOne({ slug: actualSlug });
      }
      
      if (!dbProduct) {
        return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 404 });
      }

      if (dbProduct.stockQuantity < item.quantity) {
        return NextResponse.json({ error: `Not enough stock for ${item.name}` }, { status: 400 });
      }

      let activePrice = 0;
      if (isIndia) {
        activePrice = dbProduct.discountPriceINR || dbProduct.priceINR || 65; // Default 65 for India if not set
      } else {
        activePrice = dbProduct.discountPrice || dbProduct.price;
      }
      
      calculatedSubtotal += activePrice * item.quantity;
    }

    // Default shipping rules (matches frontend logic)
    const shippingCost = calculatedSubtotal >= 50 ? 0 : 5;
    const finalTotal = calculatedSubtotal + shippingCost;

    const amountInCents = Math.round(finalTotal * 100);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY as string,
      key_secret: process.env.RAZORPAY_API_SECRET as string,
    });

    const options = {
      amount: amountInCents,
      currency: isIndia ? "INR" : "EUR",
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
      payment_capture: 1, // Auto capture
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
      order_id: order.id,
      amount: finalTotal,
      currency: order.currency,
      subtotal: calculatedSubtotal,
      shipping: shippingCost,
    });
  } catch (error: any) {
    console.error("Razorpay Create Order Error:", error);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
