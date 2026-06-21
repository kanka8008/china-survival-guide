"use client";

import { useTranslations } from "next-intl";
import { Lightbulb, CheckCircle2, AlertTriangle, ShieldAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { ArticleFrontmatter, TocEntry } from "@/types/article";
import { MdxRenderer } from "./mdx-renderer";
import { TableOfContents } from "./table-of-contents";
import { FreshnessNotice } from "./freshness-notice";

interface ArticleTemplateProps {
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: number;
  tableOfContents: TocEntry[];
  locale?: string;
}

export function ArticleTemplate({
  frontmatter,
  content,
  readingTime,
  tableOfContents,
  locale = "en",
}: ArticleTemplateProps) {
  const t = useTranslations();

  const pitfallsMatch = content.match(/##\s+Common Pitfalls?\s*\n([\s\S]*?)(?=\n##\s+Alternative|$)/i);
  const alternativesMatch = content.match(/##\s+Alternative Options?\s*\n([\s\S]*?)$/i);

  let mainContent = content;
  if (pitfallsMatch) mainContent = mainContent.replace(pitfallsMatch[0], "");
  if (alternativesMatch) mainContent = mainContent.replace(alternativesMatch[0], "");

  function resolveImageSrc(image: string | undefined): string | null {
    if (!image) return null;
    if (image.startsWith("http") || image.startsWith("/")) return image;
    return `/images/articles/${image}`;
  }
  const heroSrc = resolveImageSrc(frontmatter.image);

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 sm:px-6 py-8">
      <article className="min-w-0 flex-1">
        {/* Header */}
        <header className="border-b border-border pb-8 mb-10">
          {frontmatter.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-semibold text-secondary tracking-wide uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {heroSrc && (
            <div className="mb-5 overflow-hidden rounded-xl">
              <img
                src={heroSrc}
                alt={frontmatter.title}
                width={1600}
                height={900}
                loading="eager"
                className="aspect-video max-h-[400px] w-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
            {frontmatter.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
            <span>{t("article.last_updated")}: {formatDate(frontmatter.lastUpdated, locale)}</span>
            <span className="text-border">·</span>
            <span>{frontmatter.targetAudience}</span>
            <span className="text-border">·</span>
            <span>{readingTime} min read</span>
          </div>
        </header>

        {/* Freshness notice */}
        <FreshnessNotice lastUpdated={frontmatter.lastUpdated} locale={locale} />

        {/* Module 3: One-Liner — HIGH CONTRAST */}
        {frontmatter.oneLiner && (
          <section className="alert-amber">
            <div className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 h-6 w-6 shrink-0 alert-icon" />
              <div>
                <h3 className="alert-title text-sm uppercase tracking-wider mb-2">{t("article.one_liner")}</h3>
                <p className="alert-text">{frontmatter.oneLiner}</p>
              </div>
            </div>
          </section>
        )}

        {/* Module 4: Prerequisites */}
        {frontmatter.prerequisites.length > 0 && (
          <section className="mt-10 section-accent">
            <h2 className="text-2xl font-extrabold text-foreground mb-5">{t("article.prerequisites")}</h2>
            <div className="bg-muted rounded-xl p-6 border border-border">
              <ul className="space-y-3">
                {frontmatter.prerequisites.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Module 5: Step-by-Step */}
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold text-foreground mb-6 section-accent">{t("article.step_by_step")}</h2>
          <div className="article-content">
            <MdxRenderer source={mainContent} />
          </div>
        </section>

        {/* Module 6: Common Pitfalls — HIGH CONTRAST */}
        {pitfallsMatch && (
          <section className="alert-orange">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 alert-icon" />
              <div className="min-w-0 flex-1">
                <h3 className="alert-title text-lg mb-3">Common Pitfalls</h3>
                <div className="alert-text"><MdxRenderer source={pitfallsMatch[0]} /></div>
              </div>
            </div>
          </section>
        )}

        {/* Module 7: Backup Plan — HIGH CONTRAST */}
        {alternativesMatch && (
          <section className="alert-blue">
            <div className="flex items-start gap-3">
              <Info className="mt-1 h-6 w-6 shrink-0 alert-icon" />
              <div className="min-w-0 flex-1">
                <h3 className="alert-title text-lg mb-3">{t("article.backup_plan")}</h3>
                <div className="alert-text"><MdxRenderer source={alternativesMatch[0]} /></div>
              </div>
            </div>
          </section>
        )}

        {/* Module 8: Red Line Warning — HIGH CONTRAST */}
        {frontmatter.redlineWarning && (
          <section className="red-line-box">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-700" />
              <div>
                <h3>{t("article.red_line")}</h3>
                <p className="alert-text">{frontmatter.redlineWarning}</p>
              </div>
            </div>
          </section>
        )}
      </article>

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24">
          <TableOfContents entries={tableOfContents} />
        </div>
      </aside>
    </div>
  );
}
