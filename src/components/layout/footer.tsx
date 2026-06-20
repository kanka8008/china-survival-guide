import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { STAGES } from "@/lib/constants";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full border-t border-secondary/30 bg-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand Column */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {t("site.name")}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.disclaimer")}
            </p>
          </div>

          {/* Stages Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {t("nav.stages")}
            </h4>
            <ul className="mt-4 space-y-2">
              {STAGES.map((stage) => (
                <li key={stage.id}>
                  <Link
                    href={`/stages/${stage.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-white"
                  >
                    {t(stage.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground transition-colors hover:text-white"
                >
                  {t("nav.faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-white"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-muted-foreground transition-colors hover:text-white"
                >
                  {t("nav.articles")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-secondary/30 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("site.name")}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-white"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-white"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
