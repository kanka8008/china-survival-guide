"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function Comments() {
  const t = useTranslations("comments");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "YOUR_GITHUB_USER/YOUR_REPO");
    script.setAttribute("data-repo-id", "YOUR_REPO_ID");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "YOUR_CATEGORY_ID");
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
        {t("powered_by")} Giscus. Configure your GitHub repository by replacing
        <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs text-secondary">
          data-repo
        </code>
        and
        <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs text-secondary">
          data-repo-id
        </code>
        attributes in the source code.
      </p>
      <div id="giscus-container" className="mt-4" />
    </section>
  );
}
