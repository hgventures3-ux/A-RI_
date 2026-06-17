import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: string;
  purpose: "Login" | "Signup" | "AdminLogin";
  createdAt: Date;
}

const OTPSchema = new Schema<IOTP>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["Login", "Signup", "AdminLogin"],
    default: "Login",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes TTL (Time-to-Live) automatically deletes the document
  },
});

const OTP: Model<IOTP> = mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);

export default OTP;
