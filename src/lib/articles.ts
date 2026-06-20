import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, ArticleFrontmatter, Locale, Stage, TocEntry } from "@/types/article";
import { STAGES } from "@/lib/constants";

const CONTENT_DIR = path.join(process.cwd(), "content");

function extractToc(content: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const entries: TocEntry[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/^-|-$/g, "");
    entries.push({ level, text, id });
  }
  return entries;
}

function parseFrontmatter(raw: Record<string, unknown>): ArticleFrontmatter {
  return {
    title: String(raw.title ?? ""),
    description: String(raw.description ?? ""),
    slug: String(raw.slug ?? ""),
    stage: String(raw.stage ?? "pre-entry") as Stage,
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    schemaType: (String(raw.schemaType ?? "HowTo") === "FAQPage" ? "FAQPage" : "HowTo"),
    lastUpdated: String(raw.lastUpdated ?? new Date().toISOString().split("T")[0]),
    targetAudience: String(raw.targetAudience ?? ""),
    oneLiner: String(raw.oneLiner ?? ""),
    prerequisites: Array.isArray(raw.prerequisites) ? raw.prerequisites.map(String) : [],
    redlineWarning: raw.redlineWarning ? String(raw.redlineWarning) : undefined,
    order: Number(raw.order ?? 999),
    image: raw.image ? String(raw.image) : undefined,
  };
}

async function readMdxFile(filePath: string, locale: Locale): Promise<Article | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = parseFrontmatter(data);
    const stats = readingTime(content);
    const tableOfContents = extractToc(content);
    return {
      frontmatter,
      content,
      readingTime: Math.ceil(stats.minutes),
      tableOfContents,
      slug: frontmatter.slug,
    };
  } catch {
    return null;
  }
}

async function readArticlesForLocale(locale: Locale): Promise<Article[]> {
  const articles: Article[] = [];
  for (const stage of STAGES) {
    const stageDir = path.join(CONTENT_DIR, locale, stage.slug);
    try {
      const files = await fs.readdir(stageDir);
      for (const file of files) {
        if (!file.endsWith(".mdx")) continue;
        const filePath = path.join(stageDir, file);
        const article = await readMdxFile(filePath, locale);
        if (article) articles.push(article);
      }
    } catch {
      // Stage directory may not exist — skip
    }
  }
  return articles.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

let articlesCache: Map<string, Article[]> = new Map();

async function loadArticles(locale: Locale): Promise<Article[]> {
  if (!articlesCache.has(locale)) {
    const articles = await readArticlesForLocale(locale);
    articlesCache.set(locale, articles);
  }
  return articlesCache.get(locale)!;
}

export function clearArticlesCache(): void {
  articlesCache = new Map();
}

export async function getAllArticles(locale: Locale = "en"): Promise<Article[]> {
  return loadArticles(locale);
}

export async function getArticleBySlug(slug: string, locale: Locale = "en"): Promise<Article | null> {
  const articles = await loadArticles(locale);
  return articles.find((a) => a.slug === slug) ?? null;
}

export async function getArticlesByStage(stage: Stage, locale: Locale = "en"): Promise<Article[]> {
  const articles = await loadArticles(locale);
  return articles.filter((a) => a.frontmatter.stage === stage);
}

export async function getArticlesByTag(tag: string, locale: Locale = "en"): Promise<Article[]> {
  const articles = await loadArticles(locale);
  return articles.filter((a) => a.frontmatter.tags.includes(tag));
}

export async function getRelatedArticles(article: Article, locale: Locale = "en", limit: number = 3): Promise<Article[]> {
  const articles = await loadArticles(locale);
  const others = articles.filter((a) => a.slug !== article.slug);
  const sameStage = others.filter((a) => a.frontmatter.stage === article.frontmatter.stage);
  const differentStage = others.filter((a) => a.frontmatter.stage !== article.frontmatter.stage);
  return [...sameStage, ...differentStage].slice(0, limit);
}

export async function getAdjacentStage(
  article: Article,
  locale: Locale = "en",
): Promise<{ prev: Article | null; next: Article | null }> {
  const articles = await loadArticles(locale);
  const sameStage = articles.filter((a) => a.frontmatter.stage === article.frontmatter.stage);
  const idx = sameStage.findIndex((a) => a.slug === article.slug);
  return { prev: sameStage[idx - 1] ?? null, next: sameStage[idx + 1] ?? null };
}

export async function getAllTags(locale: Locale = "en"): Promise<string[]> {
  const articles = await loadArticles(locale);
  const tagSet = new Set<string>();
  for (const article of articles) {
    for (const tag of article.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  return [...tagSet].sort();
}

export async function getArticlesIndex(locale: Locale = "en"): Promise<{ slug: string; title: string; description: string; stage: string; tags: string[]; }[]> {
  const articles = await loadArticles(locale);
  return articles.map((a) => ({
    slug: a.slug,
    title: a.frontmatter.title,
    description: a.frontmatter.description,
    stage: a.frontmatter.stage,
    tags: a.frontmatter.tags,
  }));
}
