import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllArticles } from "@/lib/articles";
import { STAGES } from "@/lib/constants";
import type { Locale, Stage } from "@/types/article";

const STAGE_NUMBER_COLORS: Record<Stage, string> = {
  "pre-entry": "bg-primary text-primary-foreground",
  "border-crossing": "bg-primary text-primary-foreground",
  "first-72-hours": "bg-primary text-primary-foreground",
  "daily-survival": "bg-primary text-primary-foreground",
  emergency: "bg-primary text-primary-foreground",
  departure: "bg-primary text-primary-foreground",
};

export default async function StagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const articles = await getAllArticles(locale as Locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("nav.stages")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary">
          {t("home.stages_subtitle")}
        </p>
      </div>

      {/* Stage Cards 1-6 */}
      <div className="mx-auto max-w-3xl space-y-4">
        {STAGES.map((stage, index) => {
          const stageArticles = articles.filter(
            (a) => a.frontmatter.stage === stage.id,
          );
          const sampleTitles = stageArticles
            .slice(0, 5)
            .map((a) => a.frontmatter.title);

          return (
            <Link
              key={stage.id}
              href={`/stages/${stage.slug}`}
              className="card-standard group flex items-center gap-5"
            >
              {/* Numbered Circle */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${STAGE_NUMBER_COLORS[stage.id]}`}
              >
                {index + 1}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {t(stage.titleKey)}
                </h3>
                <p className="mt-1 text-sm text-secondary">
                  {t(stage.descriptionKey)}
                </p>

                {/* Sample Article Titles */}
                {sampleTitles.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    {sampleTitles.map((title, i) => (
                      <span key={i}>
                        {title}
                        {i < sampleTitles.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow */}
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
