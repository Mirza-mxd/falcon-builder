import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PricingChoosePage";

type PricingChooseSearch = { plan?: string };

export const Route = createFileRoute("/ar/pricing/choose")({
  component: Page,
  validateSearch: (search: Record<string, unknown>): PricingChooseSearch => ({
    plan: typeof search.plan === "string" ? search.plan : undefined,
  }),
});
