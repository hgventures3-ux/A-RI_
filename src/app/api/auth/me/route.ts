import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";

const JWT_SECRET = process.env.JWT_SECRET || "aerisnacks-super-secret-key-change-in-production";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT
    let payload;
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const verified = await jwtVerify(token, secret);
      payload = verified.payload;
    } catch (err) {
      console.error("JWT Verification inside /api/auth/me failed:", err);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Find User
    const user = await User.findById(payload.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find orders belonging to user's email
    const orders = await Order.find({ "customer.email": user.email }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        city: user.city || "",
        createdAt: user.createdAt,
      },
      orders,
    });
  } catch (error) {
    console.error("Me API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
