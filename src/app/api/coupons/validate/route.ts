import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Coupon from "@/lib/models/Coupon";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { code, total } = await req.json();

    if (!code || !total) {
      return NextResponse.json(
        { error: "Code and total are required" },
        { status: 400 }
      );
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase().trim(),
      isActive: true,
    });

    if (!coupon) {
      return NextResponse.json(
        { error: "Invalid or expired coupon code" },
        { status: 404 }
      );
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return NextResponse.json(
        { error: "Coupon is not valid at this time" },
        { status: 400 }
      );
    }

    if (coupon.maxUsage && coupon.usedCount >= coupon.maxUsage) {
      return NextResponse.json(
        { error: "Coupon usage limit has been reached" },
        { status: 400 }
      );
    }

    if (coupon.minPurchase && total < coupon.minPurchase) {
      return NextResponse.json(
        {
          error: `Minimum purchase of €${coupon.minPurchase.toFixed(2)} required for this coupon`,
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = (total * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }

    // Cap discount to order total
    discountAmount = Math.min(discountAmount, total);

    return NextResponse.json({
      success: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      finalTotal: parseFloat((total - discountAmount).toFixed(2)),
    });
  } catch (error) {
    console.error("Coupon Validate Error:", error);
    return NextResponse.json(
      { error: "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
