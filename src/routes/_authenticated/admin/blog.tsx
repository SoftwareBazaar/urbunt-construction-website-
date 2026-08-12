import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit, Trash2, Eye, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: BlogManagement,
});

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string | null;
  author_id: string | null;
  author_name: string | null;
  read_minutes: number;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

function BlogManagement() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Fetch blog posts
  const posts = useQuery({
    queryKey: ["admin", "blog-posts", filterStatus, filterCategory],
    queryFn: async () => {
      let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      
      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }
      
      if (filterCategory !== "all") {
        query = query.eq("category", filterCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  // Fetch categories
  const categories = useQuery({
    queryKey: ["admin", "blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_categories").select("*").order("name");
      if (error) throw error;
      return data as BlogCategory[];
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
    },
  });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, currentStatus }: { id: string; currentStatus: string }) => {
      const newStatus = currentStatus === "published" ? "draft" : "published";
      const updates: any = { status: newStatus };
      
      if (newStatus === "published" && !posts.data?.find(p => p.id === id)?.published_at) {
        updates.published_at = new Date().toISOString();
      }
      
      const { error } = await supabase.from("blog_posts").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
    },
  });

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage blog posts for your website
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-display text-sm font-bold uppercase text-accent-foreground"
        >
          <Plus className="size-4" /> New Post
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Categories</option>
          {(categories.data ?? []).map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex-1" />

        <div className="text-sm text-muted-foreground">
          {posts.data?.length || 0} posts
        </div>
      </div>

      {/* Posts List */}
      {posts.isLoading ? (
        <p className="text-muted-foreground">Loading posts…</p>
      ) : posts.error ? (
        <p className="border border-accent/40 bg-accent/10 p-4 text-sm">
          Error loading posts. Make sure you have admin privileges.
        </p>
      ) : (
        <div className="space-y-3">
          {(posts.data ?? []).map((post) => (
            <div key={post.id} className="surface-card flex items-start gap-4 p-5">
              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="size-24 shrink-0 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <span
                          className={`size-2 rounded-full ${
                            post.status === "published"
                              ? "bg-green-500"
                              : post.status === "draft"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                        />
                        {post.status}
                      </span>
                      <span>•</span>
                      <span>{post.category || "Uncategorized"}</span>
                      <span>•</span>
                      <span>{post.read_minutes} min read</span>
                      {post.published_at && (
                        <>
                          <span>•</span>
                          <span>{new Date(post.published_at).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus.mutate({ id: post.id, currentStatus: post.status })}
                      className="rounded border border-border p-2 hover:border-accent"
                      title={post.status === "published" ? "Unpublish" : "Publish"}
                    >
                      <Eye className="size-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setShowForm(true);
                      }}
                      className="rounded border border-border p-2 hover:border-accent"
                      title="Edit post"
                    >
                      <Edit className="size-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                          deletePost.mutate(post.id);
                        }
                      }}
                      className="rounded border border-border p-2 hover:border-red-500 hover:text-red-500"
                      title="Delete post"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(posts.data ?? []).length === 0 && (
            <div className="surface-card p-8 text-center">
              <p className="text-muted-foreground">
                No posts yet. Click "New Post" to create your first blog post.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Post Form Modal */}
      {showForm && (
        <BlogPostForm
          post={editingPost}
          categories={categories.data ?? []}
          onClose={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setEditingPost(null);
            posts.refetch();
          }}
        />
      )}
    </div>
  );
}

function BlogPostForm({
  post,
  categories,
  onClose,
  onSuccess,
}: {
  post: BlogPost | null;
  categories: BlogCategory[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "",
    featured_image: post?.featured_image || "",
    read_minutes: post?.read_minutes || 5,
    status: post?.status || "draft",
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const postData = {
        ...formData,
        author_id: user?.id || null,
        author_name: user?.email || null,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };

      if (post) {
        const { error } = await supabase.from("blog_posts").update(postData).eq("id", post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert([postData]);
        if (error) throw error;
      }
    },
    onSuccess: () => onSuccess(),
  });

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/50 p-4">
      <div className="mx-auto my-8 w-full max-w-4xl bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">{post ? "Edit Post" : "New Post"}</h3>
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title *
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (!post) {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    });
                  }
                }}
                className={field}
                placeholder="Your blog post title"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="slug" className="text-sm font-medium">
                URL Slug *
              </label>
              <input
                id="slug"
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className={field}
                placeholder="url-friendly-slug"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="excerpt" className="text-sm font-medium">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className={field}
                rows={2}
                placeholder="Brief description for previews..."
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content *
              </label>
              <textarea
                id="content"
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className={field}
                rows={12}
                placeholder="Write your blog post content here... (Markdown supported)"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Tip: You can use Markdown formatting for headings, lists, links, etc.
              </p>
            </div>

            <div>
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={field}
              >
                <option value="">Uncategorized</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="read_minutes" className="text-sm font-medium">
                Read Time (minutes)
              </label>
              <input
                id="read_minutes"
                type="number"
                min="1"
                value={formData.read_minutes}
                onChange={(e) => setFormData({ ...formData, read_minutes: parseInt(e.target.value) })}
                className={field}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="featured_image" className="text-sm font-medium">
                Featured Image URL
              </label>
              <input
                id="featured_image"
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                className={field}
                placeholder="https://..."
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Upload image to Media Library first, then paste URL here
              </p>
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
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
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
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
            >
              <Save className="size-4" />
              {saveMutation.isPending ? "Saving..." : post ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
