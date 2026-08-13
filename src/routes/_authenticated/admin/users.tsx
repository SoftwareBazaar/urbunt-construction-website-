import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Shield, Trash2, Mail, Calendar, User as UserIcon, X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: UserManagement,
});

type User = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  role?: string;
};

type UserRole = {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
};

function UserManagement() {
  const qc = useQueryClient();
  const [filterRole, setFilterRole] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch all users
  const usersQuery = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      return data.users.map((u) => ({
        id: u.id,
        email: u.email || "",
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
      }));
    },
  });

  // Fetch all user roles
  const rolesQuery = useQuery({
    queryKey: ["admin", "user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data as UserRole[];
    },
  });

  // Combine users with their roles
  const usersWithRoles = (usersQuery.data ?? []).map((user) => {
    const userRole = (rolesQuery.data ?? []).find((r) => r.user_id === user.id);
    return {
      ...user,
      role: userRole?.role || "user",
    };
  });

  // Filter users by role
  const filteredUsers = filterRole === "all" 
    ? usersWithRoles 
    : usersWithRoles.filter((u) => u.role === filterRole);

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      // Delete user roles first
      await supabase.from("user_roles").delete().eq("user_id", userId);
      
      // Delete user from auth
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ["admin", "user-roles"] });
      setSelectedUser(null);
    },
  });

  // Update role mutation
  const updateRole = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      // Remove existing role
      await supabase.from("user_roles").delete().eq("user_id", userId);
      
      // Add new role if not 'user' (user is default)
      if (newRole !== "user") {
        const { error } = await supabase.from("user_roles").insert([
          { user_id: userId, role: newRole },
        ]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "user-roles"] });
    },
  });

  const roleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "staff":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // Count by role
  const counts = {
    all: usersWithRoles.length,
    admin: usersWithRoles.filter((u) => u.role === "admin").length,
    staff: usersWithRoles.filter((u) => u.role === "staff").length,
    user: usersWithRoles.filter((u) => u.role === "user").length,
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage users, assign roles, and control access
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-display text-sm font-bold uppercase text-accent-foreground"
        >
          <Plus className="size-4" /> Create User
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <div className="surface-card p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="mt-1 text-3xl font-bold">{counts.all}</p>
        </div>
        <div className="surface-card p-4">
          <p className="text-sm text-muted-foreground">Admins</p>
          <p className="mt-1 text-3xl font-bold text-red-600">{counts.admin}</p>
        </div>
        <div className="surface-card p-4">
          <p className="text-sm text-muted-foreground">Staff</p>
          <p className="mt-1 text-3xl font-bold text-blue-600">{counts.staff}</p>
        </div>
        <div className="surface-card p-4">
          <p className="text-sm text-muted-foreground">Clients</p>
          <p className="mt-1 text-3xl font-bold">{counts.user}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-3">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admins</option>
          <option value="staff">Staff</option>
          <option value="user">Clients</option>
        </select>

        <div className="flex-1" />

        <div className="text-sm text-muted-foreground">{filteredUsers.length} users</div>
      </div>

      {/* Users List */}
      {usersQuery.isLoading ? (
        <p className="text-muted-foreground">Loading users…</p>
      ) : usersQuery.error ? (
        <p className="border border-accent/40 bg-accent/10 p-4 text-sm">
          Error loading users. Make sure you have admin privileges.
        </p>
      ) : (
        <div className="space-y-2">
          {filteredUsers.map((user) => (
            <div key={user.id} className="surface-card flex items-center gap-4 p-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                <UserIcon className="size-6 text-muted-foreground" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold">{user.email}</p>
                  <span className={`rounded border px-2 py-0.5 text-xs font-medium ${roleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3" />
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </span>
                  {user.last_sign_in_at && (
                    <>
                      <span>•</span>
                      <span>Last login {new Date(user.last_sign_in_at).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={user.role}
                  onChange={(e) => updateRole.mutate({ userId: user.id, newRole: e.target.value })}
                  className="border border-border bg-background px-3 py-2 text-sm"
                  disabled={updateRole.isPending}
                >
                  <option value="user">Client</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  onClick={() => {
                    if (confirm(`Delete user ${user.email}? This cannot be undone.`)) {
                      deleteUser.mutate(user.id);
                    }
                  }}
                  className="rounded border border-border p-2 hover:border-red-500 hover:text-red-500"
                  title="Delete user"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="surface-card p-8 text-center">
              <p className="text-muted-foreground">
                No users found with selected filters.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create User Form */}
      {showCreateForm && (
        <CreateUserForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            usersQuery.refetch();
          }}
        />
      )}
    </div>
    </AdminLayout>
  );
}

function CreateUserForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      // Create user in auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
      });

      if (authError) throw authError;

      // Add role if not 'user'
      if (formData.role !== "user" && authData.user) {
        const { error: roleError } = await supabase.from("user_roles").insert([
          {
            user_id: authData.user.id,
            role: formData.role,
          },
        ]);
        if (roleError) throw roleError;
      }
    },
    onSuccess: () => onSuccess(),
  });

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Create New User</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-secondary">
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutate();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={field}
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password *
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={field}
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={field}
            >
              <option value="user">Client (Default)</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              Clients can view their projects. Staff and Admins can access the admin dashboard.
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-border px-5 py-2.5 text-sm hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
            >
              {createMutation.isPending ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
