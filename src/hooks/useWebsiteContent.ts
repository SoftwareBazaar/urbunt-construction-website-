import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { company as defaultCompany } from "@/data/site";

type ContentItem = {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
};

/**
 * Hook to fetch website content from database
 * Falls back to default values if not found in database
 */
export function useWebsiteContent(page: string) {
  return useQuery({
    queryKey: ["website-content", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("website_content")
        .select("*")
        .eq("page", page);

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned, which is fine
        console.error("Error fetching content:", error);
      }

      // Convert array to key-value object
      const contentMap: Record<string, string> = {};
      (data || []).forEach((item: ContentItem) => {
        contentMap[item.content_key] = item.content_value;
      });

      return contentMap;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

/**
 * Hook to get a single content value with fallback
 */
export function useContentValue(page: string, key: string, fallback: string = "") {
  const { data } = useWebsiteContent(page);
  return data?.[key] || fallback;
}

/**
 * Hook to fetch company info (contact details, etc.)
 */
export function useCompanyInfo() {
  const { data, isLoading } = useWebsiteContent("company");

  return {
    company: {
      name: data?.name || defaultCompany.name,
      tagline: data?.tagline || defaultCompany.tagline,
      phone: data?.phone || defaultCompany.phone,
      phoneHref: `tel:${(data?.phone || defaultCompany.phone).replace(/\s/g, "")}`,
      whatsapp: (data?.phone || defaultCompany.phone).replace(/\s/g, "").replace("+", ""),
      email: data?.email || defaultCompany.email,
      address: data?.address || defaultCompany.address,
      hours: data?.hours || defaultCompany.hours,
    },
    isLoading,
  };
}

/**
 * Hook to fetch footer content (social links, etc.)
 */
export function useFooterContent() {
  const { data, isLoading } = useWebsiteContent("footer");

  return {
    footer: {
      copyright: data?.copyright || `© ${new Date().getFullYear()} Urban T Construction Co. All rights reserved.`,
      description: data?.description || defaultCompany.tagline,
      social_facebook: data?.social_facebook || "https://facebook.com/",
      social_twitter: data?.social_twitter || "https://twitter.com/",
      social_instagram: data?.social_instagram || "https://www.instagram.com/urbantconstructions/",
      social_linkedin: data?.social_linkedin || "https://linkedin.com/",
    },
    isLoading,
  };
}
