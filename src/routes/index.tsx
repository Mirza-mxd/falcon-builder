import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Falcon Smart Solutions — Enterprise ERP for Saudi Arabia & MENA" },
      {
        name: "description",
        content:
          "ZATCA-compliant, Arabic-native ERP. Falcon Desktop, Falcon Cloud and certified Odoo services. Go live in 4–8 weeks.",
      },
      { property: "og:title", content: "Falcon Smart Solutions — Enterprise ERP" },
      {
        property: "og:description",
        content: "Enterprise ERP. Half the price. Built for the Middle East.",
      },
    ],
  }),
  component: HomePage,
});
