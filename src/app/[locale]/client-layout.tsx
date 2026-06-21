"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { SearchDialog } from "@/components/search/search-dialog";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <ReadingProgress />
      <div className="flex min-h-screen flex-col">
        <Header onSearchOpen={() => setSearchOpen(true)} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <BackToTop />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
