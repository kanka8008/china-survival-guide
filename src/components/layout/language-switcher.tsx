"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALE_LABELS, type Locale } from "@/types/article";

const SUPPORTED_LOCALES = ["en", "zh", "es", "it", "de", "ru"];

/** Extract path without locale prefix from a URL pathname */
function stripLocale(path: string): string {
  for (const loc of SUPPORTED_LOCALES) {
    if (path === `/${loc}`) return "/";
    if (path.startsWith(`/${loc}/`)) return path.slice(loc.length + 1);
  }
  return path;
}

/** Detect current locale from URL pathname */
function detectLocale(path: string): Locale {
  const seg = path.split("/")[1];
  return (SUPPORTED_LOCALES.includes(seg) ? seg : "en") as Locale;
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Read directly from browser URL, NOT from next-intl (which may strip/re-prefix)
  const rawPathname = typeof window !== "undefined" ? window.location.pathname : "/en";
  const currentLocale = detectLocale(rawPathname);
  const currentLabel = LOCALE_LABELS[currentLocale] ?? "English";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchTo(locale: Locale) {
    const path = stripLocale(window.location.pathname);
    const target = `/${locale}${path === "/" ? "" : path}`;
    window.location.href = target;
    setOpen(false);
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
          {(Object.entries(LOCALE_LABELS) as [Locale, string][]).map(([locale, label]) => {
            const isActive = locale === currentLocale;
            return (
              <button
                key={locale}
                onClick={() => switchTo(locale)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-sm",
                  "transition-colors",
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-secondary hover:bg-muted"
                )}
              >
                <span>{label}</span>
                {isActive && <Check className="h-3.5 w-3.5 text-foreground" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
