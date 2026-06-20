"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/types/article";

interface TableOfContentsProps {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  const t = useTranslations();
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (entries.length === 0) return;

    const headingElements = entries
      .map((entry) => document.getElementById(entry.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        for (const obs of observed) {
          if (obs.isIntersecting) {
            setActiveId(obs.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  }

  return (
    <nav>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </h4>
      <ul className="mt-3 space-y-0.5">
        {entries.map((entry) => {
          const isActive = entry.id === activeId;
          return (
            <li key={entry.id}>
              <button
                onClick={() => scrollTo(entry.id)}
                className={cn(
                  "toc-link",
                  entry.level === 3 && "pl-5",
                  isActive && "active"
                )}
              >
                {entry.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
