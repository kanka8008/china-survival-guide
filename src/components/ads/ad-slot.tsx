"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function AdSlot() {
  const t = useTranslations("ads");

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border",
        "bg-muted p-6 text-center min-h-[300px]"
      )}
    >
      <span className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {t("label")}
      </span>
      <div
        className={cn(
          "flex h-[250px] w-[300px] items-center justify-center",
          "rounded-lg border-2 border-dashed border-border",
          "bg-muted"
        )}
      >
        <span className="text-xs text-muted-foreground">
          AdSense Placeholder — 300x250
        </span>
      </div>
    </div>
  );
}
