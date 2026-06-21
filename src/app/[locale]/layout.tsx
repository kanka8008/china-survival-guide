import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AdSenseInit } from "@/components/ads/adsense-init";
import { ClientLayout } from "./client-layout";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <GoogleAnalytics />
      <AdSenseInit />
      <ClientLayout>{children}</ClientLayout>
    </NextIntlClientProvider>
  );
}
