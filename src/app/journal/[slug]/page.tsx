import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/articlesServer';
import { initialArticles } from '@/lib/journalData';
import JournalArticleClient from '@/components/JournalArticleClient';

export const dynamicParams = true;

export async function generateStaticParams() {
  return initialArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | AÉRI Makhana',
    };
  }

  return {
    title: `${article.metaTitle} | AÉRI`,
    description: article.metaDescription,
    openGraph: {
      title: `${article.metaTitle} | AÉRI`,
      description: article.metaDescription,
      url: `https://www.aerisnacks.com/journal/${article.slug}`,
      siteName: 'AÉRI Makhana',
      images: [
        {
          url: article.image || '/hero-makhana-bag.webp',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.metaTitle} | AÉRI`,
      description: article.metaDescription,
      images: [article.image || '/hero-makhana-bag.webp'],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <JournalArticleClient article={article} />;
}
