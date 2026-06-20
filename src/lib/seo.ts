import type { Metadata } from "next";
import type { Article, Locale } from "@/types/article";
import { SITE_NAME, SITE_DOMAIN } from "@/lib/constants";

function resolveImageUrl(image: string | undefined): string | undefined {
  if (!image) return undefined;
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return `https://${SITE_DOMAIN}${image}`;
  return `https://${SITE_DOMAIN}/images/articles/${image}`;
}

export function generateArticleMeta(article: Article, locale: Locale): Metadata {
  const { frontmatter, slug } = article;
  const articlePath = `/articles/${slug}`;
  const url = `https://${SITE_DOMAIN}/${locale}${articlePath}`;
  const schema = generateArticleSchema(article, url);
  const imageUrl = resolveImageUrl(frontmatter.image);

  // Build hreflang alternates for all supported locales
  const languages: Record<string, string> = {};
  for (const loc of ["en", "zh", "es", "it", "de", "ru"]) {
    languages[loc] = `/${loc}${articlePath}`;
  }
  // x-default points to English
  languages["x-default"] = `/en${articlePath}`;

  return {
    // Use just title — root layout template adds "| China Survival Guide"
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: `/${locale}${articlePath}`,
      languages,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      type: "article",
      locale,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
    robots: { index: true, follow: true },
  };
}

function generateArticleSchema(article: Article, url: string): object {
  const { frontmatter, content, tableOfContents } = article;
  if (frontmatter.schemaType === "FAQPage") {
    const faqItems = tableOfContents
      .filter((toc) => toc.level === 3)
      .map((toc) => {
        const headingRegex = new RegExp(
          `###\\s+${escapeRegex(toc.text)}[\\s\\S]*?`,
          "m"
        );
        const match = content.match(headingRegex);
        let answerText = "";
        if (match) {
          const startIndex = match.index! + match[0].length;
          const restContent = content.slice(startIndex);
          const nextHeadingMatch = restContent.match(/^#{2,3}\s/m);
          const answerRaw = nextHeadingMatch
            ? restContent.slice(0, nextHeadingMatch.index)
            : restContent;
          answerText = stripMarkdown(answerRaw).trim().slice(0, 200);
        }
        return {
          "@type": "Question",
          name: toc.text,
          acceptedAnswer: {
            "@type": "Answer",
            text: answerText || toc.text,
          },
        };
      });
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems,
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: frontmatter.title,
    description: frontmatter.description,
    url,
    step: frontmatter.prerequisites.map((prereq, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: prereq,
    })),
    dateModified: frontmatter.lastUpdated,
  };
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim();
}

export function generatePageMeta(
  title: string,
  description: string,
  locale: Locale,
  path: string,
): Metadata {
  const fullPath = path.startsWith("/") ? path : `/${path}`;
  const basePath = `/${locale}${fullPath}`;
  return {
    title,
    description,
    alternates: {
      canonical: basePath,
    },
    openGraph: {
      title,
      description,
      url: `https://${SITE_DOMAIN}${basePath}`,
      locale,
      images: [{ url: `https://${SITE_DOMAIN}/images/hero/hero-banner.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://${SITE_DOMAIN}/images/hero/hero-banner.png`],
    },
  };
}
