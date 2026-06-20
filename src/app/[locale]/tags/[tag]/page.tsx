import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Hash } from "lucide-react";
import type { Metadata } from "next";
import { getAllArticles, getAllTags, getArticlesByTag } from "@/lib/articles";
import { SITE_NAME } from "@/lib/constants";
import { ArticleCard } from "@/components/article/article-card";
import type { Locale } from "@/types/article";

interface Props {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "zh", "es", "it", "de", "ru"] as const;
  const params: { locale: string; tag: string }[] = [];

  for (const locale of locales) {
    const tags = await getAllTags(locale);
    for (const tag of tags) {
      params.push({ locale, tag });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `#${decodedTag} Articles | ${SITE_NAME}`,
    description: `Browse all articles tagged with #${decodedTag} in the China Survival Guide.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const t = await getTranslations({ locale });
  const articles = await getArticlesByTag(decodedTag, locale as Locale);
  const allTags = await getAllTags(locale as Locale);

  const otherTags = allTags.filter((t) => t !== decodedTag);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/articles"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {t("article.all_articles")}
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <Hash className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {decodedTag}
            </h1>
            <p className="mt-0.5 text-secondary dark:text-zinc-400">
              {articles.length}{" "}
              {articles.length === 1 ? "article" : "articles"}
            </p>
          </div>
        </div>
      </div>

      {/* Related Tags */}
      {otherTags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {otherTags.map((relatedTag) => (
            <Link
              key={relatedTag}
              href={`/tags/${encodeURIComponent(relatedTag)}`}
              className="inline-flex items-center rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              {relatedTag}
            </Link>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              stageLabel={t(`stages.${article.frontmatter.stage.replace(/-/g, "_")}.title`)}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-secondary dark:text-zinc-400">
            {t("search.no_results")}
          </p>
        </div>
      )}
    </div>
  );
}
