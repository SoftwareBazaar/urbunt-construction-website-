import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  Inbox,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

const adminSections = [
  {
    to: "/admin/projects",
    icon: LayoutDashboard,
    title: "Projects",
    description: "Manage client projects, milestones, and progress updates",
    color: "bg-blue-500",
  },
  {
    to: "/admin/blog",
    icon: FileText,
    title: "Blog",
    description: "Create and manage blog posts and categories",
    color: "bg-purple-500",
  },
  {
    to: "/admin/media",
    icon: Image,
    title: "Media Library",
    description: "Upload and organize images, videos, and documents",
    color: "bg-green-500",
  },
  {
    to: "/admin/users",
    icon: Users,
    title: "Users",
    description: "Manage users and assign roles (Admin, Staff, Client)",
    color: "bg-orange-500",
  },
  {
    to: "/admin/content",
    icon: Settings,
    title: "Content",
    description: "Edit website pages and content (live updates)",
    color: "bg-red-500",
  },
  {
    to: "/leads",
    icon: Inbox,
    title: "Leads",
    description: "View and manage customer inquiries and quotes",
    color: "bg-indigo-500",
  },
];

type Project = {
  id: string;
  title: string;
  location: string | null;
  status: string;
  progress: number;
  current_stage: string;
  project_type: string;
};

function AdminDashboard() {
  const qc = useQueryClient();

  const projects = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_projects")
        .select("id, title, location, status, progress, current_stage, project_type")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  const posts = useQuery({
    queryKey: ["admin", "dashboard", "posts"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("status", "published");
      if (error) throw error;
      return count ?? 0;
    },
  });

  const media = useQuery({
    queryKey: ["admin", "dashboard", "media"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("media_library")
        .select("id", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  const users = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_all_users");
      if (error) throw error;
      return (data as unknown[])?.length ?? 0;
    },
  });

  const projectList = projects.data ?? [];
  const activeProjects = projectList.filter(
    (p) => p.status !== "completed" && p.status !== "cancelled",
  ).length;

  const stat = (value: number | undefined, loading: boolean) =>
    loading ? "…" : value == null ? "—" : String(value);

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your construction business from one central location
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">Active Projects</p>
            <p className="mt-2 text-3xl font-bold">{stat(activeProjects, projects.isLoading)}</p>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">Published Posts</p>
            <p className="mt-2 text-3xl font-bold">{stat(posts.data, posts.isLoading)}</p>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">Media Files</p>
            <p className="mt-2 text-3xl font-bold">{stat(media.data, media.isLoading)}</p>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="mt-2 text-3xl font-bold">{stat(users.data, users.isLoading)}</p>
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Projects</h2>
            <Link
              to="/admin/projects"
              className="text-sm font-bold text-accent hover:underline"
            >
              Manage all
            </Link>
          </div>

          {projects.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading projects…</p>
          ) : projects.error ? (
            <p className="border border-accent/40 bg-accent/10 p-4 text-sm">
              Could not load projects. Confirm your admin role and refresh.
            </p>
          ) : projectList.length === 0 ? (
            <div className="surface-card p-6 text-sm text-muted-foreground">
              No projects yet.{" "}
              <Link to="/admin/projects" className="font-bold text-accent hover:underline">
                Create the first project
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {projectList.slice(0, 6).map((project) => (
                <Link
                  key={project.id}
                  to="/admin/projects"
                  className="surface-card flex flex-col gap-3 p-5 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
                  onClick={() => qc.invalidateQueries({ queryKey: ["admin", "projects"] })}
                >
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold">{project.title}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5 text-accent" />
                        {project.location || "—"}
                      </span>
                      <span className="uppercase tracking-wide">{project.project_type}</span>
                      <span>{project.current_stage}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:text-right">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
                      <p className="font-bold capitalize">{project.status}</p>
                    </div>
                    <div className="min-w-[88px]">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Progress</p>
                      <p className="font-display text-2xl font-extrabold text-accent">
                        {project.progress}%
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-6 text-xl font-bold">Admin Sections</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.to}
                  to={section.to}
                  className="group surface-card flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`${section.color} flex size-12 items-center justify-center rounded text-white`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <ArrowRight className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold group-hover:text-accent">{section.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded border border-border bg-secondary p-6">
          <h3 className="font-bold">Quick Actions</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
            >
              <LayoutDashboard className="size-4" /> Projects
            </Link>
            <Link
              to="/admin/blog"
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-bold hover:bg-secondary"
            >
              <FileText className="size-4" /> Blog
            </Link>
            <Link
              to="/admin/media"
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-bold hover:bg-secondary"
            >
              <Image className="size-4" /> Media
            </Link>
            <a
              href="/portal"
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-bold hover:bg-secondary"
            >
              Client portal
            </a>
          </div>
        </div>

        <div className="mt-10 rounded border-l-4 border-accent bg-accent/5 p-6">
          <h3 className="font-bold">Shareable access links</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Admin:</strong>{" "}
              <a href="/admin" className="text-accent hover:underline">
                urbantconstruction.com/admin
              </a>
            </li>
            <li>
              <strong className="text-foreground">Client portal:</strong>{" "}
              <a href="/portal" className="text-accent hover:underline">
                urbantconstruction.com/portal
              </a>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
