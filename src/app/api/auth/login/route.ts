import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "aerisnacks-super-secret-key-change-in-production";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, rememberMe } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Determine expiration duration based on rememberMe
    const maxAgeInSeconds = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
    const expirationTimeStr = rememberMe ? "30d" : "24h";

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
      .setExpirationTime(expirationTimeStr)
      .sign(secret);

    // Response with user cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
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
      maxAge: maxAgeInSeconds,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
