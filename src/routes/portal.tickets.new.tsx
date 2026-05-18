import { createFileRoute } from "@tanstack/react-router";
import { PortalNewTicketPage } from "@/pages/PortalPages";
export const Route = createFileRoute("/portal/tickets/new")({ component: PortalNewTicketPage });
