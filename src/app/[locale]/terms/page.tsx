import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import type { Locale } from "@/types/article";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMeta(
    "Terms of Service",
    "Terms of Service for China Survival Guide. Read our terms and conditions for using this website.",
    locale as Locale,
    "/terms",
  );
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
        Terms of Service
      </h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Last updated: June 20, 2026
      </p>

      <section className="prose prose-slate max-w-none dark:prose-invert space-y-6">
        <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground leading-relaxed">
          By accessing and using <strong className="text-foreground">China Survival Guide</strong> (chinavisaentry.com), 
          you agree to be bound by these Terms of Service. If you do not agree, please do not use the website.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">2. Informational Purpose</h2>
        <p className="text-muted-foreground leading-relaxed">
          All content on this website is provided for <strong className="text-foreground">informational purposes only</strong>. 
          While we strive to provide accurate and up-to-date information about Chinese visa policies, 
          entry regulations, and daily life in China, regulations change frequently. 
          Always verify information with official government sources before making travel or legal decisions.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">3. No Legal Advice</h2>
        <p className="text-muted-foreground leading-relaxed">
          The information on this website does not constitute legal, immigration, or professional advice. 
          For specific legal or immigration matters, consult a qualified professional or the relevant 
          Chinese embassy or consulate.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">4. Limitation of Liability</h2>
        <p className="text-muted-foreground leading-relaxed">
          China Survival Guide and its contributors shall not be held liable for any damages, 
          losses, or issues arising from the use of information provided on this website. 
          Use the information at your own risk.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">5. Content Accuracy</h2>
        <p className="text-muted-foreground leading-relaxed">
          We make reasonable efforts to keep content accurate and current, but we do not guarantee 
          the completeness, accuracy, or timeliness of any information. Content is based on publicly 
          available official sources and may be updated without notice.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">6. Intellectual Property</h2>
        <p className="text-muted-foreground leading-relaxed">
          All original content, including text, graphics, and images, is owned by China Survival Guide. 
          You may share links to our content but may not reproduce substantial portions without permission.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">7. Changes to Terms</h2>
        <p className="text-muted-foreground leading-relaxed">
          We reserve the right to modify these Terms of Service at any time. 
          Continued use of the website after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          For questions about these Terms, contact us at{" "}
          <a href="mailto:terms@chinavisaentry.com" className="text-rose-600 hover:text-rose-700 underline">
            terms@chinavisaentry.com
          </a>.
        </p>
      </section>
    </article>
  );
}
