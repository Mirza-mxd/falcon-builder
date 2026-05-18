import { createFileRoute } from "@tanstack/react-router";
import { PortalTicketDetailPage } from "@/pages/PortalPages";

export const Route = createFileRoute("/ar/portal/tickets/$id")({
  component: RouteComp,
});

function RouteComp() {
  const { id } = Route.useParams();
  return <PortalTicketDetailPage id={id} />;
}
