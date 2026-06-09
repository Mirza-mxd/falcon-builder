export type PlanKey =
  | "odoo-essentials"
  | "odoo-business"
  | "odoo-enterprise"
  | "falcon-desktop-essentials"
  | "falcon-desktop-business"
  | "falcon-desktop-enterprise"
  | "falcon-cloud-setup"
  | "falcon-cloud-per-user";

export interface PlanDetail {
  name: string;
  desc: string;
  price: string;
  period: string;
}

export const PLAN_DETAILS: Record<PlanKey, PlanDetail> = {
  "odoo-essentials": {
    name: "Odoo Implementation: Essentials",
    desc: "Up to 10 users, single site. The starting point for businesses outgrowing basic accounting.",
    price: "SAR 8,000",
    period: "build (one-time) · Year-1 Basic support included",
  },
  "odoo-business": {
    name: "Odoo Implementation: Business",
    desc: "10–30 users, multi-branch. For mid-sized businesses running multiple departments.",
    price: "SAR 15,000",
    period: "build (one-time) · Year-1 Standard support included",
  },
  "odoo-enterprise": {
    name: "Odoo Implementation: Enterprise",
    desc: "30+ users, multi-company. Manufacturing, multi-branch, complex operations.",
    price: "SAR 25,000",
    period: "build (one-time) · Year-1 Pro support included",
  },
  "falcon-desktop-essentials": {
    name: "Falcon ERP Desktop: Essentials",
    desc: "Up to 10 users, single site. Core accounting, sales, invoicing, inventory, ZATCA.",
    price: "SAR 10,000",
    period: "licence + implementation",
  },
  "falcon-desktop-business": {
    name: "Falcon ERP Desktop: Business",
    desc: "10–30 users, multi-branch. Adds purchasing, HR, payroll, projects, multi-warehouse.",
    price: "SAR 18,000",
    period: "licence + implementation",
  },
  "falcon-desktop-enterprise": {
    name: "Falcon ERP Desktop: Enterprise",
    desc: "30+ users, multi-company. Adds manufacturing, maintenance, consolidation.",
    price: "SAR 30,000",
    period: "licence + implementation",
  },
  "falcon-cloud-setup": {
    name: "Falcon ERP Cloud: Setup",
    desc: "One-time provisioning, configuration, data import, training, and go-live.",
    price: "SAR 1,500",
    period: "one-time setup",
  },
  "falcon-cloud-per-user": {
    name: "Falcon ERP Cloud: Per user",
    desc: "Fully managed SaaS. Hosting, updates, backups, and support all included.",
    price: "SAR 50",
    period: "/ user / month",
  },
};

export const PLAN_DETAILS_AR: Record<PlanKey, PlanDetail> = {
  "odoo-essentials": {
    name: "تنفيذ أودو: الأساسية",
    desc: "حتى 10 مستخدمين، موقع واحد. نقطة البداية للشركات التي تجاوزت المحاسبة الأساسية.",
    price: "8,000 ر.س",
    period: "تنفيذ (مرة واحدة) · دعم Basic للسنة الأولى",
  },
  "odoo-business": {
    name: "تنفيذ أودو: الأعمال",
    desc: "من 10 إلى 30 مستخدمًا، متعدد الفروع. للشركات المتوسطة بأقسام متعددة.",
    price: "15,000 ر.س",
    period: "تنفيذ (مرة واحدة) · دعم Standard للسنة الأولى",
  },
  "odoo-enterprise": {
    name: "تنفيذ أودو: المؤسسات",
    desc: "أكثر من 30 مستخدمًا، متعدد الشركات. تصنيع وفروع متعددة وعمليات معقدة.",
    price: "25,000 ر.س",
    period: "تنفيذ (مرة واحدة) · دعم Pro للسنة الأولى",
  },
  "falcon-desktop-essentials": {
    name: "فالكون ERP ديسكتوب: الأساسية",
    desc: "حتى 10 مستخدمين، موقع واحد. محاسبة ومبيعات وفوترة ومخزون وفاتورة ZATCA.",
    price: "10,000 ر.س",
    period: "الترخيص + التنفيذ",
  },
  "falcon-desktop-business": {
    name: "فالكون ERP ديسكتوب: الأعمال",
    desc: "من 10 إلى 30 مستخدمًا، متعدد الفروع. يضيف المشتريات والموارد البشرية والرواتب والمشاريع.",
    price: "18,000 ر.س",
    period: "الترخيص + التنفيذ",
  },
  "falcon-desktop-enterprise": {
    name: "فالكون ERP ديسكتوب: المؤسسات",
    desc: "أكثر من 30 مستخدمًا، متعدد الشركات. يضيف التصنيع والصيانة والتوحيد المالي.",
    price: "30,000 ر.س",
    period: "الترخيص + التنفيذ",
  },
  "falcon-cloud-setup": {
    name: "فالكون ERP كلاود: الإعداد",
    desc: "إعداد لمرة واحدة، تكوين، استيراد بيانات، تدريب، وانطلاق التشغيل.",
    price: "1,500 ر.س",
    period: "إعداد لمرة واحدة",
  },
  "falcon-cloud-per-user": {
    name: "فالكون ERP كلاود: لكل مستخدم",
    desc: "SaaS مُدار بالكامل. الاستضافة والتحديثات والنسخ الاحتياطي والدعم مشمولة.",
    price: "50 ر.س",
    period: "/ مستخدم / شهر",
  },
};

export function isPlanKey(v: unknown): v is PlanKey {
  return typeof v === "string" && v in PLAN_DETAILS;
}
