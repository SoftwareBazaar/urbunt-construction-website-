import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout, PageHero } from "@/components/SiteLayout";

const authSearchSchema = z.object({
  next: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/auth")({
  validateSearch: authSearchSchema,
  head: ({ match }) => {
    const next = match.search.next ?? "";
    const isAdmin = next.startsWith("/admin") || next.startsWith("/leads");
    return {
      meta: [
        {
          title: isAdmin
            ? "Admin Sign In | Urban T Construction Co."
            : "Client Portal Sign In | Urban T Construction Co.",
        },
        {
          name: "description",
          content: isAdmin
            ? "Staff sign-in for the Urban T admin dashboard."
            : "Client sign-in for the Urban T project portal.",
        },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const isAdminIntent = !!next && (next.startsWith("/admin") || next.startsWith("/leads"));

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function resolveDestination() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return (next && next.startsWith("/") ? next : "/portal") as string;

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .limit(1);

    const isStaff = (data ?? []).some((r) => r.role === "admin" || r.role === "staff");
    const requested = next && next.startsWith("/") ? next : null;

    if (requested?.startsWith("/admin") || requested?.startsWith("/leads")) {
      return isStaff ? requested : "/portal";
    }
    if (requested === "/portal") return "/portal";
    return isStaff ? "/admin" : "/portal";
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        navigate({ to: (await resolveDestination()) as "/admin" | "/portal" | "/leads" });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, next]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const redirectTo = `${window.location.origin}${
      next?.startsWith("/") ? next : isAdminIntent ? "/admin" : "/portal"
    }`;
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email: email.trim(), password })
        : supabase.auth.signUp({
            email: email.trim(),
            password,
            options: { emailRedirectTo: redirectTo },
          });
    const { error: err } = await fn;
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    navigate({ to: (await resolveDestination()) as "/admin" | "/portal" | "/leads" });
  }

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <SiteLayout>
      <PageHero
        eyebrow={isAdminIntent ? "Team access" : "Client & team access"}
        title={isAdminIntent ? "Admin sign in" : "Sign in to your project portal"}
        intro={
          isAdminIntent
            ? "Staff accounts land in the admin dashboard to manage projects, content and clients."
            : "Clients track live progress, milestones, site photos and documents. Team members can continue to /admin."
        }
      />

      <section className="container-x py-16">
        <div className="surface-card mx-auto max-w-md p-8">
          {!isAdminIntent ? (
            <div className="flex gap-2">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex-1 border px-3 py-2 font-display text-sm font-bold uppercase ${
                    mode === m ? "border-accent bg-accent text-accent-foreground" : "border-border"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>
          ) : null}

          <form onSubmit={submit} className={`space-y-4 ${isAdminIntent ? "" : "mt-5"}`}>
            <div>
              <label htmlFor="auth-email" className="text-sm font-medium">
                Work email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={8}
                maxLength={72}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
              />
            </div>
            {error ? <p className="text-sm text-accent">{error}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-accent px-5 py-3 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Share{" "}
            <a href="/admin" className="font-bold text-foreground underline-offset-2 hover:underline">
              /admin
            </a>{" "}
            with staff and{" "}
            <a href="/portal" className="font-bold text-foreground underline-offset-2 hover:underline">
              /portal
            </a>{" "}
            with clients — each page has its own sign-in.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
