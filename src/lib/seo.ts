import type { Metadata } from "next";
import type { Article, Locale } from "@/types/article";
import { SITE_NAME, SITE_DOMAIN } from "@/lib/constants";

export function generateArticleMeta(article: Article, locale: Locale): Metadata {
  const { frontmatter, slug } = article;
  const url = `https://${SITE_DOMAIN}/${locale}/${frontmatter.stage}/${slug}`;
  const schema = generateArticleSchema(article, url);
  const basePath = `/${locale}/${frontmatter.stage}/${slug}`;
  return {
    title: `${frontmatter.title} | ${SITE_NAME}`,
    description: frontmatter.description,
    metadataBase: new URL(`https://${SITE_DOMAIN}`),
    alternates: {
      canonical: `/${locale}/${frontmatter.stage}/${slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      type: "article",
      locale: locale,
      images: frontmatter.image ? [{ url: frontmatter.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
  };
}

function generateArticleSchema(article: Article, url: string): object {
  const { frontmatter, content, tableOfContents } = article;
  if (frontmatter.schemaType === "FAQPage") {
    const faqItems = tableOfContents
      .filter((toc) => toc.level === 3)
      .map((toc, index, arr) => {
        // Extract answer text: content between this heading and the next heading
        const headingRegex = new RegExp(
          `###\\s+${escapeRegex(toc.text)}[\\s\\S]*?`,
          "m"
        );
        const match = content.match(headingRegex);
        let answerText = "";
        if (match) {
          const startIndex = match.index! + match[0].length;
          // Find next heading (## or ###) or end of content
          const restContent = content.slice(startIndex);
          const nextHeadingMatch = restContent.match(/^#{2,3}\s/m);
          const answerRaw = nextHeadingMatch
            ? restContent.slice(0, nextHeadingMatch.index)
            : restContent;
          // Strip markdown formatting for clean text
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
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(`https://${SITE_DOMAIN}`),
    alternates: {
      canonical: basePath,
    },
    openGraph: {
      title,
      description,
      url: `https://${SITE_DOMAIN}${basePath}`,
      locale,
      images: [{ url: "/images/hero/hero-banner.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero/hero-banner.png"],
    },
  };
}
