import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Client & Team Sign In | Urban T Construction Co." },
      {
        name: "description",
        content: "Secure sign-in for the Urban T Construction Co. sales team to access the lead dashboard.",
      },
      { property: "og:title", content: "Client & Team Sign In | Urban T Construction Co." },
      { property: "og:description", content: "Staff access to the Urban T lead dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function landing() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return "/portal" as const;
    
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .limit(1);
    
    const isStaff = (data ?? []).some((r) => r.role === "admin" || r.role === "staff");
    return isStaff ? ("/admin" as const) : ("/portal" as const);
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) navigate({ to: await landing() });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email: email.trim(), password })
        : supabase.auth.signUp({
            email: email.trim(),
            password,
            options: { emailRedirectTo: `${window.location.origin}/portal` },
          });
    const { error: err } = await fn;
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    navigate({ to: await landing() });
  }

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Client & team access"
        title="Sign in to your project portal"
        intro="Clients track live progress, milestones, site photos and documents. Team members land in the lead dashboard."
      />

      <section className="container-x py-16">
        <div className="surface-card mx-auto max-w-md p-8">
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


          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="auth-email" className="text-sm font-medium">Work email</label>
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
              <label htmlFor="auth-password" className="text-sm font-medium">Password</label>
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
            Dashboard data is visible only to accounts granted a staff or admin role.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
