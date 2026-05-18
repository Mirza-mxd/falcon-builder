import { createFileRoute } from "@tanstack/react-router";
import { PortalTicketsPage } from "@/pages/PortalPages";
export const Route = createFileRoute("/portal/tickets/")({ component: PortalTicketsPage });
