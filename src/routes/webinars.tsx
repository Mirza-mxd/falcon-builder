import { createFileRoute } from "@tanstack/react-router";
import { WebinarsPage } from "@/pages/SimplePages";
export const Route = createFileRoute("/webinars")({ component: WebinarsPage });
