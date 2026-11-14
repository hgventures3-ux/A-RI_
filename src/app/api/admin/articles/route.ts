import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Article from "@/lib/models/Article";
import { initialArticles } from "@/lib/journalData";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    // Fetch single article by slug or id (for Edit view)
    if (slug || id) {
      let article = null;
      if (id) {
        article = await Article.findById(id).lean();
      } else if (slug) {
        article = await Article.findOne({ slug, status: { $ne: "Deleted" } }).lean();
      }

      if (article) {
        return NextResponse.json({
          success: true,
          article,
          isStatic: false,
        });
      }

      // Check if it's one of the initial static articles
      if (slug) {
        const staticArt = initialArticles.find((a) => a.slug === slug);
        if (staticArt) {
          // Check if it was marked as deleted
          const isDeleted = await Article.findOne({ slug, status: "Deleted" }).lean();
          if (!isDeleted) {
            return NextResponse.json({
              success: true,
              article: {
                ...staticArt,
                status: "Published",
                isStatic: true,
              },
              isStatic: true,
            });
          }
        }
      }

      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    // List all articles
    const dbArticles = await Article.find({ status: { $ne: "Deleted" } })
      .sort({ createdAt: -1 })
      .lean();

    // Find any deleted slugs (including deleted static articles)
    const deletedDocs = await Article.find({ status: "Deleted" }).select("slug").lean();
    const deletedSlugs = new Set(deletedDocs.map((d: any) => d.slug));

    const dbSlugs = new Set(dbArticles.map((d: any) => d.slug));
    const activeStatic = initialArticles.filter(
      (a) => !deletedSlugs.has(a.slug) && !dbSlugs.has(a.slug)
    );

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
    const date =
      body.date ||
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    // Format paragraphs
    let paragraphs: string[] = [];
    if (Array.isArray(body.paragraphs)) {
      paragraphs = body.paragraphs
        .map((p: any) => String(p).trim())
        .filter((p: string) => p.length > 0);
    } else if (typeof body.content === "string") {
      paragraphs = body.content
        .split("\n\n")
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0);
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Article title is required" },
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

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const originalSlug = (body.originalSlug || body.slug || "").trim().toLowerCase();
    const articleId = body.id || body._id;

    const title = (body.title || "").trim();
    let newSlug = (body.slug || originalSlug).trim().toLowerCase();
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
      paragraphs = body.paragraphs
        .map((p: any) => String(p).trim())
        .filter((p: string) => p.length > 0);
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

    if (!newSlug) {
      newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Check if new slug conflicts with another article
    if (articleId) {
      const conflict = await Article.findOne({
        _id: { $ne: articleId },
        slug: newSlug,
        status: { $ne: "Deleted" },
      });
      if (conflict) {
        return NextResponse.json(
          { success: false, error: `Slug "${newSlug}" is already in use by another article` },
          { status: 400 }
        );
      }

      const updated = await Article.findByIdAndUpdate(
        articleId,
        {
          title,
          slug: newSlug,
          subtitle,
          summary: subtitle,
          author,
          image,
          date,
          metaTitle,
          metaDescription,
          paragraphs,
          status,
        },
        { new: true }
      );

      return NextResponse.json({
        success: true,
        message: "Article updated successfully",
        article: updated,
      });
    }

    // Try finding by originalSlug
    let article = await Article.findOne({ slug: originalSlug });
    if (!article && originalSlug !== newSlug) {
      article = await Article.findOne({ slug: newSlug });
    }

    if (article) {
      article.title = title;
      article.slug = newSlug;
      article.subtitle = subtitle;
      article.summary = subtitle;
      article.author = author;
      article.image = image;
      article.date = date;
      article.metaTitle = metaTitle;
      article.metaDescription = metaDescription;
      article.paragraphs = paragraphs;
      article.status = status;
      await article.save();

      return NextResponse.json({
        success: true,
        message: "Article updated successfully",
        article,
      });
    }

    // If not found in DB (e.g. static article being edited for first time)
    const newDoc = await Article.create({
      slug: newSlug,
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

    return NextResponse.json({
      success: true,
      message: "Article saved and updated successfully",
      article: newDoc,
    });
  } catch (error: any) {
    console.error("PUT /api/admin/articles error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update article" },
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
