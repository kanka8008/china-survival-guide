import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string;
  try {
    const requested = await requestLocale;
    locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  } catch {
    locale = routing.defaultLocale;
  }
  return { locale, messages: (await import(`./messages/${locale}.json`)).default };
});
