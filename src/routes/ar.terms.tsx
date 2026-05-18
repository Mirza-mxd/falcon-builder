import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPage";
export const Route = createFileRoute("/ar/terms")({ component: () => <LegalPage kind="terms" /> });
