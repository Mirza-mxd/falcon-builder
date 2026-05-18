import { createFileRoute } from "@tanstack/react-router";
import { CareersPage } from "@/pages/SimplePages";
export const Route = createFileRoute("/careers")({ component: CareersPage });
