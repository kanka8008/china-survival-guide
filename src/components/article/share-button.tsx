"use client";

import { Share2 } from "lucide-react";

export function ShareButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => {
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText(window.location.href);
        }
      }}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary hover:text-foreground hover:bg-muted rounded-lg transition-colors"
    >
      <Share2 className="w-4 h-4" /> {label}
    </button>
  );
}
