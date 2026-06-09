export const COMPANY = {
  name: { en: "Falcon Smart Solutions", ar: "فالكون للحلول الذكية" },
  website: "falcon-it.sa",
  email: "info@falcon-it.sa",
  phone: { ksa: "+966568051090", egypt: "+966568051090" },
  whatsapp: "966568051090",
  address: {
    ksa: { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" },
    egypt: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  },
  social: {
    linkedin: "https://linkedin.com/company/falcon-smart-solutions",
    twitter: "https://twitter.com/falconsmart",
    facebook: "https://facebook.com/falconsmartsolutions",
    instagram: "https://instagram.com/falconsmart",
    youtube: "https://youtube.com/@falconsmart",
  },
  demo: "https://erp.falcon-v.com",
} as const;

export const NAV_ITEMS = [
  { key: "home", href: "/" },
  {
    key: "products",
    href: "/products",
    children: [
      { key: "falconDesktop", href: "/products/falcon-erp-desktop" },
      { key: "falconCloud", href: "/products/falcon-cloud" },
      { key: "odooServices", href: "/products/odoo-services" },
    ],
  },
  { key: "pricing", href: "/pricing" },
  { key: "demo", href: "/demo" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const INDUSTRIES = [
  "retail",
  "manufacturing",
  "construction",
  "logistics",
  "healthcare",
  "hospitality",
] as const;

export const STATS = [
  { value: 376, suffix: "+", key: "clients" },
  { value: 4927, suffix: "+", key: "users" },
  { value: 893000, suffix: "+", key: "transactions" },
] as const;
