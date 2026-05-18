import { createFileRoute } from "@tanstack/react-router";
import { PortalHomePage } from "@/pages/PortalPages";
export const Route = createFileRoute("/portal/")({ component: PortalHomePage });
