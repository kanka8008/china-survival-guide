import { getTranslations } from "next-intl/server";
import { BookOpen, Info, Shield } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("about.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          {t("about.subtitle")}
        </p>
      </div>

      <div className="space-y-8">
        {/* Main Content Paragraph */}
        <section className="rounded-2xl border border-border bg-card p-8">
          <p className="text-base leading-relaxed text-secondary">
            {t("about.content")}
          </p>
        </section>

        {/* 2-Column Grid: Coverage + Sources */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Content Coverage */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Content Coverage
              </h2>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-secondary">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&bull;</span>
                <span>Visa applications and immigration procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&bull;</span>
                <span>Border crossing and customs regulations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&bull;</span>
                <span>First 72 hours: getting settled in China</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&bull;</span>
                <span>Daily survival: payments, transport, food</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&bull;</span>
                <span>Emergency procedures and legal guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&bull;</span>
                <span>Departure procedures and tax refunds</span>
              </li>
            </ul>
          </div>

          {/* Information Sources */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Info className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Information Sources
              </h2>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-secondary">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&bull;</span>
                <span>National Immigration Administration of China</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&bull;</span>
                <span>Ministry of Foreign Affairs of China</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&bull;</span>
                <span>General Administration of Customs (GACC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&bull;</span>
                <span>Ministry of Public Security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&bull;</span>
                <span>Embassies and consulates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&bull;</span>
                <span>Verified traveler experiences</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Box */}
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-accent">
                Important Disclaimer
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                This guide is provided for informational purposes only and does
                not constitute legal, immigration, or professional advice.
                Policies, laws, and procedures referenced in this guide may
                change at any time without notice. While we strive to keep
                information accurate and up-to-date, we make no representations
                or warranties of any kind about the completeness, accuracy,
                reliability, or suitability of the information provided. Always
                verify with official government sources, your local Chinese
                embassy or consulate, and qualified professionals before making
                travel or immigration decisions. The authors and contributors
                are not liable for any consequences arising from the use of this
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
