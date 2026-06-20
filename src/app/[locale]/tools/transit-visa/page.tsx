import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ShieldAlert,
  Clock,
  Route,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default async function TransitVisaPage({
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
          {t("tools.transit_visa")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-secondary">
          China offers transit visa-free policies at select ports of entry,
          allowing eligible travelers to stay for limited periods without a visa
          while in transit to a third country.
        </p>

        {/* Red-line warning about overstay */}
        <div className="red-line-box mt-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
            <div>
              <h2 className="text-lg font-semibold text-red-800">
                Crucial Requirement
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-red-700">
                Transit visa-free only applies when traveling from Country A to
                Country B with a transit through China. You MUST have confirmed
                onward tickets to a third country/region. A round trip (Country
                A &rarr; China &rarr; Country A) does NOT qualify. Overstaying
                will result in fines, detention, and possible entry bans.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Three Transit Cards (24h, 72h, 144h) */}
      <div className="mb-12 grid gap-6 sm:grid-cols-3">
        {/* 24 Hours */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-primary">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            24-Hour Transit
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            Available at all international airports with international transit
            facilities. Eligible for most nationalities. You must remain in the
            airport transit area or the designated city area.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Most international airports</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Must have onward ticket</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Same calendar day</span>
            </div>
          </div>
        </div>

        {/* 72 Hours */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            72-Hour Transit
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            Available at select cities including Guangzhou, Chengdu, Chongqing,
            Xi&apos;an, and others. Stay is limited to the administrative area
            of the port of entry city.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Select cities only</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Must have onward ticket</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>City area only</span>
            </div>
          </div>
        </div>

        {/* 144 Hours */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Route className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            144-Hour Transit
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            Available in Beijing (Beijing-Tianjin-Hebei), Shanghai
            (Shanghai-Jiangsu-Zhejiang), and Guangdong Province. Most popular
            choice for transit travelers.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Major regions</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Must have onward ticket</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Regional travel allowed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Requirements */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Key Requirements for All Transit Policies
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <span className="font-medium text-foreground">
                Valid Passport
              </span>
              <p className="mt-0.5 text-sm text-secondary">
                Valid for at least 3 months beyond the intended stay with blank
                visa pages.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <span className="font-medium text-foreground">
                Onward Ticket to Third Country
              </span>
              <p className="mt-0.5 text-sm text-secondary">
                You must have a confirmed connecting flight ticket to a third
                country/region departing within the allowed transit period.
                Round-trip tickets do not qualify.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <span className="font-medium text-foreground">
                Eligible Nationality
              </span>
              <p className="mt-0.5 text-sm text-secondary">
                Citizens of over 50 countries are eligible. Check your specific
                nationality with the Chinese embassy or consulate.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <span className="font-medium text-foreground">
                Designated Ports Only
              </span>
              <p className="mt-0.5 text-sm text-secondary">
                Entry and exit must be through designated ports. You cannot
                enter through one port and exit through a non-designated one.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* What You Cannot Do */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-semibold text-foreground">
            What You Cannot Do on Transit Visa-Free
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
              Travel Outside Designated Area
            </p>
            <p className="mt-1 text-sm text-red-700">
              You must stay within the administrative boundaries of the
              permitted city or region.
            </p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
              Extend Your Stay
            </p>
            <p className="mt-1 text-sm text-red-700">
              Transit visa-free periods cannot be extended. Overstaying will
              result in fines, detention, and possible entry bans.
            </p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
              Return to Your Origin Country
            </p>
            <p className="mt-1 text-sm text-red-700">
              The transit must be to a THIRD country. Flights back to your
              departure country do not qualify.
            </p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
              Work or Study
            </p>
            <p className="mt-1 text-sm text-red-700">
              Transit visa-free is for tourism and transit purposes only.
              Working or studying is not permitted.
            </p>
          </div>
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Source: National Immigration Administration of China. Last updated: June
        2026. Policies may change; always verify with official sources before
        travel.
      </p>
    </div>
  );
}
