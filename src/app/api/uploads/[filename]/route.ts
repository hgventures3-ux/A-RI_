import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Upload from "@/lib/models/Upload";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;

    if (!filename) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Try finding in MongoDB first (reliable on Vercel & persistent)
    try {
      await connectDB();
      const upload = await Upload.findOne({ filename }).lean() as {
        contentType?: string;
        data?: Buffer | { buffer: ArrayBuffer };
      } | null;

      if (upload && upload.data) {
        const rawBuffer = Buffer.isBuffer(upload.data)
          ? upload.data
          : Buffer.from((upload.data as any).buffer || upload.data);

        const contentType = upload.contentType || "image/jpeg";

        return new NextResponse(rawBuffer, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch (dbErr) {
      console.warn("DB upload lookup failed, falling back to disk:", dbErr);
    }

    // Fallback: check local disk public/uploads
    try {
      const localPath = path.join(process.cwd(), "public", "uploads", filename);
      const fileBuffer = await readFile(localPath);
      const ext = path.extname(filename).toLowerCase();
      const mimeTypes: Record<string, string> = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
      };

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": mimeTypes[ext] || "application/octet-stream",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      // Local file not found
    }

    return new NextResponse("Image Not Found", { status: 404 });
  } catch (error) {
    console.error("GET /api/uploads error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
