"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload, Save, Globe, Eye, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminEditJournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slugParam = resolvedParams.slug;

  const [loading, setLoading] = useState(true);
  const [articleId, setArticleId] = useState<string>("");
  const [originalSlug, setOriginalSlug] = useState<string>("");
  const [isStatic, setIsStatic] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("AÉRI Team");
  const [image, setImage] = useState("/hero-makhana-bag.webp");
  const [subtitle, setSubtitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"Published" | "Draft">("Published");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function loadArticle() {
      try {
        const res = await fetch(`/api/admin/articles?slug=${encodeURIComponent(slugParam)}`);
        const data = await res.json();

        if (!ignore) {
          if (res.ok && data.success && data.article) {
            const a = data.article;
            setArticleId(a._id || "");
            setOriginalSlug(a.slug || slugParam);
            setIsStatic(Boolean(data.isStatic));

            setTitle(a.title || "");
            setSlug(a.slug || slugParam);
            setDate(a.date || "");
            setAuthor(a.author || "AÉRI Team");
            setImage(a.image || "/hero-makhana-bag.webp");
            setSubtitle(a.subtitle || a.summary || "");
            setMetaTitle(a.metaTitle || a.title || "");
            setMetaDescription(a.metaDescription || a.subtitle || "");
            setStatus(a.status === "Draft" ? "Draft" : "Published");

            // Format paragraphs back into multi-line content
            if (Array.isArray(a.paragraphs) && a.paragraphs.length > 0) {
              setContent(a.paragraphs.join("\n\n"));
            } else if (typeof a.content === "string") {
              setContent(a.content);
            }
          } else {
            toast.error(data.error || "Article not found");
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load article:", err);
        if (!ignore) {
          toast.error("Failed to load article data");
          setLoading(false);
        }
      }
    }

    loadArticle();
    return () => {
      ignore = true;
    };
  }, [slugParam]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
        toast.success("Cover image uploaded successfully!");
      } else {
        toast.error(data.error || "Failed to upload image");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please enter article title and content");
      return;
    }

    setIsSaving(true);

    try {
      const cleanSlug = (slug || title)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const payload = {
        id: articleId || undefined,
        originalSlug,
        title: title.trim(),
        slug: cleanSlug,
        subtitle: subtitle.trim(),
        date: date.trim(),
        author: author.trim(),
        image: image.trim(),
        summary: subtitle.trim(),
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || subtitle.trim(),
        content: content.trim(),
        status,
      };

      const res = await fetch("/api/admin/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Blog article updated successfully!");
        router.push("/admin/journal");
        router.refresh();
      } else {
        toast.error(data.error || "Failed to update article");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update article");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <Loader2 size={32} className="animate-spin text-[#1d1b1a]" />
        <p className="text-sm text-gray-500 font-medium">Loading article details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/journal"
            className="p-2 rounded-xl bg-white border border-[#e8e0d8] text-[#4c463e] hover:bg-[#f5ede3] transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#1d1b1a]"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Edit Blog Article
              </h1>
              {isStatic && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  Built-in Guide
                </span>
              )}
            </div>
            <p className="text-xs text-[#4c463e]/70 mt-0.5">
              Make changes and update the live blog post on AÉRI.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/journal/${originalSlug}`}
            target="_blank"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-white border border-[#e8e0d8] text-[#1d1b1a] hover:bg-[#f5ede3] transition-colors inline-flex items-center gap-1.5"
          >
            <Eye size={14} /> View Live Article
          </Link>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e0d8] shadow-sm space-y-6"
      >
        <div>
          <label className="block text-xs font-bold text-[#1d1b1a] uppercase tracking-wider mb-2">
            Article Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Health Benefits of Roasted Fox Nuts (Phool Makhana)"
            className="w-full border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm text-[#1d1b1a] bg-white focus:outline-none focus:border-[#1d1b1a]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1d1b1a] uppercase tracking-wider mb-2">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center text-xs">
              <span className="bg-[#f5ede3] px-3 py-3 rounded-l-xl border border-r-0 border-[#e8e0d8] text-[#4c463e] font-mono">
                /journal/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="health-benefits-makhana"
                className="w-full border border-[#e8e0d8] rounded-r-xl px-3 py-3 text-xs text-[#1d1b1a] font-mono focus:outline-none focus:border-[#1d1b1a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1d1b1a] uppercase tracking-wider mb-2">
              Publication Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm text-[#1d1b1a] bg-white focus:outline-none focus:border-[#1d1b1a]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1d1b1a] uppercase tracking-wider mb-2">
              Author Name
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="AÉRI Team"
              className="w-full border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm text-[#1d1b1a] bg-white focus:outline-none focus:border-[#1d1b1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1d1b1a] uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Published" | "Draft")}
              className="w-full border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm text-[#1d1b1a] bg-white focus:outline-none focus:border-[#1d1b1a]"
            >
              <option value="Published">Published (Live on Website)</option>
              <option value="Draft">Draft (Hidden)</option>
            </select>
          </div>
        </div>

        {/* Cover Image Upload & Preview */}
        <div className="bg-[#f5ede3]/40 p-5 rounded-xl border border-[#e8e0d8]">
          <label className="block text-xs font-bold text-[#1d1b1a] uppercase tracking-wider mb-2">
            Cover Image
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-200 border border-gray-300 shrink-0">
              <Image
                src={image || "/hero-makhana-bag.webp"}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#1d1b1a] text-white text-xs font-semibold rounded-lg hover:bg-[#383330] transition-colors">
                  <Upload size={14} />
                  {uploadingImage ? "Uploading..." : "Upload New Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
                <span className="text-xs text-gray-400">or edit URL below:</span>
              </div>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/hero-makhana-bag.webp"
                className="w-full border border-[#e8e0d8] rounded-lg px-3 py-2 text-xs text-[#1d1b1a] bg-white focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Subtitle / Summary */}
        <div>
          <label className="block text-xs font-bold text-[#1d1b1a] uppercase tracking-wider mb-2">
            Summary / Subtitle <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={2}
            required
            value={subtitle}
            onChange={(e) => {
              setSubtitle(e.target.value);
              if (!metaDescription) setMetaDescription(e.target.value);
            }}
            placeholder="A short 1-2 sentence preview for search results and article cards..."
            className="w-full border border-[#e8e0d8] rounded-xl px-4 py-2.5 text-sm text-[#1d1b1a] bg-white focus:outline-none focus:border-[#1d1b1a]"
          />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-[#1d1b1a] uppercase tracking-wider">
              Article Content <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-[#4c463e]/60">
              Press <strong>Enter twice</strong> between paragraphs
            </span>
          </div>
          <textarea
            required
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste or write your full blog content here..."
            className="w-full border border-[#e8e0d8] rounded-xl p-4 text-sm text-[#1d1b1a] bg-white focus:outline-none focus:border-[#1d1b1a] leading-relaxed font-normal"
          />
        </div>

        {/* SEO Metadata */}
        <div className="bg-[#f5ede3]/40 p-5 rounded-xl border border-[#e8e0d8] space-y-3">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-[#4c463e]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d1b1a]">
              SEO &amp; Google Snippet
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Google Title | AÉRI"
                className="w-full border border-[#e8e0d8] rounded-lg px-3 py-2 text-xs text-[#1d1b1a] bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                Meta Description
              </label>
              <input
                type="text"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Google Description Snippet..."
                className="w-full border border-[#e8e0d8] rounded-lg px-3 py-2 text-xs text-[#1d1b1a] bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between">
          <Link
            href="/admin/journal"
            className="text-xs font-semibold text-gray-500 hover:text-black transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#1d1b1a] text-white text-xs font-bold rounded-xl hover:bg-[#383330] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save size={14} />
            {isSaving ? "Saving Updates..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
