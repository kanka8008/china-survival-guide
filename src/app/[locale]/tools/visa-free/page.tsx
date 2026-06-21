import { getTranslations } from "next-intl/server";
import { generatePageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import type { Locale } from "@/types/article";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";

interface VisaFreeCountry {
  country: string;
  region: string;
  maxDays: number;
  status: "visa-free" | "visa-required" | "mutual-exemption" | "upcoming";
}

const VISA_FREE_COUNTRIES: VisaFreeCountry[] = [
  // Europe
  { country: "France", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Germany", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Italy", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Netherlands", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Spain", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Switzerland", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Ireland", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Hungary", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Austria", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Belgium", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Luxembourg", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Poland", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Portugal", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Greece", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Cyprus", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Slovenia", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Norway", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Denmark", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Finland", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Sweden", region: "Europe", maxDays: 15, status: "visa-free" },
  { country: "Iceland", region: "Europe", maxDays: 15, status: "visa-free" },
  // Mutual Exemption
  { country: "Singapore", region: "Asia", maxDays: 30, status: "mutual-exemption" },
  { country: "Brunei", region: "Asia", maxDays: 15, status: "mutual-exemption" },
  { country: "Thailand", region: "Asia", maxDays: 30, status: "mutual-exemption" },
  { country: "United Arab Emirates", region: "Middle East", maxDays: 30, status: "mutual-exemption" },
  { country: "Qatar", region: "Middle East", maxDays: 30, status: "mutual-exemption" },
  { country: "Maldives", region: "Asia", maxDays: 30, status: "mutual-exemption" },
  { country: "Belarus", region: "Europe", maxDays: 30, status: "mutual-exemption" },
  { country: "Serbia", region: "Europe", maxDays: 30, status: "mutual-exemption" },
  { country: "Bosnia and Herzegovina", region: "Europe", maxDays: 90, status: "mutual-exemption" },
  { country: "San Marino", region: "Europe", maxDays: 90, status: "mutual-exemption" },
  { country: "Mauritius", region: "Africa", maxDays: 30, status: "mutual-exemption" },
  { country: "Bahamas", region: "Americas", maxDays: 30, status: "mutual-exemption" },
  { country: "Barbados", region: "Americas", maxDays: 30, status: "mutual-exemption" },
  { country: "Fiji", region: "Oceania", maxDays: 30, status: "mutual-exemption" },
  { country: "Grenada", region: "Americas", maxDays: 30, status: "mutual-exemption" },
  // Asia (visa-free)
  { country: "Malaysia", region: "Asia", maxDays: 15, status: "visa-free" },
  { country: "Japan", region: "Asia", maxDays: 15, status: "visa-free" },
  { country: "South Korea", region: "Asia", maxDays: 15, status: "visa-free" },
  // Oceania
  { country: "Australia", region: "Oceania", maxDays: 15, status: "visa-free" },
  { country: "New Zealand", region: "Oceania", maxDays: 15, status: "visa-free" },
];

const STATUS_LABELS: Record<VisaFreeCountry["status"], string> = {
  "visa-free": "Visa-Free (15 days)",
  "visa-required": "Visa Required",
  "mutual-exemption": "Mutual Exemption",
  upcoming: "Upcoming",
};

const STATUS_COLORS: Record<VisaFreeCountry["status"], string> = {
  "visa-free": "bg-emerald-100 text-emerald-800",
  "visa-required": "bg-red-100 text-red-800",
  "mutual-exemption": "bg-blue-100 text-blue-800",
  upcoming: "bg-yellow-100 text-yellow-800",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMeta("Visa-Free Checker", "Check if your nationality qualifies for China's visa-free entry policy and how long you can stay", locale as Locale, "/tools/visa-free");
}

export default async function VisaFreePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/tools"
          className="mb-4 inline-flex items-center text-sm text-secondary transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {t("nav.tools")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("tools.visa_free")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-secondary">
          A comprehensive list of countries eligible for visa-free entry or
          mutual visa exemption with China. Policies are subject to change
          &mdash; always verify before travel.
        </p>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Important
              </p>
              <p className="mt-1 text-sm text-amber-700">
                China&apos;s visa-free policies may change. Some visa-free
                arrangements are temporary or trial programs. Always check with
                your local Chinese embassy or consulate before planning your
                trip.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Country Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-6 py-3 font-semibold text-foreground">
                  Country / Region
                </th>
                <th className="px-6 py-3 font-semibold text-foreground">
                  Region
                </th>
                <th className="px-6 py-3 font-semibold text-foreground">
                  Max Stay
                </th>
                <th className="px-6 py-3 font-semibold text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {VISA_FREE_COUNTRIES.map((item) => (
                <tr
                  key={item.country}
                  className="transition-colors hover:bg-muted"
                >
                  <td className="px-6 py-3 font-medium text-foreground">
                    {item.country}
                  </td>
                  <td className="px-6 py-3 text-secondary">
                    {item.region}
                  </td>
                  <td className="px-6 py-3 text-secondary">
                    {item.maxDays} days
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status]}`}
                    >
                      {item.status === "mutual-exemption" && (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      )}
                      {STATUS_LABELS[item.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Last updated: June 2026. Always verify current policies with official
        sources.
      </p>
    </div>
  );
}
