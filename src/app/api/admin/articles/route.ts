import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Article from "@/lib/models/Article";
import { initialArticles } from "@/lib/journalData";

export async function GET() {
  try {
    await connectDB();
    const dbArticles = await Article.find({ status: { $ne: "Deleted" } }).sort({ createdAt: -1 }).lean();
    
    // Find any deleted slugs (including deleted static articles)
    const deletedDocs = await Article.find({ status: "Deleted" }).select("slug").lean();
    const deletedSlugs = new Set(deletedDocs.map((d: any) => d.slug));
    
    const dbSlugs = new Set(dbArticles.map((d: any) => d.slug));
    const activeStatic = initialArticles.filter((a) => !deletedSlugs.has(a.slug) && !dbSlugs.has(a.slug));

    return NextResponse.json({
      success: true,
      articles: dbArticles,
      staticArticles: activeStatic,
    });
  } catch (error: any) {
    console.error("GET /api/admin/articles error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const title = (body.title || "").trim();
    let slug = (body.slug || "").trim().toLowerCase();
    const subtitle = (body.subtitle || body.summary || "").trim();
    const author = (body.author || "AÉRI Team").trim();
    const image = (body.image || "/hero-makhana-bag.webp").trim();
    const metaTitle = (body.metaTitle || title).trim();
    const metaDescription = (body.metaDescription || subtitle).trim();
    const status = body.status === "Draft" ? "Draft" : "Published";
    const date = body.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    // Format paragraphs
    let paragraphs: string[] = [];
    if (Array.isArray(body.paragraphs)) {
      paragraphs = body.paragraphs.map((p: any) => String(p).trim()).filter((p: string) => p.length > 0);
    } else if (typeof body.content === "string") {
      paragraphs = body.content
        .split("\n\n")
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0);
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }

    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Check if slug already exists
    const existing = await Article.findOne({ slug });
    if (existing) {
      existing.title = title;
      existing.subtitle = subtitle;
      existing.summary = subtitle;
      existing.author = author;
      existing.image = image;
      existing.date = date;
      existing.metaTitle = metaTitle;
      existing.metaDescription = metaDescription;
      existing.paragraphs = paragraphs;
      existing.status = status;
      await existing.save();

      return NextResponse.json({
        success: true,
        message: "Article updated successfully",
        article: existing,
      });
    }

    const newArticle = await Article.create({
      slug,
      title,
      subtitle,
      summary: subtitle,
      date,
      author,
      image,
      metaTitle,
      metaDescription,
      paragraphs,
      status,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Article published successfully",
        article: newArticle,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/admin/articles error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    if (!slug && !id) {
      return NextResponse.json(
        { success: false, error: "Slug or ID is required" },
        { status: 400 }
      );
    }

    if (id) {
      await Article.findByIdAndUpdate(id, { $set: { status: "Deleted" } });
    } else if (slug) {
      const existing = await Article.findOne({ slug });
      if (existing) {
        existing.status = "Deleted";
        await existing.save();
      } else {
        // Static article being deleted: mark as Deleted in DB
        await Article.create({
          slug,
          title: slug,
          status: "Deleted",
          paragraphs: [],
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/admin/articles error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete article" },
      { status: 500 }
    );
  }
}
