"use client";

import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface FreshnessNoticeProps {
  lastUpdated: string;
  locale: string;
}

/** Show a notice if the article hasn't been updated in over 180 days */
export function FreshnessNotice({ lastUpdated, locale }: FreshnessNoticeProps) {
  const t = useTranslations("article");
  const updated = new Date(lastUpdated);
  const now = new Date();
  const daysAgo = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));

  if (daysAgo < 180) return null;

  return (
    <div
      className={cn(
        "mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4",
        "dark:border-amber-700 dark:bg-amber-950/30"
      )}
    >
      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div>
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
            {t("content_may_be_outdated")}
          </p>
          <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
            {t("last_updated_on", { date: formatDate(lastUpdated, locale) })}
          </p>
        </div>
      </div>
    </div>
  );
}
