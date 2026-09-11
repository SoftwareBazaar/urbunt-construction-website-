import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleTask {
  id: string;
  project_id: string;
  title: string;
  body: string | null;
  photo_url: string | null;
  posted_at: string;
  status: string;
  published: boolean;
}

const STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "hold", label: "Inspection Hold" },
  { value: "delayed", label: "Delayed" },
] as const;

export function ScheduleManager({ projectId, isAdmin = false }: { projectId: string; isAdmin?: boolean }) {
  const qc = useQueryClient();
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const tasks = useQuery({
    queryKey: ["schedule", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_updates")
        .select("*")
        .eq("project_id", projectId)
        .order("posted_at", { ascending: true });
      if (error) throw error;
      return data as ScheduleTask[];
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ScheduleTask> }) => {
      const { data, error } = await supabase
        .from("project_updates")
        .update(updates)
        .eq("id", id)
        .select("id");
      if (error) throw error;
      if (!data?.length) {
        throw new Error("Status update was blocked. Confirm you are signed in as admin/staff.");
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schedule", projectId] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("project_updates")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schedule", projectId] });
    },
  });

  const statusColors = {
    scheduled: "bg-gray-100 text-gray-700",
    progress: "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
    hold: "bg-red-100 text-red-800",
    delayed: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    scheduled: "Scheduled",
    progress: "In Progress",
    completed: "Completed",
    hold: "Inspection Hold",
    delayed: "Delayed",
  };

  const filteredTasks = isAdmin 
    ? (tasks.data ?? []).filter(t => new Date(t.posted_at).getDay() !== 0) // Admin: skip Sundays
    : (tasks.data ?? []).filter(t => t.published !== false && new Date(t.posted_at).getDay() !== 0); // Client: skip Sundays AND only published

  if (tasks.isLoading) return <p className="text-sm text-muted-foreground">Loading schedule...</p>;
  if (tasks.error) return <p className="text-sm text-red-500">Error loading schedule</p>;
  if (filteredTasks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {isAdmin ? "No tasks yet. Add tasks above." : "No published tasks yet. Check back soon."}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="bg-primary px-3 py-2 text-left text-xs font-bold uppercase text-primary-foreground">
              Day
            </th>
            <th className="bg-primary px-3 py-2 text-left text-xs font-bold uppercase text-primary-foreground">
              Date
            </th>
            <th className="bg-primary px-3 py-2 text-left text-xs font-bold uppercase text-primary-foreground">
              Activity
            </th>
            <th className="bg-primary px-3 py-2 text-left text-xs font-bold uppercase text-primary-foreground">
              Status
            </th>
            {isAdmin && (
              <>
                <th className="bg-primary px-3 py-2 text-left text-xs font-bold uppercase text-primary-foreground">
                  Published
                </th>
                <th className="bg-primary px-3 py-2 text-center text-xs font-bold uppercase text-primary-foreground">
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, idx) => {
            const date = new Date(task.posted_at);
            const dayName = date.toLocaleDateString("en-GB", { weekday: "long" });
            const shortDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
            const isEditing = editingTask === task.id;

            return (
              <tr
                key={task.id}
                className={`border-b border-border ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <td className="px-3 py-2">{dayName}</td>
                <td className="px-3 py-2">{shortDate}</td>
                <td className="px-3 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateTask.mutate(
                            { id: task.id, updates: { title: editTitle } },
                            {
                              onSuccess: () => {
                                setEditingTask(null);
                                setEditTitle("");
                              },
                            }
                          );
                        } else if (e.key === "Escape") {
                          setEditingTask(null);
                          setEditTitle("");
                        }
                      }}
                      className="w-full rounded border border-primary px-2 py-1 text-sm"
                      autoFocus
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td className="relative px-3 py-2">
                  {isAdmin ? (
                    <Select
                      value={task.status || "scheduled"}
                      onValueChange={(value) => {
                        updateTask.mutate(
                          { id: task.id, updates: { status: value } },
                          {
                            onError: (err) => {
                              console.error("Failed to update status:", err);
                              alert(err instanceof Error ? err.message : "Failed to update status");
                            },
                          },
                        );
                      }}
                    >
                      <SelectTrigger
                        className="relative z-10 h-8 w-[150px] cursor-pointer border-border bg-white text-xs shadow-none"
                        aria-label={`Status for ${task.title}`}
                      >
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={4} className="z-[100]">
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value} className="cursor-pointer text-xs">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-bold uppercase ${
                        statusColors[(task.status || 'scheduled') as keyof typeof statusColors]
                      }`}
                    >
                      {statusLabels[(task.status || 'scheduled') as keyof typeof statusLabels]}
                    </span>
                  )}
                </td>
                {isAdmin && (
                  <>
                    <td className="px-3 py-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.published !== false}
                          onChange={(e) =>
                            updateTask.mutate({ id: task.id, updates: { published: e.target.checked } })
                          }
                          className="size-4 cursor-pointer"
                        />
                        <span className="text-xs">Published</span>
                      </label>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => {
                                updateTask.mutate(
                                  { id: task.id, updates: { title: editTitle } },
                                  {
                                    onSuccess: () => {
                                      setEditingTask(null);
                                      setEditTitle("");
                                    },
                                  }
                                );
                              }}
                              className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground hover:bg-primary/90"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingTask(null);
                                setEditTitle("");
                              }}
                              className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingTask(task.id);
                                setEditTitle(task.title);
                              }}
                              className="rounded p-1 text-blue-600 hover:bg-blue-50"
                              title="Edit task"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete task "${task.title}"?`)) {
                                  deleteTask.mutate(task.id);
                                }
                              }}
                              className="rounded p-1 text-red-500 hover:bg-red-50"
                              title="Delete task"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isAdmin && (
        <p className="mt-3 text-xs text-muted-foreground">
          {filteredTasks.filter((t) => t.published).length} of {filteredTasks.length} tasks published to client view
        </p>
      )}
    </div>
  );
}
