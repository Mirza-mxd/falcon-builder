import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/pages/SimplePages";
export const Route = createFileRoute("/help")({ component: HelpPage });
