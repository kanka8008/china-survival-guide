"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALE_LABELS, type Locale } from "@/types/article";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Locale>("en");
  const [switchUrls, setSwitchUrls] = useState<Record<string, string>>({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Compute all switch URLs on mount from window.location.pathname
    const raw = window.location.pathname;
    const seg = raw.split("/")[1];
    const locs = ["en","zh","es","it","de","ru"];
    const cur = locs.includes(seg) ? seg as Locale : "en";
    setCurrent(cur);

    // Strip current locale and build target URLs
    const base = raw === `/${cur}` ? "/" : raw.slice(cur.length + 1) || "/";
    const urls: Record<string, string> = {};
    for (const loc of locs) {
      urls[loc] = `/${loc}${base === "/" ? "" : base}`;
    }
    setSwitchUrls(urls);
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
              href={switchUrls[loc] || `/${loc}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2 text-sm no-underline",
                "transition-colors",
                loc === current
                  ? "bg-muted text-foreground font-semibold"
                  : "text-secondary hover:bg-muted"
              )}
            >
              <span>{label}</span>
              {loc === current && <Check className="h-3.5 w-3.5 text-foreground" />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
