import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "zh", "es", "it", "de", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});
