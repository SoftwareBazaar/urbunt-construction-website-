import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/_authenticated/admin/projects")({
  component: ProjectManagement,
});

type Project = {
  id: string;
  client_user_id: string;
  title: string;
  project_type: string;
  location: string;
  status: string;
  current_stage: string;
  progress: number;
  contract_value: number | null;
  start_date: string | null;
  target_date: string | null;
  manager_name: string | null;
  manager_phone: string | null;
  created_at: string;
};

type User = {
  id: string;
  email: string;
};

function ProjectManagement() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showMilestoneForm, setShowMilestoneForm] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState<string | null>(null);

  // Fetch all projects
  const projects = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  // Fetch all users (for client assignment dropdown)
  const users = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      // Use database function instead of admin API
      const { data, error } = await supabase.rpc("get_all_users");
      if (error) throw error;
      return data as User[];
    },
  });

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage client projects, milestones, and progress updates
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-display text-sm font-bold uppercase text-accent-foreground"
        >
          <Plus className="size-4" /> Add Project
        </button>
      </div>

        {projects.isLoading ? (
          <p className="text-muted-foreground">Loading projects…</p>
        ) : projects.error ? (
          <p className="border border-accent/40 bg-accent/10 p-4 text-sm">
            Error loading projects. Make sure you have admin privileges.
          </p>
        ) : (
          <div className="grid gap-4">
            {(projects.data ?? []).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => {
                  setEditingProject(project);
                  setShowForm(true);
                }}
                onAddMilestone={() => setShowMilestoneForm(project.id)}
                onAddUpdate={() => setShowUpdateForm(project.id)}
                onRefresh={() => projects.refetch()}
              />
            ))}
            {(projects.data ?? []).length === 0 && (
              <div className="surface-card p-8 text-center">
                <p className="text-muted-foreground">No projects yet. Click "Add Project" to create one.</p>
              </div>
            )}
          </div>
        )}

        {/* Project Form Modal */}
        {showForm && (
          <ProjectForm
            project={editingProject}
            users={users.data ?? []}
            onClose={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
            onSuccess={() => {
              setShowForm(false);
              setEditingProject(null);
              projects.refetch();
            }}
          />
        )}

        {/* Milestone Form Modal */}
        {showMilestoneForm && (
          <MilestoneForm
            projectId={showMilestoneForm}
            onClose={() => setShowMilestoneForm(null)}
            onSuccess={() => {
              setShowMilestoneForm(null);
              projects.refetch();
            }}
          />
        )}

        {/* Update Form Modal */}
        {showUpdateForm && (
          <UpdateForm
            projectId={showUpdateForm}
            onClose={() => setShowUpdateForm(null)}
            onSuccess={() => {
              setShowUpdateForm(null);
              projects.refetch();
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

function ProjectCard({
  project,
  onEdit,
  onAddMilestone,
  onAddUpdate,
  onRefresh,
}: {
  project: Project;
  onEdit: () => void;
  onAddMilestone: () => void;
  onAddUpdate: () => void;
  onRefresh: () => void;
}) {
  const qc = useQueryClient();

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("client_projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
    },
  });

  return (
    <div className="surface-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.project_type} · {project.location} · {project.status}
          </p>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span>Stage: {project.current_stage}</span>
            <span className="font-bold text-accent">{project.progress}% Complete</span>
          </div>
          <div className="mt-2 h-2 w-full max-w-md bg-border">
            <div className="h-2 bg-accent" style={{ width: `${project.progress}%` }} />
          </div>
          {project.manager_name && (
            <p className="mt-3 text-sm">
              Manager: {project.manager_name} · {project.manager_phone}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded border border-border p-2 hover:border-accent"
            title="Edit project"
          >
            <Edit className="size-4" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Delete project "${project.title}"? This cannot be undone.`)) {
                deleteProject.mutate(project.id);
              }
            }}
            className="rounded border border-border p-2 hover:border-red-500 hover:text-red-500"
            title="Delete project"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={onAddMilestone}
          className="border border-border bg-secondary px-3 py-2 text-sm hover:border-accent"
        >
          + Add Milestone
        </button>
        <button
          onClick={onAddUpdate}
          className="border border-border bg-secondary px-3 py-2 text-sm hover:border-accent"
        >
          + Add Progress Update
        </button>
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  users,
  onClose,
  onSuccess,
}: {
  project: Project | null;
  users: User[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    client_user_id: project?.client_user_id || "",
    title: project?.title || "",
    project_type: project?.project_type || "residential",
    location: project?.location || "",
    status: project?.status || "planning",
    current_stage: project?.current_stage || "Design & Permits",
    progress: project?.progress || 0,
    contract_value: project?.contract_value || null,
    start_date: project?.start_date || "",
    target_date: project?.target_date || "",
    manager_name: project?.manager_name || "",
    manager_phone: project?.manager_phone || "",
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (project) {
        const { error } = await supabase
          .from("client_projects")
          .update(formData)
          .eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("client_projects").insert([formData]);
        if (error) throw error;
      }
    },
    onSuccess: () => onSuccess(),
  });

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">{project ? "Edit Project" : "New Project"}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-secondary">
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="client_user_id" className="text-sm font-medium">
              Client Email
            </label>
            <select
              id="client_user_id"
              required
              value={formData.client_user_id}
              onChange={(e) => setFormData({ ...formData, client_user_id: e.target.value })}
              className={field}
            >
              <option value="">Select client...</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.email}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              Client must have an account. If not listed, they need to create one at /auth first.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="text-sm font-medium">
                Project Title
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={field}
                placeholder="e.g., Karen Family Home"
              />
            </div>

            <div>
              <label htmlFor="project_type" className="text-sm font-medium">
                Project Type
              </label>
              <select
                id="project_type"
                value={formData.project_type}
                onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                className={field}
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="civil">Civil</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={field}
                placeholder="e.g., Karen, Nairobi"
              />
            </div>

            <div>
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={field}
              >
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="current_stage" className="text-sm font-medium">
                Current Stage
              </label>
              <input
                id="current_stage"
                type="text"
                value={formData.current_stage}
                onChange={(e) => setFormData({ ...formData, current_stage: e.target.value })}
                className={field}
                placeholder="e.g., Foundation"
              />
            </div>

            <div>
              <label htmlFor="progress" className="text-sm font-medium">
                Progress (%)
              </label>
              <input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                className={field}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="start_date" className="text-sm font-medium">
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className={field}
              />
            </div>

            <div>
              <label htmlFor="target_date" className="text-sm font-medium">
                Target Completion
              </label>
              <input
                id="target_date"
                type="date"
                value={formData.target_date}
                onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                className={field}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="manager_name" className="text-sm font-medium">
                Project Manager Name
              </label>
              <input
                id="manager_name"
                type="text"
                value={formData.manager_name || ""}
                onChange={(e) => setFormData({ ...formData, manager_name: e.target.value })}
                className={field}
                placeholder="e.g., James Mwangi"
              />
            </div>

            <div>
              <label htmlFor="manager_phone" className="text-sm font-medium">
                Manager Phone
              </label>
              <input
                id="manager_phone"
                type="tel"
                value={formData.manager_phone || ""}
                onChange={(e) => setFormData({ ...formData, manager_phone: e.target.value })}
                className={field}
                placeholder="e.g., +254 111 770 039"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-border px-5 py-2.5 text-sm hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
            >
              {saveMutation.isPending ? "Saving..." : project ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MilestoneForm({
  projectId,
  onClose,
  onSuccess,
}: {
  projectId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    planned_date: "",
    status: "pending",
    weight: 10,
    notes: "",
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("project_milestones").insert([
        {
          project_id: projectId,
          ...formData,
        },
      ]);
      if (error) throw error;
    },
    onSuccess: () => onSuccess(),
  });

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Add Milestone</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-secondary">
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Milestone Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={field}
              placeholder="e.g., Foundation Complete"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="planned_date" className="text-sm font-medium">
                Planned Date
              </label>
              <input
                id="planned_date"
                type="date"
                value={formData.planned_date}
                onChange={(e) => setFormData({ ...formData, planned_date: e.target.value })}
                className={field}
              />
            </div>

            <div>
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={field}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="weight" className="text-sm font-medium">
              Weight (% of contract)
            </label>
            <input
              id="weight"
              type="number"
              min="0"
              max="100"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
              className={field}
            />
          </div>

          <div>
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className={field}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-border px-5 py-2.5 text-sm hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
            >
              {saveMutation.isPending ? "Saving..." : "Add Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UpdateForm({
  projectId,
  onClose,
  onSuccess,
}: {
  projectId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    photo_url: "",
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("project_updates").insert([
        {
          project_id: projectId,
          ...formData,
        },
      ]);
      if (error) throw error;
    },
    onSuccess: () => onSuccess(),
  });

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Add Progress Update</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-secondary">
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="update-title" className="text-sm font-medium">
              Update Title
            </label>
            <input
              id="update-title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={field}
              placeholder="e.g., Walls Complete"
            />
          </div>

          <div>
            <label htmlFor="body" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="body"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className={field}
              rows={4}
              placeholder="Progress details..."
            />
          </div>

          <div>
            <label htmlFor="photo_url" className="text-sm font-medium">
              Photo URL (Optional)
            </label>
            <input
              id="photo_url"
              type="url"
              value={formData.photo_url}
              onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
              className={field}
              placeholder="https://..."
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Upload image to Supabase Storage first, then paste URL here
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-border px-5 py-2.5 text-sm hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
            >
              {saveMutation.isPending ? "Saving..." : "Add Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
