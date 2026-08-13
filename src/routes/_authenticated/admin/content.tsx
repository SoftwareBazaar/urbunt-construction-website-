import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Save, RefreshCw, FileText, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/_authenticated/admin/content")({
  component: ContentManagement,
});

type ContentItem = {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

const pages = [
  { value: "homepage", label: "Home Page" },
  { value: "about", label: "About Page" },
  { value: "services", label: "Services" },
  { value: "contact", label: "Contact" },
  { value: "footer", label: "Footer" },
  { value: "company", label: "Company Info" },
];

const contentSections = {
  homepage: [
    { key: "hero_title", label: "Hero Title", type: "text" },
    { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
    { key: "hero_cta", label: "Hero CTA Button", type: "text" },
    { key: "about_section_title", label: "About Section Title", type: "text" },
    { key: "about_section_text", label: "About Section Text", type: "textarea" },
    { key: "features_title", label: "Features Title", type: "text" },
  ],
  about: [
    { key: "title", label: "Page Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    { key: "intro", label: "Introduction", type: "textarea" },
    { key: "mission", label: "Mission Statement", type: "textarea" },
    { key: "vision", label: "Vision Statement", type: "textarea" },
    { key: "team_title", label: "Team Section Title", type: "text" },
  ],
  services: [
    { key: "title", label: "Services Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
  ],
  contact: [
    { key: "title", label: "Contact Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    { key: "address", label: "Address", type: "textarea" },
    { key: "phone", label: "Phone Number", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "hours", label: "Business Hours", type: "textarea" },
  ],
  footer: [
    { key: "copyright", label: "Copyright Text", type: "text" },
    { key: "description", label: "Footer Description", type: "textarea" },
    { key: "social_facebook", label: "Facebook URL", type: "text" },
    { key: "social_twitter", label: "Twitter URL", type: "text" },
    { key: "social_instagram", label: "Instagram URL", type: "text" },
    { key: "social_linkedin", label: "LinkedIn URL", type: "text" },
  ],
  company: [
    { key: "name", label: "Company Name", type: "text" },
    { key: "tagline", label: "Tagline", type: "text" },
    { key: "phone", label: "Main Phone", type: "text" },
    { key: "email", label: "Main Email", type: "text" },
    { key: "address", label: "Main Address", type: "textarea" },
  ],
};

// Get default content from current site data
function getDefaultContentForPage(page: string): Record<string, string> {
  const defaults: Record<string, Record<string, string>> = {
    homepage: {
      hero_title: "Building Excellence, Delivering Dreams",
      hero_subtitle: "From Foundation to Finishing — One Company, Every Trade.",
      hero_cta: "Get Your Free Quote",
      about_section_title: "Why Choose Urban T Construction",
      about_section_text: "18 years of experience delivering quality construction projects across Kenya.",
      features_title: "Our Core Values",
    },
    about: {
      title: "About Urban T Construction Co.",
      subtitle: "Building Kenya, One Project at a Time",
      intro: "With 18 years of industry experience, we've delivered 540+ successful projects across residential, commercial, and civil sectors.",
      mission: "To deliver exceptional construction services that exceed client expectations through quality workmanship, transparent pricing, and on-time completion.",
      vision: "To be Kenya's most trusted construction company, known for our integrity, quality, and innovation.",
      team_title: "Meet Our Expert Team",
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive Construction Solutions",
      description: "From architectural design to post-construction cleaning, we handle every aspect of your building project.",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's Build Something Amazing Together",
      address: "Westways arcade northern bypass\nNairobi, Kenya",
      phone: "+254 111 770 039",
      email: "Urbantconstructions@gmail.com",
      hours: "Monday - Saturday\n7:30am – 6:00pm",
    },
    footer: {
      copyright: "© 2026 Urban T Construction Co. All rights reserved.",
      description: "From Foundation to Finishing — One Company, Every Trade.",
      social_facebook: "https://facebook.com/",
      social_twitter: "https://twitter.com/",
      social_instagram: "https://www.instagram.com/urbantconstructions/",
      social_linkedin: "https://linkedin.com/",
    },
    company: {
      name: "Urban T Construction Co.",
      tagline: "From Foundation to Finishing — One Company, Every Trade.",
      phone: "+254 111 770 039",
      email: "Urbantconstructions@gmail.com",
      address: "Westways arcade northern bypass, Nairobi",
    },
  };

  return defaults[page] || {};
}

function ContentManagement() {
  const qc = useQueryClient();
  const [selectedPage, setSelectedPage] = useState("homepage");
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch content for selected page
  const content = useQuery({
    queryKey: ["admin", "content", selectedPage],
    queryFn: async () => {
      const { data, error} = await supabase
        .from("website_content")
        .select("*")
        .eq("page", selectedPage);
      
      if (error) throw error;
      return data as ContentItem[];
    },
  });

  // Initialize edited content when data loads or page changes
  useEffect(() => {
    if (content.data && content.data.length > 0) {
      const pageContent: Record<string, string> = {};
      content.data.forEach((item) => {
        pageContent[item.content_key] = item.content_value || "";
      });
      setEditedContent(pageContent);
    } else {
      // Pre-populate with current site data
      const defaultContent = getDefaultContentForPage(selectedPage);
      setEditedContent(defaultContent);
    }
    setHasChanges(false);
  }, [content.data, selectedPage]);

  // Save content mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const updates = Object.entries(editedContent).map(([key, value]) => ({
        page: selectedPage,
        section: "main",
        content_key: key,
        content_value: value,
        content_type: "text",
        updated_by: user?.id || null,
      }));

      // Upsert each content item
      for (const update of updates) {
        const { error } = await supabase.from("website_content").upsert(update, {
          onConflict: "page,section,content_key",
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "content"] });
      setHasChanges(false);
      alert("Content saved successfully!");
    },
  });

  const handleContentChange = (key: string, value: string) => {
    setEditedContent({ ...editedContent, [key]: value });
    setHasChanges(true);
  };

  const handlePageChange = (newPage: string) => {
    if (hasChanges) {
      if (!confirm("You have unsaved changes. Switch page anyway?")) {
        return;
      }
    }
    setSelectedPage(newPage);
    setHasChanges(false);
  };

  const currentSections = contentSections[selectedPage as keyof typeof contentSections] || [];

  const field = "mt-1 w-full border border-input bg-background px-3 py-2.5 text-sm";

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit website pages and sections
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-sm text-amber-600">• Unsaved changes</span>
          )}
          <button
            onClick={() => saveMutation.mutate()}
            disabled={!hasChanges || saveMutation.isPending}
            className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
          >
            <Save className="size-4" />
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Page Selector */}
      <div className="mb-6 surface-card p-4">
        <label className="text-sm font-medium">Select Page to Edit:</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {pages.map((page) => (
            <button
              key={page.value}
              onClick={() => handlePageChange(page.value)}
              className={`flex items-center gap-2 border px-4 py-2 font-display text-sm font-bold uppercase ${
                selectedPage === page.value
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-accent"
              }`}
            >
              <FileText className="size-4" />
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      {content.isLoading ? (
        <p className="text-muted-foreground">Loading content…</p>
      ) : content.error ? (
        <div className="surface-card p-8">
          <p className="text-sm text-muted-foreground">
            No content found for this page. Start by saving content below.
          </p>
        </div>
      ) : null}

      <div className="surface-card p-6">
        <h2 className="mb-4 text-xl font-bold">
          {pages.find((p) => p.value === selectedPage)?.label} Content
        </h2>

        <div className="space-y-6">
          {currentSections.map((section) => (
            <div key={section.key}>
              <label htmlFor={section.key} className="text-sm font-medium">
                {section.label}
              </label>
              {section.type === "textarea" ? (
                <textarea
                  id={section.key}
                  value={editedContent[section.key] || ""}
                  onChange={(e) => handleContentChange(section.key, e.target.value)}
                  className={field}
                  rows={4}
                  placeholder={`Enter ${section.label.toLowerCase()}...`}
                />
              ) : (
                <input
                  id={section.key}
                  type="text"
                  value={editedContent[section.key] || ""}
                  onChange={(e) => handleContentChange(section.key, e.target.value)}
                  className={field}
                  placeholder={`Enter ${section.label.toLowerCase()}...`}
                />
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Key: {section.key}
              </p>
            </div>
          ))}

          {currentSections.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No editable sections defined for this page yet.
            </p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20">
        <h3 className="flex items-center gap-2 font-bold">
          <Eye className="size-4" />
          How to Use
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>• Select a page from the tabs above</li>
          <li>• Edit the content fields</li>
          <li>• Click "Save Changes" to apply</li>
          <li>• Changes appear immediately on your website</li>
          <li>• You can edit multiple fields before saving</li>
        </ul>
      </div>

      {/* Preview Notice */}
      <div className="mt-4 rounded border border-amber-500/20 bg-amber-50 p-4 dark:bg-amber-950/20">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Note:</strong> To see changes on your live website, you'll need to update your
          React components to fetch content from the <code className="rounded bg-amber-200 px-1 dark:bg-amber-900">website_content</code> table.
          Current forms save to database - integration with live site is the next step.
        </p>
      </div>
    </div>
    </AdminLayout>
  );
}
