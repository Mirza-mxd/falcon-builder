import { createFileRoute } from "@tanstack/react-router";
import { OdooServicesPage } from "@/pages/ProductDetailPages";
export const Route = createFileRoute("/products/odoo-services")({ component: OdooServicesPage });
