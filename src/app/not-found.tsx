import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Visa-Free Entry Guide", href: "/en/articles/visa-free-guide" },
  { label: "Entry Documents Checklist", href: "/en/articles/entry-documents-checklist" },
  { label: "Alipay Setup for Foreigners", href: "/en/articles/alipay-foreign-card" },
  { label: "China Metro Guide", href: "/en/articles/metro-subway-guide" },
  { label: "Emergency Numbers", href: "/en/tools/emergency-numbers" },
  { label: "All Articles", href: "/en/articles" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Compass className="mb-6 h-16 w-16 text-rose-500" />
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">404</h1>
      <h2 className="mb-2 text-xl font-semibold text-foreground">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for might have been moved, renamed, or is temporarily unavailable.
      </p>

      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors no-underline group"
          >
            <span>{link.label}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        ))}
      </div>

      <Link
        href="/en"
        className="rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
