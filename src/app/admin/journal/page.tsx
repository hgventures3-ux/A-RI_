"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Eye, Trash2, BookOpen, ExternalLink, RefreshCw, AlertTriangle, Loader2, Edit3 } from "lucide-react";
import SkeletonLoader from "@/components/admin/SkeletonLoader";
import toast from "react-hot-toast";

type ArticleItem = {
  _id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  date?: string;
  author?: string;
  image?: string;
  status?: string;
  isStatic?: boolean;
};

export default function AdminJournalPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [articleToDelete, setArticleToDelete] = useState<ArticleItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/articles")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!ignore && data) {
          const dbList = (data.articles || []).map((a: ArticleItem) => ({ ...a, isStatic: false }));
          const staticList = (data.staticArticles || []).map((a: ArticleItem) => ({
            slug: a.slug,
            title: a.title,
            subtitle: a.subtitle,
            date: a.date,
            author: a.author,
            image: a.image,
            status: "Published" as const,
            isStatic: true,
          }));

          const dbSlugs = new Set(dbList.map((d: ArticleItem) => d.slug));
          const filteredStatic = staticList.filter((s: ArticleItem) => !dbSlugs.has(s.slug));

          setArticles([...dbList, ...filteredStatic]);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          toast.error("Failed to load blog articles");
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [refreshIndex]);

  const refreshArticles = () => {
    setLoading(true);
    setRefreshIndex((prev) => prev + 1);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;

    setIsDeleting(true);
    try {
      const query = articleToDelete._id
        ? `id=${articleToDelete._id}`
        : `slug=${articleToDelete.slug}`;
      const res = await fetch(`/api/admin/articles?${query}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`"${articleToDelete.title}" deleted successfully`);
        setArticleToDelete(null);
        refreshArticles();
      } else {
        toast.error(data.error || "Failed to delete article");
      }
    } catch {
      toast.error("Failed to delete article");
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase()) ||
      (a.author && a.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#1d1b1a]"
            style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
          >
            Blog &amp; Journal Management
          </h1>
          <p className="text-xs sm:text-sm text-[#4c463e]/70 mt-1">
            Create, manage, and delete articles published on the live AÉRI Journal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshArticles}
            className="p-2.5 rounded-xl border border-[#e8e0d8] bg-white text-[#4c463e] hover:bg-[#f5ede3] transition-colors"
            title="Refresh articles"
          >
            <RefreshCw size={16} />
          </button>

          <Link
            href="/admin/journal/new"
            className="bg-[#1d1b1a] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#383330] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> Post New Blog
          </Link>
        </div>
      </div>

      {/* Search and Stats bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e8e0d8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[#e8e0d8] focus:outline-none focus:border-[#1d1b1a]"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 w-full sm:w-auto justify-end">
          <span>Total Articles: <strong>{articles.length}</strong></span>
          <span>Published: <strong>{articles.filter((a) => a.status === "Published").length}</strong></span>
          <Link
            href="/journal"
            target="_blank"
            className="text-[#1d1b1a] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            View Live Journal <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <SkeletonLoader type="card" />
          <SkeletonLoader type="card" />
          <SkeletonLoader type="card" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-[#e8e0d8]">
          <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-base font-bold text-gray-700">No blog articles found</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            {search ? "No articles matched your search." : "Ready to publish a new blog to drive traffic?"}
          </p>
          <Link
            href="/admin/journal/new"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1d1b1a] text-white text-xs font-semibold hover:bg-black"
          >
            <Plus size={14} /> Write First Article
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.slug}
              className="bg-white rounded-2xl border border-[#e8e0d8] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[16/10] bg-[#f5ede3]">
                  <Image
                    src={item.image || "/hero-makhana-bag.webp"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === "Published"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {item.status || "Published"}
                    </span>
                    {item.isStatic && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                        Built-in Guide
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    {item.date || "Recent"} · By {item.author || "AÉRI Team"}
                  </p>
                  <h3 className="text-sm font-bold text-[#1d1b1a] line-clamp-2 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-normal">
                    {item.subtitle || "No summary provided."}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-3 flex items-center justify-between border-t border-gray-100 mt-2 bg-gray-50/50 rounded-b-2xl">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/journal/edit/${item.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1d1b1a] text-white hover:bg-[#383330] text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Edit3 size={13} /> Edit
                  </Link>

                  <Link
                    href={`/journal/${item.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#e8e0d8] bg-white text-gray-700 hover:bg-gray-100 text-xs font-medium transition-colors"
                    title="View live article"
                  >
                    <Eye size={13} /> View
                  </Link>
                </div>

                <button
                  onClick={() => setArticleToDelete(item)}
                  className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 text-xs font-medium"
                  title="Delete article"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-bold text-[#1d1b1a] mb-2">
              Delete Blog Article?
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed font-normal">
              Are you sure you want to delete <strong>&ldquo;{articleToDelete.title}&rdquo;</strong>?
              This will remove the article from the live website and journal catalog.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={14} /> Yes, Delete Article
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
