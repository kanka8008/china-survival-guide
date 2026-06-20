"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALE_LABELS, type Locale } from "@/types/article";

interface Props {
  currentLocale: string;
  pathname: string;
}

export function LanguageSwitcher({ currentLocale, pathname }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const locale = (currentLocale || "en") as Locale;
  const currentLabel = LOCALE_LABELS[locale] ?? "English";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function getTargetUrl(targetLocale: Locale): string {
    // pathname INCLUDES locale prefix (e.g. "/en" or "/en/articles/xxx")
    // Strip current locale prefix, then prepend target locale
    const pathWithoutLocale = pathname === `/${locale}`
      ? "/"
      : pathname.startsWith(`/${locale}/`)
      ? pathname.slice(locale.length + 1)
      : pathname;
    return `/${targetLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch language"
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium",
          "text-secondary hover:text-foreground hover:bg-muted",
          "transition-colors"
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLabel}</span>
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full mt-1 w-44 rounded-xl border border-border bg-card",
            "shadow-lg shadow-foreground/10 py-1 z-50"
          )}
        >
          {(Object.entries(LOCALE_LABELS) as [Locale, string][]).map(([loc, label]) => (
            <a
              key={loc}
              href={getTargetUrl(loc)}
              onClick={() => setOpen(false)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2 text-sm no-underline",
                "transition-colors",
                loc === locale
                  ? "bg-muted text-foreground font-semibold"
                  : "text-secondary hover:bg-muted"
              )}
            >
              <span>{label}</span>
              {loc === locale && <Check className="h-3.5 w-3.5 text-foreground" />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
