/**
 * Admin Seed Script — AERI Makhana
 * Run: node seed-admin.js
 * Seeds the first Super Admin account into MongoDB.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["Super Admin", "Admin", "Content Manager", "Order Manager"], default: "Super Admin" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    lastLogin: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function seedAdmin() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not found in .env.local");

    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected!");

    const email = process.env.ADMIN_EMAIL || "kriya@aerisnacks.com";
    const name = process.env.ADMIN_NAME || "Kriya Kanunga";
    const password = process.env.ADMIN_PASSWORD || "Kriya@1234";

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log(`⚠️  Admin already exists: ${email}`);
      console.log("   To reset password, delete and re-run this script.");
      await mongoose.disconnect();
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = new Admin({
      email,
      name,
      passwordHash,
      role: "Super Admin",
      status: "Active",
    });

    await admin.save();

    console.log("\n🎉 Admin seeded successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`   Name    : ${name}`);
    console.log(`   Email   : ${email}`);
    console.log(`   Role    : Super Admin`);
    console.log(`   Login at: /admin/login`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⚠️  Please change your password after first login!");

  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

seedAdmin();
