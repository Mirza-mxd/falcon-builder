import { createFileRoute } from "@tanstack/react-router";
import { PortalTicketsPage } from "@/pages/PortalPages";
export const Route = createFileRoute("/ar/portal/tickets/")({ component: PortalTicketsPage });
