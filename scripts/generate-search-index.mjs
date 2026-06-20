import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, "..", "content");
const PUBLIC_DIR = join(__dirname, "..", "public", "search-index");
const LOCALES = ["en", "zh", "es", "it", "de", "ru"];

const STAGE_SLUGS = [
  "pre-entry",
  "border-crossing",
  "first-72-hours",
  "daily-survival",
  "departure",
  "emergency",
];

function parseFrontmatter(raw) {
  return {
    title: String(raw.title ?? ""),
    description: String(raw.description ?? ""),
    slug: String(raw.slug ?? ""),
    stage: String(raw.stage ?? "pre-entry"),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    order: Number(raw.order ?? 999),
  };
}

async function generateIndexForLocale(locale) {
  const articles = [];
  for (const stageSlug of STAGE_SLUGS) {
    const stageDir = join(CONTENT_DIR, locale, stageSlug);
    try {
      const files = await readdir(stageDir);
      for (const file of files) {
        if (!file.endsWith(".mdx")) continue;
        const filePath = join(stageDir, file);
        const raw = readFileSync(filePath, "utf-8");
        const { data } = matter(raw);
        const fm = parseFrontmatter(data);
        articles.push({
          slug: fm.slug,
          title: fm.title,
          description: fm.description,
          stage: fm.stage,
          tags: fm.tags,
        });
      }
    } catch {
      // Stage directory may not exist — skip
    }
  }
  articles.sort((a, b) => a.order - b.order);
  return articles;
}

async function main() {
  mkdirSync(PUBLIC_DIR, { recursive: true });

  for (const locale of LOCALES) {
    console.log(`Generating search index for locale: ${locale}`);
    const index = await generateIndexForLocale(locale);
    const outPath = join(PUBLIC_DIR, `${locale}.json`);
    writeFileSync(outPath, JSON.stringify(index), "utf-8");
    console.log(`  → ${outPath} (${index.length} articles)`);
  }

  console.log("\nSearch index generation complete!");
}

main().catch((err) => {
  console.error("Error generating search index:", err);
  process.exit(1);
});
