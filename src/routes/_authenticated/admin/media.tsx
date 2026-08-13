import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Upload, Trash2, Copy, Check, Grid3x3, List, X, Image as ImageIcon, FileText, Film } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: MediaLibrary,
});

type MediaFile = {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  alt_text: string | null;
  caption: string | null;
  project_id: string | null;
  folder: string;
  uploaded_by: string | null;
  created_at: string;
};

function MediaLibrary() {
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterFolder, setFilterFolder] = useState<string>("all");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch media files
  const media = useQuery({
    queryKey: ["admin", "media", filterType, filterFolder],
    queryFn: async () => {
      let query = supabase.from("media_library").select("*").order("created_at", { ascending: false });
      
      if (filterType !== "all") {
        query = query.eq("file_type", filterType);
      }
      
      if (filterFolder !== "all") {
        query = query.eq("folder", filterFolder);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as MediaFile[];
    },
  });

  // Get unique folders
  const folders = Array.from(new Set((media.data ?? []).map((m) => m.folder)));

  const deleteFile = useMutation({
    mutationFn: async (file: MediaFile) => {
      // Delete from storage
      const path = file.file_url.split("/").pop();
      if (path) {
        await supabase.storage.from("media").remove([path]);
      }
      
      // Delete from database
      const { error } = await supabase.from("media_library").delete().eq("id", file.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "media"] });
      setSelectedFile(null);
    },
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();

    for (const file of Array.from(files)) {
      try {
        // Upload to Supabase Storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("media")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(filePath);

        // Save to database
        const fileType = file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : "document";

        await supabase.from("media_library").insert([
          {
            file_name: file.name,
            file_url: publicUrl,
            file_type: fileType,
            file_size: file.size,
            mime_type: file.type,
            folder: "general",
            uploaded_by: user?.id || null,
          },
        ]);
      } catch (error) {
        console.error("Upload error:", error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    media.refetch();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload and manage images, videos, and documents
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
        >
          <Upload className="size-4" /> {uploading ? "Uploading..." : "Upload Files"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Filters and View Toggle */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="document">Documents</option>
        </select>

        <select
          value={filterFolder}
          onChange={(e) => setFilterFolder(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Folders</option>
          {folders.map((folder) => (
            <option key={folder} value={folder}>
              {folder}
            </option>
          ))}
        </select>

        <div className="flex-1" />

        <div className="flex gap-1 border border-border">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 ${viewMode === "grid" ? "bg-accent text-accent-foreground" : ""}`}
          >
            <Grid3x3 className="size-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 ${viewMode === "list" ? "bg-accent text-accent-foreground" : ""}`}
          >
            <List className="size-4" />
          </button>
        </div>

        <div className="text-sm text-muted-foreground">{media.data?.length || 0} files</div>
      </div>

      {/* Drop Zone */}
      <div
        className="mb-6 border-2 border-dashed border-border bg-secondary/50 p-8 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
      >
        <Upload className="mx-auto size-12 text-muted-foreground" />
        <p className="mt-3 font-medium">Drag and drop files here</p>
        <p className="mt-1 text-sm text-muted-foreground">or click Upload Files button above</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Supports: Images (JPG, PNG, GIF), Videos (MP4, WebM), Documents (PDF, DOC)
        </p>
      </div>

      {/* Media Grid/List */}
      {media.isLoading ? (
        <p className="text-muted-foreground">Loading media…</p>
      ) : media.error ? (
        <p className="border border-accent/40 bg-accent/10 p-4 text-sm">
          Error loading media. Make sure you have admin privileges and the storage bucket exists.
        </p>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(media.data ?? []).map((file) => (
            <div
              key={file.id}
              className="surface-card group relative cursor-pointer overflow-hidden"
              onClick={() => setSelectedFile(file)}
            >
              <div className="aspect-square bg-secondary">
                {file.file_type === "image" ? (
                  <img src={file.file_url} alt={file.alt_text || file.file_name} className="size-full object-cover" />
                ) : file.file_type === "video" ? (
                  <div className="flex size-full items-center justify-center">
                    <Film className="size-12 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <FileText className="size-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium">{file.file_name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyUrl(file.file_url);
                  }}
                  className="rounded bg-white p-2 hover:bg-white/90"
                  title="Copy URL"
                >
                  {copiedUrl === file.file_url ? (
                    <Check className="size-4 text-green-600" />
                  ) : (
                    <Copy className="size-4 text-gray-900" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete ${file.file_name}? This cannot be undone.`)) {
                      deleteFile.mutate(file);
                    }
                  }}
                  className="rounded bg-white p-2 hover:bg-white/90"
                  title="Delete"
                >
                  <Trash2 className="size-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
          {(media.data ?? []).length === 0 && (
            <div className="surface-card col-span-full p-8 text-center">
              <p className="text-muted-foreground">No files yet. Upload your first file to get started.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {(media.data ?? []).map((file) => (
            <div
              key={file.id}
              className="surface-card flex items-center gap-4 p-4 hover:border-accent"
              onClick={() => setSelectedFile(file)}
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded bg-secondary">
                {file.file_type === "image" ? (
                  <ImageIcon className="size-6" />
                ) : file.file_type === "video" ? (
                  <Film className="size-6" />
                ) : (
                  <FileText className="size-6" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{file.file_name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyUrl(file.file_url);
                  }}
                  className="rounded border border-border p-2 hover:border-accent"
                  title="Copy URL"
                >
                  {copiedUrl === file.file_url ? (
                    <Check className="size-4 text-green-600" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete ${file.file_name}? This cannot be undone.`)) {
                      deleteFile.mutate(file);
                    }
                  }}
                  className="rounded border border-border p-2 hover:border-red-500 hover:text-red-500"
                  title="Delete"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Detail Modal */}
      {selectedFile && (
        <FileDetailModal file={selectedFile} onClose={() => setSelectedFile(null)} onCopyUrl={copyUrl} />
      )}
    </div>
    </AdminLayout>
  );
}

function FileDetailModal({
  file,
  onClose,
  onCopyUrl,
}: {
  file: MediaFile;
  onClose: () => void;
  onCopyUrl: (url: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="w-full max-w-4xl bg-card p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">File Details</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-secondary">
            <X className="size-5" />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-secondary p-4">
            {file.file_type === "image" ? (
              <img src={file.file_url} alt={file.file_name} className="w-full" />
            ) : file.file_type === "video" ? (
              <video src={file.file_url} controls className="w-full" />
            ) : (
              <div className="flex aspect-video items-center justify-center">
                <FileText className="size-24 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">File Name</p>
              <p className="font-medium">{file.file_name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">File Type</p>
              <p className="font-medium">{file.mime_type}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">File Size</p>
              <p className="font-medium">
                {file.file_size < 1024
                  ? file.file_size + " B"
                  : file.file_size < 1024 * 1024
                  ? (file.file_size / 1024).toFixed(1) + " KB"
                  : (file.file_size / (1024 * 1024)).toFixed(1) + " MB"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Uploaded</p>
              <p className="font-medium">{new Date(file.created_at).toLocaleString()}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Public URL</p>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  value={file.file_url}
                  readOnly
                  className="flex-1 border border-input bg-background px-3 py-2 text-sm"
                />
                <button
                  onClick={() => onCopyUrl(file.file_url)}
                  className="border border-border px-3 py-2 hover:border-accent"
                >
                  <Copy className="size-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => window.open(file.file_url, "_blank")}
              className="w-full bg-accent px-4 py-2 font-display text-sm font-bold uppercase text-accent-foreground"
            >
              Open in New Tab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
