"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function Comments() {
  const t = useTranslations("comments");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "kanka8008/china-survival-guide");
    script.setAttribute("data-repo-id", "R_kgDOS__kaQ");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOS__kac4C_i5I");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const container = document.getElementById("giscus-container");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, []);

  return (
    <section className={cn("mt-12 rounded-xl border border-border p-6")}>
      <h2 className="text-lg font-semibold text-foreground">
        {t("title")}
      </h2>
      <p className="mt-2 text-sm text-secondary">
        {t("powered_by")}{" "}
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Giscus
        </a>
        . {t("login_github")}
      </p>
      <div id="giscus-container" className="mt-4 min-h-[50px]" />
    </section>
  );
}
