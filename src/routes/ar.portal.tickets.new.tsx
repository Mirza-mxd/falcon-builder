import { createFileRoute } from "@tanstack/react-router";
import { PortalNewTicketPage } from "@/pages/PortalPages";
export const Route = createFileRoute("/ar/portal/tickets/new")({ component: PortalNewTicketPage });
