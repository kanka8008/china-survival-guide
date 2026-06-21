import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import {
  PlaneTakeoff,
  Scan,
  Clock,
  Compass,
  AlertTriangle,
  PlaneLanding,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { getArticlesByStage } from "@/lib/articles";
import { STAGES } from "@/lib/constants";
import { ArticleCard } from "@/components/article/article-card";
import { generatePageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import type { Locale, Stage } from "@/types/article";

const STAGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  PlaneTakeoff,
  Scan,
  Clock,
  Compass,
  AlertTriangle,
  PlaneLanding,
};

const STAGE_BG: Record<Stage, string> = {
  "pre-entry": "bg-primary",
  "border-crossing": "bg-primary",
  "first-72-hours": "bg-primary",
  "daily-survival": "bg-primary",
  emergency: "bg-primary",
  departure: "bg-primary",
};

export function generateStaticParams() {
  return STAGES.map((stage) => ({ slug: stage.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const stageInfo = STAGES.find((s) => s.slug === slug);
  if (!stageInfo) return {};
  return generatePageMeta(t(stageInfo.titleKey), t(stageInfo.descriptionKey), locale as Locale, `/stages/${slug}`);
}

export default async function StageDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });

  const stageInfo = STAGES.find((s) => s.slug === slug);
  if (!stageInfo) {
    notFound();
  }

  const articles = await getArticlesByStage(stageInfo.id, locale as Locale);
  const Icon = STAGE_ICONS[stageInfo.icon];

  // Find prev/next stage
  const stageIndex = STAGES.findIndex((s) => s.slug === slug);
  const prevStage = stageIndex > 0 ? STAGES[stageIndex - 1] : null;
  const nextStage =
    stageIndex < STAGES.length - 1 ? STAGES[stageIndex + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-secondary transition-colors hover:text-foreground"
        >
          {t("nav.home")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        <Link
          href="/stages"
          className="text-secondary transition-colors hover:text-foreground"
        >
          {t("nav.stages")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-medium text-foreground">
          {t(stageInfo.titleKey)}
        </span>
      </div>

      {/* Stage Header */}
      <div className="mb-12">
        <div
          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${STAGE_BG[stageInfo.id]} text-primary-foreground`}
        >
          {Icon && <Icon className="h-8 w-8" />}
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(stageInfo.titleKey)}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-secondary">
          {t(stageInfo.descriptionKey)}
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>
            {articles.length} {articles.length === 1 ? "article" : "articles"}
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              stageLabel={t(stageInfo.titleKey)}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-secondary">
            No articles in this stage yet.
          </p>
        </div>
      )}

      {/* Prev/Next Stage Navigation */}
      <nav className="mt-14 grid grid-cols-2 gap-4">
        {prevStage ? (
          <Link
            href={`/stages/${prevStage.slug}`}
            className="card-standard group flex items-center gap-3"
          >
            <ChevronLeft className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            <div className="min-w-0">
              <span className="text-xs text-muted-foreground">Previous stage</span>
              <p className="mt-0.5 font-medium text-secondary group-hover:text-foreground">
                {t(prevStage.titleKey)}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextStage ? (
          <Link
            href={`/stages/${nextStage.slug}`}
            className="card-standard group flex items-center justify-end gap-3"
          >
            <div className="min-w-0 text-right">
              <span className="text-xs text-muted-foreground">Next stage</span>
              <p className="mt-0.5 font-medium text-secondary group-hover:text-foreground">
                {t(nextStage.titleKey)}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
