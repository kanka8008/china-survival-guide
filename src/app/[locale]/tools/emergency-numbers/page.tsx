import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  Shield,
  Flag,
  Ambulance,
  Flame,
  Info,
} from "lucide-react";

const NATIONAL_EMERGENCY = [
  {
    service: "Police (Public Security)",
    number: "110",
    icon: Shield,
    description:
      "General law enforcement, personal safety, theft, and security incidents",
  },
  {
    service: "Fire Brigade",
    number: "119",
    icon: Flame,
    description: "Fire emergencies, building collapses, and disaster rescue",
  },
  {
    service: "Ambulance (Medical Emergency)",
    number: "120",
    icon: Ambulance,
    description:
      "Medical emergencies requiring immediate attention and hospital transport",
  },
  {
    service: "Traffic Accident",
    number: "122",
    icon: Info,
    description:
      "Road traffic accidents, hit-and-run, and traffic-related disputes",
  },
  {
    service: "Maritime Search & Rescue",
    number: "12395",
    icon: Info,
    description:
      "Water and maritime emergencies requiring search and rescue operations",
  },
  {
    service: "Railway Police",
    number: "12306",
    icon: Info,
    description: "Security and incidents at train stations and on trains",
  },
];

const NON_EMERGENCY = [
  {
    service: "Immigration / Exit-Entry Administration",
    number: "12367",
    icon: Flag,
    description:
      "Visa issues, lost passports, residence permits, and entry/exit inquiries. English service available.",
  },
  {
    service: "Government Service Hotline",
    number: "12345",
    icon: Info,
    description:
      "General inquiries, complaints, and non-emergency government assistance",
  },
  {
    service: "Consumer Complaint",
    number: "12315",
    icon: Info,
    description:
      "Consumer rights violations, product quality complaints, and disputes",
  },
  {
    service: "Taxi Dispatch / Complaint",
    number: "12328",
    icon: Info,
    description:
      "Transportation service complaints including taxis and ride-hailing",
  },
];

const EMBASSY_CONTACTS = [
  {
    country: "United States",
    phone: "+86-10-8531-4000",
    address: "No. 55 An Jia Lou Road, Beijing",
    website: "usembassy-china.org.cn",
  },
  {
    country: "United Kingdom",
    phone: "+86-10-5192-4000",
    address: "11 Guang Hua Lu, Beijing",
    website: "gov.uk/world/china",
  },
  {
    country: "Canada",
    phone: "+86-10-5139-4000",
    address: "19 Dong Zhi Men Wai Dajie, Beijing",
    website: "canadainternational.gc.ca/china-chine",
  },
  {
    country: "Australia",
    phone: "+86-10-5140-4111",
    address: "21 Dong Zhi Men Wai Dajie, Beijing",
    website: "china.embassy.gov.au",
  },
  {
    country: "Germany",
    phone: "+86-10-8532-9000",
    address: "17 Dong Zhi Men Wai Dajie, Beijing",
    website: "china.diplo.de",
  },
  {
    country: "France",
    phone: "+86-10-8531-2000",
    address: "3 San Li Tun Dongsanjie, Beijing",
    website: "cn.ambafrance.org",
  },
  {
    country: "Japan",
    phone: "+86-10-6532-2361",
    address: "7 Ri Tan Lu, Beijing",
    website: "cn.emb-japan.go.jp",
  },
  {
    country: "South Korea",
    phone: "+86-10-8531-0700",
    address: "No. 20 Dong Fang Dong Lu, Beijing",
    website: "overseas.mofa.go.kr/cn-zh",
  },
  {
    country: "Russia",
    phone: "+86-10-6532-2051",
    address: "4 Dong Zhi Men Nei Bei Zhongjie, Beijing",
    website: "beijing.mid.ru",
  },
  {
    country: "India",
    phone: "+86-10-8531-2500",
    address: "5 Liang Ma Qiao Bei Jie, Beijing",
    website: "eobeijing.gov.in",
  },
  {
    country: "Brazil",
    phone: "+86-10-6532-2881",
    address: "27 Guang Hua Lu, Beijing",
    website: "pequim.itamaraty.gov.br",
  },
  {
    country: "South Africa",
    phone: "+86-10-8532-0000",
    address: "5 Dong Zhi Men Wai Dajie, Beijing",
    website: "dirco.gov.za/beijing",
  },
  {
    country: "Singapore",
    phone: "+86-10-6532-1115",
    address: "1 Xiu Shui Bei Jie, Beijing",
    website: "mfa.gov.sg/beijing",
  },
  {
    country: "New Zealand",
    phone: "+86-10-6532-2731",
    address: "1 Ri Tan Lu Dong Er Jie, Beijing",
    website: "mfat.govt.nz/china",
  },
];

export default async function EmergencyNumbersPage({
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
          className="mb-4 inline-flex items-center text-sm text-secondary transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {t("nav.tools")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("tools.emergency_numbers")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-secondary">
          Essential phone numbers for emergencies and important services in
          China. Save these numbers before your trip.
        </p>

        {/* Emergency Note */}
        <div className="mt-5 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">
            Important
          </p>
          <p className="mt-1 text-sm text-red-700">
            For life-threatening emergencies, dial 110 (Police) or 120
            (Ambulance). English-speaking operators may not always be available.
            If possible, have a Chinese speaker assist you with the call.
          </p>
        </div>
      </div>

      {/* National Emergency Numbers */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          National Emergency Numbers
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Service
                  </th>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Number
                  </th>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {NATIONAL_EMERGENCY.map((item) => {
                  const Icon = item.icon;
                  return (
                    <tr
                      key={item.service}
                      className="transition-colors hover:bg-muted"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-red-500" />
                          <span className="font-medium text-foreground">
                            {item.service}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex rounded bg-red-50 px-2.5 py-0.5 font-mono text-sm font-bold text-red-700">
                          {item.number}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-secondary">
                        {item.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Non-Emergency Numbers */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Important Non-Emergency Numbers
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Service
                  </th>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Number
                  </th>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {NON_EMERGENCY.map((item) => {
                  const Icon = item.icon;
                  return (
                    <tr
                      key={item.service}
                      className="transition-colors hover:bg-muted"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-foreground">
                            {item.service}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex rounded bg-blue-50 px-2.5 py-0.5 font-mono text-sm font-bold text-blue-700">
                          {item.number}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-secondary">
                        {item.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Embassy Contact Information */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Embassy Emergency Contacts
        </h2>
        <p className="mb-4 text-sm text-secondary">
          Contact information for major embassies in Beijing. Most embassies
          also have consulates in Shanghai, Guangzhou, Chengdu, and other major
          cities. For after-hours emergency assistance, contact your embassy
          directly.
        </p>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Country
                  </th>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Phone
                  </th>
                  <th className="px-5 py-3 font-semibold text-foreground">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {EMBASSY_CONTACTS.map((embassy) => (
                  <tr
                    key={embassy.country}
                    className="transition-colors hover:bg-muted"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-muted-foreground" />
                        {embassy.country}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-sm text-secondary">
                        {embassy.phone}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-secondary">
                      {embassy.address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        All numbers are for informational purposes. Embassy contact details may
        change &mdash; always verify with your embassy&apos;s official website.
      </p>
    </div>
  );
}
