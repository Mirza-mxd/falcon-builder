import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProductsPage";
export const Route = createFileRoute("/products/")({ component: Page });
