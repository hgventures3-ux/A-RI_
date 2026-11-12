import connectDB from "@/lib/db";
import Article from "@/lib/models/Article";
import { initialArticles, JournalArticle } from "@/lib/journalData";

export async function getAllArticles(): Promise<JournalArticle[]> {
  try {
    await connectDB();
    const dbDocs = await Article.find({ status: "Published" }).sort({ createdAt: -1 }).lean();
    
    // Find any deleted slugs (including deleted static articles)
    const deletedDocs = await Article.find({ status: "Deleted" }).select("slug").lean();
    const deletedSlugs = new Set(deletedDocs.map((d: Record<string, unknown>) => String(d.slug || "")));

    const dbArticles: JournalArticle[] = dbDocs.map((doc: Record<string, unknown>) => ({
      slug: String(doc.slug || ""),
      title: String(doc.title || ""),
      subtitle: String(doc.subtitle || ""),
      date: String(doc.date || (doc.createdAt ? new Date(String(doc.createdAt)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "")),
      author: String(doc.author || "AÉRI Team"),
      image: String(doc.image || "/hero-makhana-bag.webp"),
      summary: String(doc.summary || doc.subtitle || ""),
      metaTitle: String(doc.metaTitle || doc.title || ""),
      metaDescription: String(doc.metaDescription || doc.subtitle || ""),
      paragraphs: Array.isArray(doc.paragraphs) ? (doc.paragraphs as string[]) : [],
    }));

    const existingSlugs = new Set([...dbArticles.map((a) => a.slug), ...deletedSlugs]);
    const staticFiltered = initialArticles.filter((a) => !existingSlugs.has(a.slug));
    
    return [...dbArticles, ...staticFiltered];
  } catch (error) {
    console.error("Failed to load articles from DB:", error);
    return initialArticles;
  }
}

export async function getArticleBySlug(slug: string): Promise<JournalArticle | null> {
  try {
    await connectDB();
    const doc = (await Article.findOne({ slug }).lean()) as Record<string, unknown> | null;
    if (doc) {
      if (doc.status === "Deleted") return null;
      return {
        slug: String(doc.slug || ""),
        title: String(doc.title || ""),
        subtitle: String(doc.subtitle || ""),
        date: String(doc.date || (doc.createdAt ? new Date(String(doc.createdAt)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "")),
        author: String(doc.author || "AÉRI Team"),
        image: String(doc.image || "/hero-makhana-bag.webp"),
        summary: String(doc.summary || doc.subtitle || ""),
        metaTitle: String(doc.metaTitle || doc.title || ""),
        metaDescription: String(doc.metaDescription || doc.subtitle || ""),
        paragraphs: Array.isArray(doc.paragraphs) ? (doc.paragraphs as string[]) : [],
      };
    }
  } catch (error) {
    console.error(`Failed to load article [${slug}] from DB:`, error);
  }

  return initialArticles.find((a) => a.slug === slug) || null;
}
