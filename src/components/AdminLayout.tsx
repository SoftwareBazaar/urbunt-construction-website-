import { Link, useNavigate } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  Inbox,
  Menu,
  X,
  Home,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AccessLogin } from "@/components/AccessLogin";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: Home },
  { to: "/admin/projects", label: "Projects", icon: LayoutDashboard },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/media", label: "Media", icon: Image },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/content", label: "Content", icon: Settings },
  { to: "/leads", label: "Leads", icon: Inbox },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const qc = useQueryClient();
  const navigate = useNavigate();

  const session = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) return null;
      return data.user;
    },
  });

  const roles = useQuery({
    queryKey: ["auth", "roles", session.data?.id],
    enabled: !!session.data?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.data!.id);
      if (error) throw error;
      return data ?? [];
    },
  });

  if (session.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!session.data) {
    return (
      <AccessLogin
        audience="admin"
        onSuccess={() => {
          qc.invalidateQueries({ queryKey: ["auth"] });
        }}
      />
    );
  }

  if (roles.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Checking access…
      </div>
    );
  }

  const isStaff = (roles.data ?? []).some((r) => r.role === "admin" || r.role === "staff");
  if (!isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="surface-card max-w-md p-8 text-center">
          <h1 className="text-xl font-bold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account does not have a staff or admin role. Use the client portal instead, or ask an
            administrator to grant access.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/portal"
              className="bg-accent px-4 py-2 font-display text-sm font-bold uppercase text-accent-foreground"
            >
              Open client portal
            </a>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                qc.clear();
                navigate({ to: "/admin" });
              }}
              className="border border-border px-4 py-2 text-sm font-bold"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed right-4 top-4 z-50 rounded border border-border bg-card p-2 lg:hidden"
      >
        {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card transition-transform lg:relative lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-border p-6">
            <h1 className="font-display text-xl font-extrabold">URBAN T</h1>
            <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
              Admin Dashboard
            </p>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                typeof window !== "undefined" &&
                (item.to === "/admin"
                  ? window.location.pathname === "/admin"
                  : window.location.pathname.startsWith(item.to));

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-border p-4">
            <Link
              to="/portal"
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Client portal
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              View Website
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                qc.clear();
                navigate({ to: "/admin" });
              }}
              className="w-full rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
