import { createFileRoute } from "@tanstack/react-router";
import { WebinarsPage } from "@/pages/SimplePages";
export const Route = createFileRoute("/ar/webinars")({ component: WebinarsPage });
