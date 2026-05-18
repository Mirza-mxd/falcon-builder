import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/DemoPage";
export const Route = createFileRoute("/demo")({ component: Page });
