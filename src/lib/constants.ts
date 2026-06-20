import type { StageInfo } from "@/types/article";

export const SITE_NAME = "China Survival Guide";
export const SITE_DOMAIN = "chinavisaentry.com";

export const STAGES: StageInfo[] = [
  {
    id: "pre-entry",
    slug: "pre-entry",
    titleKey: "stages.pre_entry.title",
    descriptionKey: "stages.pre_entry.description",
    icon: "PlaneTakeoff",
    color: "#2563EB",
    order: 1,
  },
  {
    id: "border-crossing",
    slug: "border-crossing",
    titleKey: "stages.border_crossing.title",
    descriptionKey: "stages.border_crossing.description",
    icon: "Scan",
    color: "#7C3AED",
    order: 2,
  },
  {
    id: "first-72-hours",
    slug: "first-72-hours",
    titleKey: "stages.first_72_hours.title",
    descriptionKey: "stages.first_72_hours.description",
    icon: "Clock",
    color: "#059669",
    order: 3,
  },
  {
    id: "daily-survival",
    slug: "daily-survival",
    titleKey: "stages.daily_survival.title",
    descriptionKey: "stages.daily_survival.description",
    icon: "Compass",
    color: "#D97706",
    order: 4,
  },
  {
    id: "emergency",
    slug: "emergency",
    titleKey: "stages.emergency.title",
    descriptionKey: "stages.emergency.description",
    icon: "AlertTriangle",
    color: "#DC2626",
    order: 5,
  },
  {
    id: "departure",
    slug: "departure",
    titleKey: "stages.departure.title",
    descriptionKey: "stages.departure.description",
    icon: "PlaneLanding",
    color: "#0891B2",
    order: 6,
  },
];

export const QUICK_TOOLS = [
  { id: "visa-free", slug: "visa-free", icon: "Globe", titleKey: "tools.visa_free", href: "/tools/visa-free" },
  { id: "prohibited-items", slug: "prohibited-items", icon: "Ban", titleKey: "tools.prohibited_items", href: "/tools/prohibited-items" },
  { id: "emergency-numbers", slug: "emergency-numbers", icon: "Phone", titleKey: "tools.emergency_numbers", href: "/tools/emergency-numbers" },
  { id: "transit-visa", slug: "transit-visa", icon: "Route", titleKey: "tools.transit_visa", href: "/tools/transit-visa" },
] as const;
