"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

interface HeaderProps {
  onSearchOpen?: () => void;
}

const NAV_ITEMS = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.stages", href: "/stages" },
  { labelKey: "nav.articles", href: "/articles" },
  { labelKey: "nav.faq", href: "/faq" },
  { labelKey: "nav.tools", href: "/tools" },
  { labelKey: "nav.about", href: "/about" },
] as const;

export function Header({ onSearchOpen }: HeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#2563EB]/80 shadow-sm"
          : "bg-white border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <img
            src="/logo.png"
            alt="China Survival Guide"
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-lg font-semibold text-foreground hidden sm:block">
            China Survival Guide
          </span>
          <span className="text-sm font-semibold text-foreground sm:hidden">
            CSG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {/* Search button */}
          <button
            onClick={onSearchOpen}
            aria-label={t("nav.search")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium",
              "text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            )}
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">{t("nav.search")}</span>
          </button>

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenu((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenu && (
        <nav className="lg:hidden border-t border-border bg-card px-4 py-3 animate-in slide-in-from-top-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
