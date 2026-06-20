"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<string, FAQItem[]> = {
  "Visa & Entry": [
    {
      question: "Can I extend my 30-day visa-free stay?",
      answer:
        "Generally no. The 30-day visa-free policy cannot be extended. You must leave China before the 30-day period expires. Overstaying will result in fines (typically 500 RMB per day, capped at 10,000 RMB), possible detention, and a future entry ban. If you have an emergency situation, contact the local Exit-Entry Administration immediately.",
    },
    {
      question: "What documents do I need to enter China?",
      answer:
        "You need a valid passport with at least 6 months remaining validity and 2 blank visa pages. Depending on your nationality, you may also need a valid Chinese visa, or you may be eligible for visa-free entry. Additional documents may include round-trip flight tickets, hotel reservations, and an invitation letter if applicable.",
    },
    {
      question: "How long does Chinese visa processing take?",
      answer:
        "Standard processing takes 4-5 business days. Express service (1-2 business days) is available for an additional fee. However, processing times may be longer during peak travel seasons or for certain nationalities. Apply well in advance of your planned travel date.",
    },
  ],
  "Payment & Banking": [
    {
      question: "Can I use my foreign credit card in China?",
      answer:
        "Major international credit cards (Visa, Mastercard) are accepted at high-end hotels, international chain restaurants, and large shopping malls. However, many smaller businesses, local restaurants, and street vendors only accept mobile payments (WeChat Pay, Alipay) or cash. It is recommended to set up at least one mobile payment method before or upon arrival.",
    },
    {
      question: "How do I set up WeChat Pay or Alipay as a foreigner?",
      answer:
        "Both WeChat Pay and Alipay now support linking international credit/debit cards. Download the app, verify your identity by uploading your passport photo and a selfie, then add your international card. Some advanced features may require a Chinese bank account. The setup can be done entirely within the app with an English interface available.",
    },
    {
      question: "Is cash still accepted in China?",
      answer:
        "Yes, the Chinese Yuan (RMB/CNY) is legal tender and must be accepted by law. However, many businesses have gone largely cashless and may not have change available. It is advisable to carry some cash (1,000-2,000 RMB) when visiting smaller cities, rural areas, or traditional markets.",
    },
  ],
  Transportation: [
    {
      question: "How do I use the metro/subway in Chinese cities?",
      answer:
        "Most major Chinese cities have modern metro systems with bilingual signs (Chinese and English). You can buy single-trip tickets at vending machines that accept cash and mobile payment, or use Alipay's Transport mini-program to scan a QR code. Some cities also sell multi-day tourist passes.",
    },
    {
      question: "Can foreigners use ride-hailing apps in China?",
      answer:
        "Yes. Didi Chuxing (the primary ride-hailing app) has an English interface. You can register with a foreign phone number and link an international credit card. Alternatively, you can hail rides through Alipay's integrated Didi mini-program without downloading a separate app.",
    },
  ],
  Accommodation: [
    {
      question: "Can foreigners stay at any hotel in China?",
      answer:
        "No. By law, only hotels with a foreign guest permit can accommodate foreign nationals. When booking, look for hotels marked as accepting foreign guests on international booking platforms. Budget hotels, guesthouses, and some Airbnb-style rentals may not have this permit and may refuse you.",
    },
    {
      question: "What is the accommodation registration requirement?",
      answer:
        "Foreigners must register their accommodation within 24 hours of arrival in cities (72 hours in rural areas). If staying at a qualified hotel, they handle this registration automatically. If staying in a private residence or unregistered accommodation, you must personally register at the local police station with your passport and the host's ID.",
    },
  ],
  Healthcare: [
    {
      question: "What should I do if I need medical help in China?",
      answer:
        "For emergencies, dial 120 for an ambulance. Major cities have international hospitals and clinics with English-speaking staff (e.g., United Family Healthcare, Raffles Medical). Bring your passport and insurance information. Travel health insurance with medical evacuation coverage is strongly recommended.",
    },
    {
      question: "Can I use my international health insurance in China?",
      answer:
        "Some international hospitals in China accept international insurance directly or can provide documentation for reimbursement. However, many hospitals require upfront payment regardless of insurance coverage. Check with your provider about China coverage before traveling, and consider purchasing supplemental travel medical insurance.",
    },
  ],
  "Legal & Safety": [
    {
      question: "What should I do if I lose my passport in China?",
      answer:
        "First, immediately report the loss to the nearest police station and obtain a loss report (a requirement for getting a replacement). Then contact your country's embassy or consulate to apply for an emergency travel document. Finally, visit the Exit-Entry Administration to obtain an exit permit before you can leave China.",
    },
    {
      question: "What is the emergency number in China?",
      answer:
        "Main emergency numbers: Police 110, Fire 119, Ambulance 120, Traffic Accident 122. These are free and work nationwide. English-speaking operators may not always be available, so having a Chinese speaker assist you is helpful. Save your embassy's emergency contact number as a backup.",
    },
  ],
  Departure: [
    {
      question: "Can I get a tax refund when leaving China?",
      answer:
        "Yes. Foreign tourists can claim VAT refunds on eligible goods purchased from designated tax-free stores. Present your passport, purchase receipts, completed tax refund form, and the goods at the customs counter before check-in at the departure airport. The refund processing area is typically located after security.",
    },
    {
      question: "What happens if I overstay my visa in China?",
      answer:
        "Overstaying is a serious violation. Penalties include fines (typically 500 RMB per day, capped at 10,000 RMB), administrative detention, and possible deportation with a future entry ban of 1-10 years. If you realize you have overstayed, go to the nearest Exit-Entry Administration immediately to resolve the situation voluntarily—this may reduce penalties.",
    },
  ],
};

export default function FAQPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    const next = new Set(openItems);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setOpenItems(next);
  };

  const filteredCategories = Object.entries(FAQ_DATA)
    .map(([category, items]) => {
      if (!searchQuery.trim()) return [category, items] as const;
      const filtered = items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return [category, filtered] as const;
    })
    .filter(([, items]) => items.length > 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("faq.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-secondary">
          {t("faq.subtitle")}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder={t("faq.search_placeholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* FAQ Categories */}
      {filteredCategories.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-secondary">
            {t("search.no_results")}
          </p>
        </div>
      )}

      {filteredCategories.map(([category, items]) => (
        <section key={category} className="mb-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {category}
          </h2>
          <div className="space-y-3">
            {items.map((item, index) => {
              const isOpen = openItems.has(`${category}-${index}`);
              return (
                <div
                  key={index}
                  className={`faq-item${isOpen ? " open" : ""}`}
                >
                  <button
                    onClick={() => toggleItem(category, index)}
                    className="faq-trigger"
                  >
                    <span className="pr-4 text-sm">{item.question}</span>
                    <ChevronDown className="faq-chevron h-4 w-4 shrink-0" />
                  </button>
                  {isOpen && (
                    <div className="faq-content">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
