import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Compass className="mb-6 h-16 w-16 text-rose-500" />
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">404</h1>
      <h2 className="mb-2 text-xl font-semibold text-foreground">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for might have been moved, renamed, or is
        temporarily unavailable.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
