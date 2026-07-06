import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/lib/db";
import { getCouponDiscount, getShippingForCart, priceCartItems } from "@/lib/cartPricing";
import { Currency, currencyForCountry, detectCountryFromHeaders } from "@/lib/pricing";

function normalizeRequestedCurrency(value: unknown): Currency {
  return value === "INR" || value === "USD" || value === "EUR" ? value : "EUR";
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { items, currency: requestedCurrency, couponCode } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const country = detectCountryFromHeaders(req.headers);
    const currency = currencyForCountry(country, normalizeRequestedCurrency(requestedCurrency));
    const pricedCart = await priceCartItems(items, currency);
    const coupon = await getCouponDiscount(couponCode, pricedCart.subtotal);
    const shippingCost = getShippingForCart(pricedCart.subtotal, currency);
    const finalTotal = Number((pricedCart.subtotal - coupon.discount + shippingCost).toFixed(2));

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY as string,
      key_secret: process.env.RAZORPAY_API_SECRET as string,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(finalTotal * 100),
      currency,
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
      payment_capture: true,
    });

    return NextResponse.json({
      success: true,
      order,
      order_id: order.id,
      amount: finalTotal,
      currency: order.currency,
      subtotal: pricedCart.subtotal,
      discount: coupon.discount,
      couponCode: coupon.couponCode,
      shipping: shippingCost,
      pricedItems: pricedCart.items,
    });
  } catch (error) {
    console.error("Razorpay Create Order Error:", error);
    const message = error instanceof Error ? error.message : "Failed to create payment order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
