import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY as string,
      key_secret: process.env.RAZORPAY_API_SECRET as string,
    });

    const options = {
      amount: Math.round(amount * 100), // Amount in smallest unit (paise or cents)
      currency: "EUR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Create Order Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
