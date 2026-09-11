import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";

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

export function ScheduleManager({ projectId, isAdmin = false }: { projectId: string; isAdmin?: boolean }) {
  const qc = useQueryClient();

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
      const { error } = await supabase
        .from("project_updates")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
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
    ? (tasks.data ?? []) 
    : (tasks.data ?? []).filter(t => t.published);

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
            const isSunday = date.getDay() === 0;

            return (
              <tr
                key={task.id}
                className={`border-b border-border ${
                  isSunday
                    ? "bg-gray-50 italic text-gray-500"
                    : idx % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50/30"
                }`}
              >
                <td className="px-3 py-2">{dayName}</td>
                <td className="px-3 py-2">{shortDate}</td>
                <td className="px-3 py-2">{task.title}</td>
                <td className="px-3 py-2">
                  {isAdmin ? (
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTask.mutate({ id: task.id, updates: { status: e.target.value } })
                      }
                      className="rounded border border-border bg-white px-2 py-1 text-xs"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="hold">Inspection Hold</option>
                      <option value="delayed">Delayed</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-bold uppercase ${
                        statusColors[task.status as keyof typeof statusColors] || statusColors.scheduled
                      }`}
                    >
                      {statusLabels[task.status as keyof typeof statusLabels] || "Scheduled"}
                    </span>
                  )}
                </td>
                {isAdmin && (
                  <>
                    <td className="px-3 py-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.published}
                          onChange={(e) =>
                            updateTask.mutate({ id: task.id, updates: { published: e.target.checked } })
                          }
                          className="size-4"
                        />
                        <span className="text-xs">Published</span>
                      </label>
                    </td>
                    <td className="px-3 py-2 text-center">
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
