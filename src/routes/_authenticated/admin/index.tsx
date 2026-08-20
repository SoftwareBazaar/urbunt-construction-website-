import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Users, 
  Settings,
  Inbox,
  ArrowRight
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

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

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your construction business from one central location
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">Active Projects</p>
            <p className="mt-2 text-3xl font-bold">--</p>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">Published Posts</p>
            <p className="mt-2 text-3xl font-bold">--</p>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">Media Files</p>
            <p className="mt-2 text-3xl font-bold">--</p>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="mt-2 text-3xl font-bold">--</p>
          </div>
        </div>

        {/* Admin Sections Grid */}
        <div>
          <h2 className="mb-6 text-xl font-bold">Admin Sections</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.to}
                  to={section.to}
                  className="group surface-card flex flex-col p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div className={`${section.color} flex size-12 items-center justify-center rounded text-white`}>
                      <Icon className="size-6" />
                    </div>
                    <ArrowRight className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  
                  <h3 className="mt-4 text-lg font-bold group-hover:text-accent">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-10 rounded border border-border bg-secondary p-6">
          <h3 className="font-bold">Quick Actions</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
            >
              <LayoutDashboard className="size-4" /> New Project
            </Link>
            <Link
              to="/admin/blog"
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-bold hover:bg-secondary"
            >
              <FileText className="size-4" /> New Blog Post
            </Link>
            <Link
              to="/admin/media"
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-bold hover:bg-secondary"
            >
              <Image className="size-4" /> Upload Media
            </Link>
            <Link
              to="/admin/content"
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-bold hover:bg-secondary"
            >
              <Settings className="size-4" /> Edit Homepage
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-10 rounded border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-950/20">
          <h3 className="font-bold text-blue-900 dark:text-blue-100">Need Help?</h3>
          <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">
            Check the <span className="font-bold">ADMIN-SETUP-FINAL.md</span> file in your project for complete setup instructions and troubleshooting guides.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li>• <strong>Projects:</strong> Create and assign projects to clients</li>
            <li>• <strong>Content:</strong> Edits appear on live website within 5 minutes</li>
            <li>• <strong>Media:</strong> Upload files to organized folders</li>
            <li>• <strong>Users:</strong> Clients sign up at /auth, you assign roles here</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
