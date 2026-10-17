'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NewJournalArticlePage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  const [image, setImage] = useState('/hero-makhana-bag.webp');
  const [subtitle, setSubtitle] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [content, setContent] = useState('');
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const articleData = {
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      title: title.trim(),
      subtitle: subtitle.trim(),
      date: date.trim(),
      author: 'AÉRI Makhana',
      image: image.trim(),
      summary: subtitle.trim(),
      metaTitle: metaTitle.trim() || title.trim(),
      metaDescription: metaDescription.trim() || subtitle.trim(),
      paragraphs: content.split('\n\n').filter(p => p.trim().length > 0),
    };

    setGeneratedJson(JSON.stringify(articleData, null, 2));
  };

  const copyToClipboard = () => {
    if (generatedJson) {
      navigator.clipboard.writeText(generatedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-2"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Publish New Journal Article
            </h1>
            <p className="text-sm text-gray-600">
              Fill in the article details below to publish directly to the AÉRI Journal.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                  }
                }}
                placeholder="e.g. Sourcing Makhana Directly from Bihar"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  URL Address (Slug) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="bg-gray-100 px-3 py-2.5 rounded-l-lg border border-r-0 border-gray-300">
                    /journal/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="sourcing-makhana-bihar"
                    className="w-full border border-gray-300 rounded-r-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="October 17, 2026"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Image URL / Path
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/hero-makhana-bag.webp"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Summary / Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Two-line summary for cards and article header"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Page Title (SEO)
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="English title for Google search"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Meta Description (SEO)
                </label>
                <input
                  type="text"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="1-2 sentences for search snippet"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Article Text (separate paragraphs with blank lines) <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article text here. Press Enter twice between paragraphs..."
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C]"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] bg-[#1C1C1C] text-white font-semibold rounded-lg hover:bg-black transition-colors"
            >
              Generate Article Payload
            </button>
          </form>

          {generatedJson && (
            <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-[#1C1C1C]">Article Payload Generated</h3>
                <button
                  onClick={copyToClipboard}
                  type="button"
                  className="px-4 py-2 bg-[#1C1C1C] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="bg-[#FAF8F5] p-4 rounded-xl border border-gray-200 text-xs overflow-x-auto text-gray-800">
                {generatedJson}
              </pre>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
