import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Users, 
  Settings, 
  Inbox,
  Menu,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Urban T Construction Co." },
      { name: "description", content: "Complete admin control panel" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const navItems = [
  { to: "/admin/projects", label: "Projects", icon: LayoutDashboard },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/media", label: "Media", icon: Image },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/content", label: "Content", icon: Settings },
  { to: "/leads", label: "Leads", icon: Inbox },
];

function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const qc = useQueryClient();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed right-4 top-4 z-50 rounded border border-border bg-card p-2 lg:hidden"
      >
        {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Sidebar */}
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
              const isActive = window.location.pathname.startsWith(item.to);
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border p-4 space-y-2">
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
                navigate({ to: "/auth" });
              }}
              className="w-full rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
