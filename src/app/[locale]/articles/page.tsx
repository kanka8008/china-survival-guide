import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { generatePageMeta } from "@/lib/seo";
import { ArrowLeft } from "lucide-react";
import { getAllArticles, getAllTags } from "@/lib/articles";
import { STAGES } from "@/lib/constants";
import { ArticleCard } from "@/components/article/article-card";
import type { Metadata } from "next";
import type { Locale, Stage } from "@/types/article";

const STAGE_DOT_COLORS: Record<Stage, string> = {
  "pre-entry": "bg-blue-500",
  "border-crossing": "bg-violet-500",
  "first-72-hours": "bg-emerald-500",
  "daily-survival": "bg-amber-500",
  emergency: "bg-red-500",
  departure: "bg-cyan-500",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return generatePageMeta(t("article.all_articles"), "Browse all articles", locale as Locale, "/articles");
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const allArticles = await getAllArticles(locale as Locale);
  const allTags = await getAllTags(locale as Locale);

  const articlesByStage = new Map<Stage, typeof allArticles>();
  for (const stage of STAGES) {
    const stageArticles = allArticles.filter(
      (a) => a.frontmatter.stage === stage.id,
    );
    if (stageArticles.length > 0) {
      articlesByStage.set(stage.id, stageArticles);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <Link href="/" className="mb-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground no-underline">
          <ArrowLeft className="mr-1 h-4 w-4" />{t("nav.home")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("article.all_articles")}</h1>
        <p className="mt-2 text-secondary">{allArticles.length} {allArticles.length === 1 ? "article" : "articles"}</p>
      </div>

      {allTags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="inline-flex items-center rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-secondary hover:bg-zinc-200 transition-colors no-underline">
              {tag}
            </Link>
          ))}
        </div>
      )}

      {[...articlesByStage.entries()].map(([stageId, stageArticles]) => {
        const stageInfo = STAGES.find((s) => s.id === stageId);
        if (!stageInfo) return null;
        return (
          <section key={stageId} className="mb-14">
            <div className="mb-6 flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${STAGE_DOT_COLORS[stageId]}`} />
              <h2 className="text-xl font-semibold text-foreground">{t(stageInfo.titleKey)}</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-secondary">{stageArticles.length}</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stageArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  stageLabel={t(stageInfo.titleKey)}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        );
      })}

      {allArticles.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-secondary">{t("search.no_results")}</p>
        </div>
      )}
    </div>
  );
}
