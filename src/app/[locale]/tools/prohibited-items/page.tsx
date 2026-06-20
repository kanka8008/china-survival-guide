import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ShieldAlert, AlertTriangle, Ban } from "lucide-react";

const PROHIBITED_ITEMS = [
  "Firearms, ammunition, and explosives of any kind",
  "Military equipment and weapon components",
  "Counterfeit currencies and forged securities",
  "Printed matter, films, photos, recordings deemed detrimental to the political, economic, cultural, or moral interests of China",
  "Lethal poisons and narcotics (unless prescribed with documentation)",
  "Animals, plants, and products thereof carrying infectious diseases or pests",
  "Foodstuffs, pharmaceuticals, and other articles from disease-stricken areas",
  "Obscene materials, including books, magazines, and digital media",
  "Radio transmitters/receivers without prior approval",
  "Precious cultural relics (without export permit)",
  "Endangered species and products made from them",
  "Drones exceeding specified weight/specifications without registration",
  "Encrypted communication devices without declaration",
];

const RESTRICTED_ITEMS = [
  {
    item: "Foreign currency (>$5,000 USD equivalent)",
    requirement: "Must declare to customs",
  },
  {
    item: "Chinese currency (RMB >20,000)",
    requirement: "Must declare to customs",
  },
  {
    item: "Gold, silver, and precious jewelry",
    requirement: "Must declare if exceeding personal use",
  },
  {
    item: "Alcoholic beverages",
    requirement: "Max 1.5 liters (alcohol content >12%)",
  },
  {
    item: "Tobacco products",
    requirement: "Max 400 cigarettes or 100 cigars or 500g tobacco",
  },
  {
    item: "Traditional Chinese medicine",
    requirement: "Max 300 RMB value for export",
  },
  {
    item: "Endangered wildlife products",
    requirement: "Must have CITES certificate",
  },
  {
    item: "Prescription medication",
    requirement: "Must carry doctor's prescription and declaration",
  },
  {
    item: "Cultural relics/antiques",
    requirement: "Must have export permit from cultural authority",
  },
  {
    item: "Satellite communication equipment",
    requirement: "Must declare and obtain approval",
  },
  {
    item: "Samples of biological material",
    requirement: "Must have quarantine certificate",
  },
  {
    item: "Drones (>250g)",
    requirement: "Must register with CAAC and customs",
  },
];

export default async function ProhibitedItemsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/tools"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {t("nav.tools")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-zinc-100 sm:text-4xl">
          {t("tools.prohibited_items")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-secondary dark:text-zinc-400">
          Items that are prohibited or restricted from being brought into or out
          of China. Violations can result in confiscation, fines, detention, or
          criminal charges.
        </p>
      </div>

      {/* Red Line Warning Box */}
      <div className="red-line-box mb-10">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
          <div>
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
              Red Line Warning
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-red-700 dark:text-red-400">
              Attempting to bring prohibited items into China can result in
              criminal charges, including detention and prosecution.
              China&apos;s customs enforcement is strict and thorough. If in
              doubt, declare the item or do not bring it. Ignorance of the law
              is not accepted as a defense.
            </p>
          </div>
        </div>
      </div>

      {/* Prohibited Items List */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <Ban className="h-5 w-5 text-red-600" />
          <h2 className="text-xl font-semibold text-foreground dark:text-zinc-100">
            Strictly Prohibited Items
          </h2>
        </div>
        <p className="mb-4 text-sm text-secondary dark:text-zinc-400">
          The following items are absolutely prohibited. Do NOT attempt to bring
          these into China under any circumstances.
        </p>
        <ul className="space-y-2">
          {PROHIBITED_ITEMS.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-lg border border-red-100 bg-red-50/50 px-4 py-3 text-sm text-secondary dark:border-red-900/30 dark:bg-red-950/20 dark:text-zinc-300"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/50 dark:text-red-400">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Restricted Items Table */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-semibold text-foreground dark:text-zinc-100">
            Restricted Items (Must Declare)
          </h2>
        </div>
        <p className="mb-4 text-sm text-secondary dark:text-zinc-400">
          These items are allowed but must be declared to customs upon entry.
          Failure to declare may result in fines or confiscation.
        </p>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
                <tr>
                  <th className="px-6 py-3 font-semibold text-foreground dark:text-zinc-100">
                    Item
                  </th>
                  <th className="px-6 py-3 font-semibold text-foreground dark:text-zinc-100">
                    Requirement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {RESTRICTED_ITEMS.map((item) => (
                  <tr
                    key={item.item}
                    className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="px-6 py-3 font-medium text-foreground dark:text-zinc-100">
                      {item.item}
                    </td>
                    <td className="px-6 py-3 text-secondary dark:text-zinc-400">
                      {item.requirement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-muted-foreground dark:text-zinc-500">
        Source: General Administration of Customs of China (GACC). Last
        updated: June 2026. Always check the latest regulations before
        traveling.
      </p>
    </div>
  );
}
