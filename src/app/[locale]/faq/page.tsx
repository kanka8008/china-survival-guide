import { getTranslations } from "next-intl/server";
import { generatePageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import type { Locale } from "@/types/article";
import FAQContent from "./FAQContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return generatePageMeta(t("faq.title"), t("faq.subtitle"), locale as Locale, "/faq");
}

export default function FAQPage() {
  return <FAQContent />;
}
