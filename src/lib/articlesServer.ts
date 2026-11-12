import connectDB from "@/lib/db";
import Article from "@/lib/models/Article";
import { initialArticles, JournalArticle } from "@/lib/journalData";

export async function getAllArticles(): Promise<JournalArticle[]> {
  try {
    await connectDB();
    const dbDocs = await Article.find({ status: "Published" }).sort({ createdAt: -1 }).lean();
    
    // Find any deleted slugs (including deleted static articles)
    const deletedDocs = await Article.find({ status: "Deleted" }).select("slug").lean();
    const deletedSlugs = new Set(deletedDocs.map((d: any) => d.slug));

    const dbArticles: JournalArticle[] = dbDocs.map((doc: any) => ({
      slug: doc.slug,
      title: doc.title,
      subtitle: doc.subtitle || "",
      date: doc.date || new Date(doc.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: doc.author || "AÉRI Team",
      image: doc.image || "/hero-makhana-bag.webp",
      summary: doc.summary || doc.subtitle || "",
      metaTitle: doc.metaTitle || doc.title,
      metaDescription: doc.metaDescription || doc.subtitle || "",
      paragraphs: Array.isArray(doc.paragraphs) ? doc.paragraphs : [],
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
    const doc: any = await Article.findOne({ slug }).lean();
    if (doc) {
      if (doc.status === "Deleted") return null;
      return {
        slug: doc.slug,
        title: doc.title,
        subtitle: doc.subtitle || "",
        date: doc.date || new Date(doc.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        author: doc.author || "AÉRI Team",
        image: doc.image || "/hero-makhana-bag.webp",
        summary: doc.summary || doc.subtitle || "",
        metaTitle: doc.metaTitle || doc.title,
        metaDescription: doc.metaDescription || doc.subtitle || "",
        paragraphs: Array.isArray(doc.paragraphs) ? doc.paragraphs : [],
      };
    }
  } catch (error) {
    console.error(`Failed to load article [${slug}] from DB:`, error);
  }

  return initialArticles.find((a) => a.slug === slug) || null;
}
