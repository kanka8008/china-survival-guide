"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALE_LABELS, type Locale } from "@/types/article";

/**
 * Build the target URL when switching to a new locale.
 * Uses window.location.pathname directly to avoid next-intl router issues.
 */
function buildSwitchUrl(targetLocale: Locale): string {
  const raw = window.location.pathname;
  // Detect current locale from first path segment
  const seg = raw.split("/")[1];
  const current = ["en","zh","es","it","de","ru"].includes(seg) ? seg : "en";
  // Strip current locale prefix
  const rest = raw === `/${current}` ? "/" : raw.slice(current.length + 1) || "/";
  // Build target: /{locale} + rest-of-path
  return `/${targetLocale}${rest === "/" ? "" : rest}`;
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Locale>("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seg = window.location.pathname.split("/")[1];
    const locs = ["en","zh","es","it","de","ru"];
    setCurrent(locs.includes(seg) ? seg as Locale : "en");
  }, []);

  const currentLabel = LOCALE_LABELS[current] ?? "English";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSwitch(locale: Locale) {
    window.location.href = buildSwitchUrl(locale);
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
            <button
              key={loc}
              onClick={() => handleSwitch(loc)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2 text-sm",
                "transition-colors",
                loc === current
                  ? "bg-muted text-foreground font-semibold"
                  : "text-secondary hover:bg-muted"
              )}
            >
              <span>{label}</span>
              {loc === current && <Check className="h-3.5 w-3.5 text-foreground" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
