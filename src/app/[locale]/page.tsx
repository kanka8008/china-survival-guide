import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { STAGES, QUICK_TOOLS } from "@/lib/constants";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article/article-card";
import { generatePageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import type { Locale } from "@/types/article";
import { PlaneTakeoff, Scan, Clock, Compass, AlertTriangle, PlaneLanding, ArrowRight, Globe, Ban, Phone, Route, ExternalLink } from "lucide-react";

const STAGE_ICONS: Record<string, React.ComponentType<{className?: string}>> = { PlaneTakeoff, Scan, Clock, Compass, AlertTriangle, PlaneLanding };
const TOOL_ICONS: Record<string, React.ComponentType<{className?: string}>> = { Globe, Ban, Phone, Route };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return generatePageMeta(t("hero_title"), t("hero_subtitle"), locale as Locale, "/");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const stageT = await getTranslations({ locale });
  const articles = await getAllArticles(locale as Locale);
  const featured = articles.slice(0, 4);

  return (
    <div>
      {/* ===== HERO: Left text + Right glass stat cards ===== */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* Subtle deep gradient — no blue, just navy depths */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-primary to-slate-900 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hero-split py-24 sm:py-36">
            {/* Left column */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-6 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                {locale === "zh" ? "6大阶段 · 32篇实操指南" : "6 Stages · 32 Practical Guides"}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                {t("hero_title")}
              </h1>
              <p className="text-lg sm:text-xl text-white/75 leading-relaxed mb-8 max-w-lg">
                {t("hero_subtitle")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/stages" className="btn-hover inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl no-underline shadow-lg shadow-accent/25">
                  {t("hero_cta")} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/articles" className="btn-hover inline-flex items-center gap-2 px-6 py-3 text-white/80 font-medium rounded-xl no-underline hover:text-white hover:bg-white/5">
                  {locale === "zh" ? "浏览文章" : "Browse articles"} →
                </Link>
              </div>
            </div>
            {/* Right column: Glass stat pills */}
            <div className="hidden lg:flex flex-col gap-4 items-end justify-center animate-fade-in">
              {[
                { label: locale === "zh" ? "篇文章" : "Articles", value: "32" },
                { label: locale === "zh" ? "种语言" : "Languages", value: "6" },
                { label: locale === "zh" ? "大阶段" : "Stages", value: "6" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card min-w-[160px]">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIX STAGES: 2×3 grid ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 section-lg">
        <div className="mb-10">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {locale === "zh" ? "六个阶段" : "Six Stages"}
          </p>
          <h2 className="max-w-xl">{t("stages_title")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {STAGES.map((stage) => {
            const Icon = STAGE_ICONS[stage.icon] || Compass;
            const count = articles.filter((a) => a.frontmatter.stage === stage.id).length;
            return (
              <Link key={stage.id} href={`/stages/${stage.slug}`} className="card-standard flex items-start gap-4 no-underline">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: stage.color + "18" }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold group-hover:text-primary transition-colors mb-1 text-[0.9375rem]">{stageT(stage.titleKey)}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{stageT(stage.descriptionKey)}</p>
                  <p className="text-[0.6875rem] text-muted-foreground mt-2 font-medium">{count} {locale === "zh" ? "篇" : "articles"}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== FEATURED: 1 large + 3 small ===== */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 section-lg">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {locale === "zh" ? "精选文章" : "Featured"}
              </p>
              <h2>{t("featured_title")}</h2>
            </div>
            <Link href="/articles" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors no-underline">
              {locale === "zh" ? "全部文章" : "All articles"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="gallery-varied stagger-children">
            {featured.map((article, idx) => (
              <ArticleCard
                key={article.slug}
                article={article}
                featured={idx === 0}
                stageLabel={stageT(`stages.${article.frontmatter.stage.replace(/-/g, "_")}.title`)}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUICK TOOLS: horizontal icon strip ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 section-lg">
        <div className="mb-10">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {locale === "zh" ? "速查工具" : "Quick Tools"}
          </p>
          <h2 className="max-w-xl">{t("tools_title")}</h2>
        </div>
        <div className="flex flex-wrap gap-3 stagger-children">
          {QUICK_TOOLS.map((tool) => {
            const ToolIcon = TOOL_ICONS[tool.icon] || ExternalLink;
            return (
              <Link key={tool.id} href={tool.href} className="card-standard flex items-center gap-3 px-5 py-3.5 no-underline">
                <ToolIcon className="w-5 h-5 text-primary shrink-0" />
                <span className="font-semibold text-sm">{stageT(tool.titleKey)}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 section-lg text-center">
          <h2 className="font-bold mb-4">{t("ready_title")}</h2>
          <p className="text-lg text-white/75 mb-8 max-w-lg mx-auto">{t("ready_subtitle")}</p>
          <Link href="/stages" className="btn-hover inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl no-underline shadow-lg shadow-accent/25">
            {t("ready_cta")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
