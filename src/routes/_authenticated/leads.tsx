import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listLeads, updateLeadStatus } from "@/lib/leads.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/leads")({
  head: () => ({
    meta: [
      { title: "Lead Dashboard | Urban T Construction Co." },
      {
        name: "description",
        content: "Internal dashboard of every quote request, chat lead, application and subscriber.",
      },
      { property: "og:title", content: "Lead Dashboard | Urban T Construction Co." },
      { property: "og:description", content: "Internal Urban T lead pipeline." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LeadsDashboard,
});

const statuses = ["new", "contacted", "quoted", "won", "lost"] as const;

function LeadsDashboard() {
  const fetchAll = useServerFn(listLeads);
  const setStatus = useServerFn(updateLeadStatus);
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["crm"],
    queryFn: () => fetchAll(),
  });

  const mutate = useMutation({
    mutationFn: (vars: { id: string; status: (typeof statuses)[number] }) => setStatus({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm"] }),
  });

  const leads = data?.leads ?? [];
  const counts = statuses.map((s) => ({ s, n: leads.filter((l) => l.status === s).length }));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-5">
          <div>
            <p className="eyebrow text-gold">Internal CRM</p>
            <h1 className="mt-1 font-display text-2xl font-extrabold">Lead dashboard</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/admin" className="opacity-80 hover:opacity-100">Project Management</Link>
            <Link to="/" className="opacity-80 hover:opacity-100">View site</Link>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                qc.clear();
                window.location.href = "/auth";
              }}
              className="border border-primary-foreground/30 px-3 py-1.5 font-display text-xs font-bold uppercase"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-6 py-10">
        {isLoading ? <p className="text-muted-foreground">Loading pipeline…</p> : null}
        {error ? (
          <p className="border border-accent/40 bg-accent/10 p-4 text-sm">
            Could not load leads. Your account needs a staff or admin role to view this data.
          </p>
        ) : null}

        {data ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {counts.map((c) => (
                <div key={c.s} className="surface-card p-4">
                  <p className="font-display text-3xl font-extrabold text-accent">{c.n}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{c.s}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-2xl">Quote & chat leads</h2>
            <div className="mt-4 max-h-[60vh] overflow-auto rounded-sm border border-border">
              <table className="w-full min-w-[1100px] bg-card text-left text-sm">
                <thead className="sticky top-0 z-10 bg-secondary">
                  <tr>
                    {["Received", "Name", "Phone", "Scope", "Location", "Source", "Status"].map((h) => (
                      <th key={h} className="border-b border-border p-3 font-display uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-b border-border align-top last:border-0">
                      <td className="p-3 text-muted-foreground">
                        {new Date(l.created_at).toLocaleString("en-KE")}
                      </td>
                      <td className="p-3 font-medium">{l.name}</td>
                      <td className="p-3">
                        <a href={`tel:${l.phone}`} className="hover:text-accent">{l.phone}</a>
                        {l.email ? <p className="text-xs text-muted-foreground">{l.email}</p> : null}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {l.package_slug ?? (l.service_slugs ?? []).join(", ") ?? "—"}
                        {l.bundle_discount ? ` · ${l.bundle_discount}% bundle` : ""}
                        {l.estimate_low
                          ? ` · est. ${Math.round(l.estimate_low / 1e6)}–${Math.round((l.estimate_high ?? 0) / 1e6)}M`
                          : ""}
                      </td>
                      <td className="p-3 text-muted-foreground">{l.location ?? "—"}</td>
                      <td className="p-3 text-xs text-muted-foreground">
                        {l.source_channel} · {l.source_page ?? "—"}
                        {l.utm && Object.keys(l.utm as Record<string, string>).length
                          ? ` · ${Object.values(l.utm as Record<string, string>).join("/")}`
                          : ""}
                      </td>
                      <td className="p-3">
                        <select
                          aria-label={`Status for ${l.name}`}
                          value={l.status}
                          onChange={(e) =>
                            mutate.mutate({ id: l.id, status: e.target.value as (typeof statuses)[number] })
                          }
                          className="border border-input bg-background px-2 py-1 text-xs"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-muted-foreground">
                        No leads yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl">Applications</h2>
                <ul className="mt-4 max-h-[45vh] space-y-3 overflow-auto pr-1">
                  {(data.applications ?? []).map((a) => (
                    <li key={a.id} className="surface-card p-4 text-sm">
                      <p className="font-display font-bold">{a.name} — {a.role_title ?? "General"}</p>
                      <p className="text-muted-foreground">
                        {a.phone} · {a.applicant_type} · {a.experience ?? "—"} yrs
                      </p>
                    </li>
                  ))}
                  {(data.applications ?? []).length === 0 ? (
                    <li className="text-sm text-muted-foreground">No applications yet.</li>
                  ) : null}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl">Newsletter subscribers</h2>
                <ul className="mt-4 max-h-[45vh] space-y-2 overflow-auto pr-1 text-sm">
                  {(data.subscribers ?? []).map((s) => (
                    <li key={s.id} className="border-b border-border pb-2 text-muted-foreground">
                      {s.email}
                    </li>
                  ))}
                  {(data.subscribers ?? []).length === 0 ? (
                    <li className="text-muted-foreground">No subscribers yet.</li>
                  ) : null}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
