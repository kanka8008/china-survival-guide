import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://chinavisaentry.com"),
  title: { default: "China Survival Guide — Complete Lifecycle Guide for Foreigners", template: "%s | China Survival Guide" },
  description: "Comprehensive survival guide for foreigners in China. Visa, entry, daily life, emergencies, departure — step-by-step practical instructions.",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  verification: { google: "IhC56ZAgSQxad3eDjB6Ctd5UkbHHIohAiURpjwpQK0w" },
  openGraph: { type: "website", siteName: "China Survival Guide", title: "China Survival Guide", description: "Complete lifecycle guide for foreigners in China.", images: ["/images/hero/hero-banner.png"] },
  twitter: { card: "summary_large_image", title: "China Survival Guide", description: "Complete lifecycle guide for foreigners in China.", images: ["/images/hero/hero-banner.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
