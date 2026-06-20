import { Link } from "@/i18n/navigation";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { Article, Stage } from "@/types/article";

const STAGE_COLORS: Record<Stage, { bg: string; text: string; border: string }> = {
  "pre-entry": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "border-crossing": { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  "first-72-hours": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "daily-survival": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  emergency: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  departure: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
};

function resolveImageSrc(image: string | undefined): string | null {
  if (!image) return null;
  if (image.startsWith("http") || image.startsWith("/")) return image;
  return `/images/articles/${image}`;
}

export function ArticleCard({
  article,
  featured,
  stageLabel,
  locale,
}: {
  article: Article;
  featured?: boolean;
  stageLabel: string;
  locale: string;
}) {
  const { frontmatter, readingTime, slug } = article;
  const colors = STAGE_COLORS[frontmatter.stage];
  const imageSrc = resolveImageSrc(frontmatter.image);

  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border card-lift no-underline"
    >
      {imageSrc && (
        <div className="aspect-video">
          <img
            src={imageSrc}
            alt={frontmatter.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className={cn(
        "flex flex-1 flex-col",
        featured ? "p-5 sm:p-6" : "p-4 sm:p-5",
      )}>
        {/* Stage badge — pill style */}
        <span className={cn("stage-badge mb-3 border", colors.bg, colors.text, colors.border)}>
          {stageLabel}
        </span>

        <h3 className={cn(
          "line-clamp-2 font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200",
          featured ? "text-xl" : "text-base"
        )}>
          {frontmatter.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-secondary">
          {frontmatter.description}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-4 text-xs font-medium text-muted-foreground">
          <span>{formatDate(frontmatter.lastUpdated, locale)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
