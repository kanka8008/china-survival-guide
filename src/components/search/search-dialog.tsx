"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Search, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  stage: string;
  tags: string[];
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const doSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/search-index/${locale}.json`);
        const data: SearchResult[] = await res.json();
        const lower = q.toLowerCase();
        const filtered = data.filter(
          (item) =>
            item.title.toLowerCase().includes(lower) ||
            item.description.toLowerCase().includes(lower) ||
            item.tags.some((tag) => tag.toLowerCase().includes(lower))
        );
        setResults(filtered.slice(0, 10));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [locale]
  );

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(value), 200);
  }

  function handleSelect() {
    onOpenChange(false);
  }

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div
        className={cn(
          "relative z-10 w-full max-w-xl rounded-2xl border border-border bg-card",
          "shadow-2xl shadow-foreground/20 mx-4"
        )}
      >
        {/* Search input */}
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={onChange}
            placeholder={t("search.placeholder")}
            className={cn(
              "flex-1 bg-transparent px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground",
              "outline-none"
            )}
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                inputRef.current?.focus();
              }}
              className="rounded p-1 text-muted-foreground hover:text-secondary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {loading && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              Searching...
            </p>
          )}

          {!loading && query && results.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              {t("search.no_results")}
            </p>
          )}

          {results.length > 0 && (
            <ul>
              {results.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/articles/${item.slug}`}
                    onClick={handleSelect}
                    className={cn(
                      "flex items-start justify-between rounded-lg px-3 py-3",
                      "transition-colors hover:bg-muted"
                    )}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="ml-2 mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <span>
            Press <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[11px] text-muted-foreground">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
