import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "aerisnacks-super-secret-key-change-in-production";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password, phone, countryCode, city } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      countryCode: countryCode || "+33",
      city: city || "",
      passwordHash,
    });

    await user.save();

    // Generate JWT token
    const secret = new TextEncoder().encode(JWT_SECRET);
    const alg = "HS256";

    const token = await new SignJWT({
      sub: user._id.toString(),
      email: user.email,
      role: "User",
      name: user.name,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);

    // Response with user cookie
    const response = NextResponse.json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });

    response.cookies.set({
      name: "user_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
