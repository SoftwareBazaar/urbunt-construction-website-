import { useState } from "react";
import { HardHat, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Audience = "admin" | "client";

const copy: Record<
  Audience,
  { eyebrow: string; title: string; intro: string; Icon: typeof Shield; allowSignup: boolean }
> = {
  admin: {
    eyebrow: "Team access",
    title: "Admin sign in",
    intro: "Sign in with your Urban T staff account to manage projects, content and clients.",
    Icon: Shield,
    allowSignup: false,
  },
  client: {
    eyebrow: "Client portal",
    title: "Project portal sign in",
    intro: "Track live progress, milestones, schedule and documents for your build.",
    Icon: HardHat,
    allowSignup: true,
  },
};

export function AccessLogin({
  audience,
  onSuccess,
}: {
  audience: Audience;
  onSuccess: () => void;
}) {
  const meta = copy[audience];
  const Icon = meta.Icon;
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const trimmed = email.trim();
    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email: trimmed, password })
        : await supabase.auth.signUp({
            email: trimmed,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}${audience === "admin" ? "/admin" : "/portal"}`,
            },
          });

    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    onSuccess();
  }

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl font-extrabold tracking-tight">URBAN T</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-accent">{meta.eyebrow}</p>
        </div>

        <div className="surface-card p-8">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
              <Icon className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{meta.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{meta.intro}</p>
            </div>
          </div>

          {meta.allowSignup ? (
            <div className="mb-5 flex gap-2">
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

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor={`${audience}-email`} className="text-sm font-medium">
                Email
              </label>
              <input
                id={`${audience}-email`}
                type="email"
                required
                maxLength={255}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor={`${audience}-password`} className="text-sm font-medium">
                Password
              </label>
              <input
                id={`${audience}-password`}
                type="password"
                required
                minLength={8}
                maxLength={72}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
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

          <p className="mt-5 text-center text-xs text-muted-foreground">
            {audience === "admin" ? (
              <>
                Client project access is at{" "}
                <a href="/portal" className="font-bold text-foreground underline-offset-2 hover:underline">
                  /portal
                </a>
              </>
            ) : (
              <>
                Staff login is at{" "}
                <a href="/admin" className="font-bold text-foreground underline-offset-2 hover:underline">
                  /admin
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
