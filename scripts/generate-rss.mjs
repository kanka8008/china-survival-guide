/**
 * Generate RSS feed (feed.xml) for all English articles.
 * Run as: node scripts/generate-rss.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { readdirSync } from "node:fs";
import { resolve, join, basename } from "node:path";
import matter from "gray-matter";

const SITE_URL = "https://chinavisaentry.com";
const OUT_DIR = resolve(process.cwd(), "public");
const CONTENT_DIR = resolve(process.cwd(), "content/en");

const stages = ["pre-entry", "border-crossing", "first-72-hours", "daily-survival", "emergency", "departure"];

const articles = [];
for (const stage of stages) {
  const dir = join(CONTENT_DIR, stage);
  try {
    const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = readFileSync(join(dir, file), "utf-8");
      const { data: frontmatter } = matter(raw);
      articles.push({
        title: frontmatter.title,
        slug: frontmatter.slug,
        stage,
        description: frontmatter.description || frontmatter.title,
        date: frontmatter.lastUpdated || "2026-06-17",
      });
    }
  } catch (_) {
    // skip missing dirs
  }
}

const items = articles
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(
    (a) => `  <item>
    <title><![CDATA[${a.title}]]></title>
    <link>${SITE_URL}/en/articles/${a.slug}</link>
    <description><![CDATA[${a.description}]]></description>
    <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    <guid>${SITE_URL}/en/articles/${a.slug}</guid>
    <category>${a.stage}</category>
  </item>`
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>China Survival Guide</title>
  <link>${SITE_URL}</link>
  <description>Complete lifecycle guide for foreigners in China — visa, entry, daily life, emergencies, departure.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

writeFileSync(join(OUT_DIR, "feed.xml"), rss, "utf-8");
console.log(`RSS feed generated: public/feed.xml (${articles.length} articles)`);
