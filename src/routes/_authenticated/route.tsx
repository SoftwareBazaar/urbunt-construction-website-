import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    const path = location.pathname;
    // /admin and /portal show their own login screens so links can be shared directly
    const inlineLogin = path === "/portal" || path.startsWith("/admin");

    if ((error || !data.user) && !inlineLogin) {
      throw redirect({
        to: "/auth",
        search: { next: path.startsWith("/") ? path : "/portal" },
      });
    }

    return { user: data.user ?? null };
  },
  component: () => <Outlet />,
});
