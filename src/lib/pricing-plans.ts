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

export function isPlanKey(v: unknown): v is PlanKey {
  return typeof v === "string" && v in PLAN_DETAILS;
}
