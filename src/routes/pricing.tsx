import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PricingPage";
export const Route = createFileRoute("/pricing")({ component: Page });
