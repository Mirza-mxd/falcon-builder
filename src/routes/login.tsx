import { createFileRoute } from "@tanstack/react-router";
import { PortalLoginPage } from "@/pages/PortalPages";
export const Route = createFileRoute("/login")({ component: PortalLoginPage });
