import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import connectDB from "@/lib/db";
import Upload from "@/lib/models/Upload";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Limit file size to 8MB
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 8MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename and add timestamp
    const cleanOriginal = file.name
      .replace(/[^a-zA-Z0-9.\-_]/g, "_")
      .toLowerCase();
    const uniqueName = `blog-${Date.now()}-${cleanOriginal}`;
    const contentType = file.type || "image/jpeg";

    // 1. Save to MongoDB (works seamlessly on Vercel serverless)
    try {
      await connectDB();
      await Upload.create({
        filename: uniqueName,
        contentType,
        data: buffer,
        size: file.size,
      });
    } catch (dbError) {
      console.error("Error saving upload to MongoDB:", dbError);
    }

    // 2. Also try writing to local disk if public/uploads is writable
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);
    } catch (fsError) {
      // Ignored on read-only serverless filesystems like Vercel
      console.warn("Local disk write skipped (likely read-only runtime):", (fsError as any)?.message);
    }

    // Return the persistent API URL path
    return NextResponse.json({
      success: true,
      url: `/api/uploads/${uniqueName}`,
    });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
