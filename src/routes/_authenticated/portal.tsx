import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  HardHat,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { whatsappLink } from "@/data/site";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({
    meta: [
      { title: "Client Portal | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Track your build in real time: progress, milestones, site updates and project documents from your Urban T project team.",
      },
      { property: "og:title", content: "Client Portal | Urban T Construction Co." },
      { property: "og:description", content: "Live progress, milestones and site updates for your Urban T project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ClientPortal,
});

const money = (n: number | null) =>
  n == null ? "—" : `KES ${new Intl.NumberFormat("en-KE").format(n)}`;

const date = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }) : "—";

function ClientPortal() {
  const qc = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);

  const projects = useQuery({
    queryKey: ["portal", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const list = projects.data ?? [];
  const current = list.find((p) => p.id === activeId) ?? list[0] ?? null;

  const detail = useQuery({
    queryKey: ["portal", "detail", current?.id],
    enabled: !!current?.id,
    queryFn: async () => {
      const id = current!.id;
      const [milestones, updates, documents] = await Promise.all([
        supabase.from("project_milestones").select("*").eq("project_id", id).order("position"),
        supabase.from("project_updates").select("*").eq("project_id", id).order("posted_at", { ascending: false }),
        supabase.from("project_documents").select("*").eq("project_id", id).order("created_at", { ascending: false }),
      ]);
      if (milestones.error) throw milestones.error;
      if (updates.error) throw updates.error;
      if (documents.error) throw documents.error;
      return {
        milestones: milestones.data,
        updates: updates.data,
        documents: documents.data,
      };
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <p className="eyebrow text-gold">Client portal</p>
            <h1 className="mt-1 font-display text-2xl font-extrabold">Your projects</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="opacity-80 hover:opacity-100">View site</Link>
            <button
              type="button"
              onClick={async () => {
                await qc.cancelQueries();
                qc.clear();
                await supabase.auth.signOut();
                window.location.href = "/auth";
              }}
              className="font-display text-sm font-bold uppercase text-gold"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container-x py-10">
        {projects.isLoading ? (
          <p className="text-muted-foreground">Loading your projects…</p>
        ) : projects.error ? (
          <p className="text-muted-foreground">We couldn't load your projects. Please refresh and try again.</p>
        ) : !current ? (
          <div className="surface-card p-8">
            <h2 className="text-2xl">No active project yet</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Once your contract is signed, your project manager activates this portal — you'll see live
              progress, milestone dates, weekly site photos and every document in one place.
            </p>
            <a
              href={whatsappLink("Hi Urban T, I'd like access to my project portal.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-whatsapp px-5 py-3 font-display text-sm font-bold uppercase text-whatsapp-foreground"
            >
              <MessageCircle className="size-4" /> Ask your project manager
            </a>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-2">
              {list.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  className={`w-full border p-4 text-left transition-colors ${
                    p.id === current.id ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                  }`}
                >
                  <p className="font-display font-bold">{p.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {p.project_type} · {p.status}
                  </p>
                  <div className="mt-3 h-1.5 w-full bg-border">
                    <div className="h-1.5 bg-accent" style={{ width: `${p.progress}%` }} />
                  </div>
                </button>
              ))}
            </aside>

            <div className="space-y-8">
              <section className="surface-card p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl">{current.title}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-4 text-accent" /> {current.location ?? "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-4xl font-extrabold text-accent">{current.progress}%</p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Complete</p>
                  </div>
                </div>

                <div className="mt-6 h-2 w-full bg-border">
                  <div className="h-2 bg-accent" style={{ width: `${current.progress}%` }} />
                </div>

                <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <Stat icon={HardHat} label="Current stage" value={current.current_stage} />
                  <Stat icon={CalendarDays} label="Started" value={date(current.start_date)} />
                  <Stat icon={Clock} label="Target handover" value={date(current.target_date)} />
                  <Stat icon={FileText} label="Contract value" value={money(current.contract_value)} />
                </dl>

                {current.manager_name ? (
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5">
                    <p className="text-sm">
                      Project manager: <span className="font-bold">{current.manager_name}</span>
                    </p>
                    {current.manager_phone ? (
                      <a
                        href={`tel:${current.manager_phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-accent"
                      >
                        <Phone className="size-4" /> {current.manager_phone}
                      </a>
                    ) : null}
                    <a
                      href={whatsappLink(`Hi Urban T, a question about my project: ${current.title}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-whatsapp px-4 py-2 font-display text-xs font-bold uppercase text-whatsapp-foreground"
                    >
                      <MessageCircle className="size-4" /> Message the team
                    </a>
                  </div>
                ) : null}
              </section>

              <section className="grid gap-8 lg:grid-cols-2">
                <div className="surface-card p-6">
                  <p className="eyebrow">Milestones</p>
                  <ol className="mt-4 space-y-4">
                    {(detail.data?.milestones ?? []).map((m) => (
                      <li key={m.id} className="flex gap-3">
                        {m.status === "complete" ? (
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                        ) : (
                          <Circle
                            className={`mt-0.5 size-5 shrink-0 ${
                              m.status === "in_progress" ? "text-accent" : "text-muted-foreground/50"
                            }`}
                          />
                        )}
                        <div>
                          <p className="font-display font-bold">{m.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {m.status === "complete"
                              ? `Completed ${date(m.actual_date)}`
                              : `Planned ${date(m.planned_date)}`}
                            {m.weight ? ` · ${m.weight}% of contract` : ""}
                          </p>
                          {m.notes ? <p className="mt-1 text-sm text-muted-foreground">{m.notes}</p> : null}
                        </div>
                      </li>
                    ))}
                    {detail.data && detail.data.milestones.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Milestones are being scheduled.</p>
                    ) : null}
                  </ol>
                </div>

                <div className="surface-card p-6">
                  <p className="eyebrow">Site updates</p>
                  <div className="mt-4 space-y-5">
                    {(detail.data?.updates ?? []).map((u) => (
                      <article key={u.id} className="border-l-2 border-accent pl-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{date(u.posted_at)}</p>
                        <p className="mt-1 font-display font-bold">{u.title}</p>
                        {u.body ? <p className="mt-1 text-sm text-muted-foreground">{u.body}</p> : null}
                        {u.photo_url ? (
                          <img
                            src={u.photo_url}
                            alt={u.title}
                            loading="lazy"
                            className="mt-3 aspect-video w-full object-cover"
                          />
                        ) : null}
                      </article>
                    ))}
                    {detail.data && detail.data.updates.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No site updates posted yet.</p>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="surface-card p-6">
                <p className="eyebrow">Documents</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {(detail.data?.documents ?? []).map((d) => (
                    <li key={d.id}>
                      <a
                        href={d.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 border border-border p-4 transition-colors hover:border-accent"
                      >
                        <FileText className="size-5 text-accent" />
                        <span>
                          <span className="block font-display font-bold">{d.name}</span>
                          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                            {d.doc_type}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                {detail.data && detail.data.documents.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Contracts, BOQs and permits will appear here as they are issued.
                  </p>
                ) : null}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof HardHat;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5 text-accent" /> {label}
      </dt>
      <dd className="mt-1 font-display font-bold">{value}</dd>
    </div>
  );
}
