import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Globe, Ban, Phone, Route } from "lucide-react";
import { QUICK_TOOLS } from "@/lib/constants";

const TOOL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Ban,
  Phone,
  Route,
};

const TOOL_LABEL_KEYS: Record<string, string> = {
  "visa-free": "tools.visa_free",
  "prohibited-items": "tools.prohibited_items",
  "emergency-numbers": "tools.emergency_numbers",
  "transit-visa": "tools.transit_visa",
};

const TOOL_DESCRIPTIONS: Record<string, string> = {
  "visa-free":
    "Check which countries are eligible for visa-free entry to China.",
  "prohibited-items":
    "Items you cannot bring into or out of China.",
  "emergency-numbers":
    "Important phone numbers for emergencies in China.",
  "transit-visa":
    "Rules for 24/72/144-hour transit visa-free policies.",
};

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {t("nav.tools")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary">
          {t("home.tools_subtitle")}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        {QUICK_TOOLS.map((tool) => {
          const Icon = TOOL_ICONS[tool.icon];
          return (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group flex items-start gap-5 card-standard p-6 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-blue-100">
                {Icon && <Icon className="h-7 w-7" />}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {t(TOOL_LABEL_KEYS[tool.id])}
                </h3>
                <p className="mt-2 text-sm text-secondary">
                  {TOOL_DESCRIPTIONS[tool.id]}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
