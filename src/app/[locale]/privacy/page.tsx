import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import type { Locale } from "@/types/article";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMeta(
    "Privacy Policy",
    "Privacy Policy for China Survival Guide. Learn how we collect, use, and protect your personal information.",
    locale as Locale,
    "/privacy",
  );
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Last updated: June 20, 2026
      </p>

      <section className="prose prose-slate max-w-none dark:prose-invert space-y-6">
        <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">China Survival Guide</strong> does not collect, store, or process any personal information. 
          We do not have user accounts, login systems, or any form of personal data collection.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">2. Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          We do not use cookies or any tracking technologies to collect personal information. 
          Any essential cookies are strictly for site functionality and do not identify you personally.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">3. Third-Party Services</h2>
        <p className="text-muted-foreground leading-relaxed">
          We use Google Analytics to understand how visitors interact with our website. 
          Google Analytics may use cookies to collect anonymous usage data. 
          You can learn more about how Google uses data at{" "}
          <a href="https://policies.google.com/privacy" className="text-rose-600 hover:text-rose-700 underline" target="_blank" rel="noopener noreferrer">
            Google&apos;s Privacy Policy
          </a>.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">4. External Links</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our website contains links to external sites. We are not responsible for the content or privacy practices of these sites.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">5. Changes to This Policy</h2>
        <p className="text-muted-foreground leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">6. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:privacy@chinavisaentry.com" className="text-rose-600 hover:text-rose-700 underline">
            privacy@chinavisaentry.com
          </a>.
        </p>
      </section>
    </article>
  );
}
