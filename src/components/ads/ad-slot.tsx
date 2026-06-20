"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function AdSlot() {
  const t = useTranslations("ads");

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {}
  }, []);

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
      <ins
        className="adsbygoogle block"
        style={{ display: "block", width: "300px", height: "250px" }}
        data-ad-client="ca-pub-2561562961967046"
        data-ad-slot="6777899564"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <noscript>
        <span className="text-xs text-muted-foreground">{t("placeholder")}</span>
      </noscript>
    </div>
  );
}
