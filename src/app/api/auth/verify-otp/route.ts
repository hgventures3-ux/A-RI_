import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "@/lib/db";
import OTP from "@/lib/models/OTP";
import User from "@/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "aerisnacks-super-secret-key-change-in-production";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, otp, purpose, name, rememberMe } = body;

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();
    const otpPurpose = purpose || "Login";

    // 1. Validate OTP
    const validOtp = await OTP.findOne({
      email: emailLower,
      otp: otp,
      purpose: otpPurpose,
    });

    if (!validOtp) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // 2. Process User
    let user = await User.findOne({ email: emailLower });

    if (otpPurpose === "Signup") {
      if (user) {
        return NextResponse.json({ error: "User already exists. Please login instead." }, { status: 400 });
      }
      if (!name) {
        return NextResponse.json({ error: "Name is required for signup" }, { status: 400 });
      }
      // Create new user
      user = new User({
        name,
        email: emailLower,
      });
      await user.save();
    } else {
      // Login or ForgotPassword (which just logs them in since passwordless)
      if (!user) {
        return NextResponse.json({ error: "No account found with this email. Please sign up." }, { status: 404 });
      }
    }

    // 3. Issue JWT Token
    const maxAgeInSeconds = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
    const expirationTimeStr = rememberMe ? "30d" : "24h";

    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({
      sub: user._id.toString(),
      email: user.email,
      role: "User",
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expirationTimeStr)
      .sign(secret);

    // 4. Delete the OTP after successful verification
    await OTP.deleteMany({ email: emailLower });

    // 5. Respond with Cookie
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
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
  } catch (error: any) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
