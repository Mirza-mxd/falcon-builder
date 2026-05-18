import { useState, useEffect } from "react";
import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";
import LLink from "@/components/ui/LLink";

interface TicketMessage { from: "user" | "system"; text: string; at: string; }
interface Ticket { id: string; subject: string; description: string; status: "open" | "closed"; createdAt: string; messages?: TicketMessage[]; }

function loadTickets(): Ticket[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("falcon_tickets") || "[]"); } catch { return []; }
}
function saveTickets(t: Ticket[]) { localStorage.setItem("falcon_tickets", JSON.stringify(t)); }

export function PortalLoginPage() {
  const t = useTranslations("portal");
  const [email, setEmail] = useState("");
  return (
    <section className="bg-surface py-20">
      <Container>
        <FCard className="mx-auto max-w-md">
          <h1 className="mb-6 text-2xl font-bold text-text-primary">{t("loginTitle")}</h1>
          <form onSubmit={(e) => { e.preventDefault(); localStorage.setItem("falcon_portal_email", email); window.location.href = "/portal"; }} className="space-y-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder={t("emailPlaceholder")} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <input type="password" required placeholder={t("password")} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <FButton variant="primary" size="lg" type="submit" className="w-full">{t("loginButton")}</FButton>
          </form>
        </FCard>
      </Container>
    </section>
  );
}

export function PortalHomePage() {
  const t = useTranslations("portal");
  const tickets = typeof window !== "undefined" ? loadTickets() : [];
  return (
    <section className="bg-surface py-12">
      <Container>
        <h1 className="mb-6 text-3xl font-bold text-text-primary">{t("welcome")}</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FCard><div className="text-sm text-text-secondary">{t("openTickets")}</div><div className="mt-2 text-3xl font-bold text-primary-500">{tickets.filter(x => x.status === "open").length}</div></FCard>
          <FCard><div className="text-sm text-text-secondary">{t("closedTickets")}</div><div className="mt-2 text-3xl font-bold text-text-primary">{tickets.filter(x => x.status === "closed").length}</div></FCard>
          <FCard><div className="text-sm text-text-secondary">{t("totalTickets")}</div><div className="mt-2 text-3xl font-bold text-text-primary">{tickets.length}</div></FCard>
        </div>
        <div className="mt-6 flex gap-3">
          <FButton variant="cta" href="/portal/tickets/new">{t("newTicket")}</FButton>
          <FButton variant="outline" href="/portal/tickets">{t("myTickets")}</FButton>
        </div>
      </Container>
    </section>
  );
}

export function PortalTicketsPage() {
  const t = useTranslations("portal");
  const tickets = typeof window !== "undefined" ? loadTickets() : [];
  return (
    <section className="bg-surface py-12">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text-primary">{t("myTicketsTitle")}</h1>
          <FButton variant="cta" href="/portal/tickets/new">{t("newTicket")}</FButton>
        </div>
        {tickets.length === 0 ? (
          <FCard><p className="text-center text-text-secondary">{t("noTickets")}</p></FCard>
        ) : (
          <div className="space-y-3">
            {tickets.map((ti) => (
              <LLink key={ti.id} href={`/portal/tickets/${ti.id}`} className="block">
                <FCard className="transition hover:border-primary-200 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary">{ti.subject}</h3>
                      <p className="text-sm text-text-secondary">{ti.createdAt}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ti.status === "open" ? "bg-primary-50 text-primary-500" : "bg-gray-100 text-text-secondary"}`}>{ti.status}</span>
                  </div>
                </FCard>
              </LLink>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export function PortalNewTicketPage() {
  const t = useTranslations("portal");
  const [done, setDone] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const list = loadTickets();
    const id = crypto.randomUUID();
    const description = String(fd.get("description"));
    list.unshift({
      id,
      subject: String(fd.get("subject")),
      description,
      status: "open",
      createdAt: new Date().toLocaleDateString(),
      messages: [
        { from: "user", text: description, at: new Date().toISOString() },
      ],
    });
    saveTickets(list);
    setDone(true);
  }
  return (
    <section className="bg-surface py-12">
      <Container>
        <FCard className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-text-primary">{t("newTicketTitle")}</h1>
          {done ? (
            <div className="text-center">
              <div className="mb-3 text-4xl">✅</div>
              <p className="text-text-secondary">Ticket submitted.</p>
              <FButton variant="primary" href="/portal/tickets" className="mt-4">{t("myTickets")}</FButton>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <input name="subject" required placeholder={t("subject")} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
              <textarea name="description" required rows={6} placeholder={t("description")} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
              <FButton variant="cta" size="lg" type="submit">{t("submit")}</FButton>
            </form>
          )}
        </FCard>
      </Container>
    </section>
  );
}

export function PortalTicketDetailPage({ id }: { id: string }) {
  const t = useTranslations("portal");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    setTicket(loadTickets().find((x) => x.id === id) ?? null);
  }, [id]);

  function persist(next: Ticket) {
    setTicket(next);
    const all = loadTickets().map((t) => (t.id === next.id ? next : t));
    saveTickets(all);
  }

  function onReply(e: React.FormEvent) {
    e.preventDefault();
    if (!ticket || !reply.trim()) return;
    persist({
      ...ticket,
      messages: [
        ...(ticket.messages ?? []),
        { from: "user", text: reply.trim(), at: new Date().toISOString() },
      ],
    });
    setReply("");
  }

  function toggleStatus() {
    if (!ticket) return;
    persist({ ...ticket, status: ticket.status === "open" ? "closed" : "open" });
  }

  if (!ticket) {
    return (
      <section className="bg-surface py-20">
        <Container>
          <FCard className="mx-auto max-w-2xl text-center">
            <p className="text-text-secondary">Ticket not found.</p>
            <FButton variant="primary" href="/portal/tickets" className="mt-4">{t("myTickets")}</FButton>
          </FCard>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-surface py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <LLink href="/portal/tickets" className="text-sm text-primary-500 hover:underline">← {t("myTickets")}</LLink>
          </div>
          <FCard>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">{ticket.subject}</h1>
                <p className="mt-1 text-sm text-text-secondary">{t("created")}: {ticket.createdAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ticket.status === "open" ? "bg-primary-50 text-primary-500" : "bg-gray-100 text-text-secondary"}`}>{ticket.status}</span>
                <FButton variant="outline" size="sm" onClick={toggleStatus}>
                  {ticket.status === "open" ? "Close" : "Reopen"}
                </FButton>
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-semibold text-text-primary">{t("conversation")}</h2>
              <div className="space-y-3">
                {(ticket.messages ?? []).length === 0 ? (
                  <p className="text-sm text-text-secondary">{t("noMessages")}</p>
                ) : (
                  ticket.messages!.map((m, i) => (
                    <div key={i} className={`rounded-xl px-4 py-3 ${m.from === "user" ? "bg-primary-50 text-text-primary" : "bg-gray-100 text-text-secondary"}`}>
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-70">
                        {m.from === "user" ? "You" : t("system")}
                      </div>
                      <div className="whitespace-pre-wrap">{m.text}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {ticket.status === "open" && (
              <form onSubmit={onReply} className="mt-6 space-y-3 border-t border-gray-100 pt-4">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={4}
                  placeholder={t("replyPlaceholder")}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
                />
                <FButton variant="cta" type="submit" disabled={!reply.trim()}>{t("send")}</FButton>
              </form>
            )}
          </FCard>
        </div>
      </Container>
    </section>
  );
}
