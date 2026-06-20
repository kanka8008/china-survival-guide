import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles, getRelatedArticles, getAdjacentStage } from "@/lib/articles";
import { generateArticleMeta } from "@/lib/seo";
import { ArticleTemplate } from "@/components/article/article-template";
import { ArticleCard } from "@/components/article/article-card";
import { AdSlot } from "@/components/ads/ad-slot";
import { Comments } from "@/components/comments/comments";
import { TableOfContents } from "@/components/article/table-of-contents";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LOCALES } from "@/types/article";
import type { Locale } from "@/types/article";
import { ShareButton } from "@/components/article/share-button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

interface ArticlePageProps { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    const articles = await getAllArticles(locale as Locale);
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const article = await getArticleBySlug(slug, locale);
  if (!article) return {};
  return generateArticleMeta(article, locale);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const article = await getArticleBySlug(slug, locale);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "article" });
  const commonT = await getTranslations({ locale });
  const related = await getRelatedArticles(article, locale, 3);
  const adjacent = await getAdjacentStage(article, locale);

  const stageName = article.frontmatter.stage.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
            <span>/</span>
            <Link href="/stages" className="hover:text-foreground transition-colors no-underline">Stages</Link>
            <span>/</span>
            <Link href={`/stages/${article.frontmatter.stage}`} className="hover:text-foreground transition-colors no-underline">{stageName}</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.frontmatter.title}</span>
          </nav>

          <ArticleTemplate
            frontmatter={article.frontmatter}
            content={article.content}
            readingTime={article.readingTime}
            tableOfContents={article.tableOfContents}
            locale={locale}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-8 border-t border-border">
            <ShareButton label={t("share")} />
            <div className="flex items-center gap-4">
              {adjacent.prev && <Link href={`/articles/${adjacent.prev.slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"><ArrowLeft className="w-4 h-4" /> {t("prev_stage")}</Link>}
              {adjacent.next && <Link href={`/articles/${adjacent.next.slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline">{t("next_stage")} <ArrowRight className="w-4 h-4" /></Link>}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("related_articles")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <ArticleCard
                    key={r.slug}
                    article={r}
                    stageLabel={commonT(`stages.${r.frontmatter.stage.replace(/-/g, "_")}.title`)}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12"><AdSlot /></div>
          <div className="mt-12"><Comments /></div>
        </div>

        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24"><TableOfContents entries={article.tableOfContents} /></div>
        </aside>
      </div>
    </div>
  );
}
