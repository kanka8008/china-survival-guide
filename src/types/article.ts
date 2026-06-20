export type Stage = "pre-entry" | "border-crossing" | "first-72-hours" | "daily-survival" | "emergency" | "departure";
export type SchemaType = "HowTo" | "FAQPage";
export interface ArticleFrontmatter {
  title: string; description: string; slug: string; stage: Stage; tags: string[];
  schemaType: SchemaType; lastUpdated: string; targetAudience: string;
  oneLiner: string; prerequisites: string[]; redlineWarning?: string; order: number; image?: string;
}
export interface Article { frontmatter: ArticleFrontmatter; content: string; readingTime: number; tableOfContents: TocEntry[]; slug: string; }
export interface TocEntry { level: number; text: string; id: string; }
export interface StageInfo { id: Stage; slug: string; titleKey: string; descriptionKey: string; icon: string; color: string; order: number; }
export type Locale = "en" | "zh" | "es" | "it" | "de" | "ru";
export const LOCALES: Locale[] = ["en", "zh", "es", "it", "de", "ru"];
export const LOCALE_LABELS: Record<Locale, string> = { en: "English", zh: "中文", es: "Español", it: "Italiano", de: "Deutsch", ru: "Русский" };
