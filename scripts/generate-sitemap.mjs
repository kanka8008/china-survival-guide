import { readdir, writeFile } from "node:fs/promises";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = "https://chinavisaentry.com";
const OUT_DIR = join(fileURLToPath(import.meta.url), "../../out");
const LOCALES = ["en", "zh", "es", "it", "de", "ru"];
const DEFAULT_LOCALE = "en";

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (extname(entry.name) === ".html") {
      yield fullPath;
    }
  }
}

function filePathToUrlPath(filePath) {
  let rel = relative(OUT_DIR, filePath).replace(/\\/g, "/");
  // Remove .html extension
  rel = rel.replace(/\.html$/, "");
  // Remove trailing /index
  rel = rel.replace(/\/index$/, "");
  return "/" + rel;
}

function extractLocaleAndPath(urlPath) {
  const parts = urlPath.split("/").filter(Boolean);
  if (parts.length > 0 && LOCALES.includes(parts[0])) {
    return {
      locale: parts[0],
      normalizedPath: "/" + parts.slice(1).join("/") || "/",
    };
  }
  // Non-localized file (e.g. 404)
  return { locale: null, normalizedPath: urlPath || "/" };
}

async function main() {
  console.log("Scanning output directory for HTML files...");
  const files = [];
  for await (const f of walk(OUT_DIR)) {
    files.push(f);
  }

  // Group by normalized path
  const pageMap = new Map();
  for (const file of files) {
    const urlPath = filePathToUrlPath(file);
    const { locale, normalizedPath } = extractLocaleAndPath(urlPath);

    if (locale === null) continue; // skip non-localized (404, etc.)

    if (!pageMap.has(normalizedPath)) {
      pageMap.set(normalizedPath, {});
    }
    pageMap.get(normalizedPath)[locale] = urlPath;
  }

  // Generate sitemap entries
  const today = new Date().toISOString().split("T")[0];
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  for (const [normalizedPath, localeUrls] of pageMap) {
    const defaultUrl = localeUrls[DEFAULT_LOCALE];
    if (!defaultUrl) continue;

    sitemap += `  <url>
    <loc>${escapeXml(BASE_URL + defaultUrl)}</loc>
    <lastmod>${today}</lastmod>
`;

    for (const locale of LOCALES) {
      if (localeUrls[locale]) {
        const href = BASE_URL + localeUrls[locale];
        sitemap += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(href)}"/>\n`;
      }
    }

    // Add x-default pointing to default locale
    if (localeUrls[DEFAULT_LOCALE]) {
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(BASE_URL + localeUrls[DEFAULT_LOCALE])}"/>\n`;
    }

    sitemap += `  </url>
`;
  }

  sitemap += `</urlset>
`;

  const sitemapPath = join(OUT_DIR, "sitemap.xml");
  await writeFile(sitemapPath, sitemap, "utf-8");
  console.log(`Sitemap generated: ${sitemapPath}`);
  console.log(`Total URLs: ${pageMap.size}`);
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

main().catch((err) => {
  console.error("Error generating sitemap:", err);
  process.exit(1);
});
