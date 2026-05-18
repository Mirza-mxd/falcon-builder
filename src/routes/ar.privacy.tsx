import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPage";
export const Route = createFileRoute("/ar/privacy")({ component: () => <LegalPage kind="privacy" /> });
