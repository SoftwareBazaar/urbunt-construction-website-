import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  applicationSchema,
  leadSchema,
  leadStatusSchema,
  newsletterSchema,
} from "@/lib/leads.schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert({
        kind: data.kind,
        track: data.track ?? null,
        package_slug: data.packageSlug ?? null,
        service_slugs: data.serviceSlugs,
        bundle_discount: data.bundleDiscount,
        location: data.location ?? null,
        stage: data.stage ?? null,
        size: data.size ?? null,
        notes: data.notes ?? null,
        estimate_low: data.estimateLow ?? null,
        estimate_high: data.estimateHigh ?? null,
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        source_page: data.sourcePage ?? null,
        source_channel: data.sourceChannel ?? "web",
        referrer: data.referrer ?? null,
        utm: data.utm ?? {},
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id as string };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => newsletterSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        { email: data.email.toLowerCase(), source_page: data.sourcePage ?? null },
        { onConflict: "email" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("job_applications").insert({
      applicant_type: data.applicantType,
      role_title: data.roleTitle ?? null,
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      location: data.location ?? null,
      experience: data.experience ?? null,
      message: data.message ?? null,
      source_page: data.sourcePage ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [leads, applications, subscribers] = await Promise.all([
      context.supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200),
      context.supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
      context.supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);
    if (leads.error) throw new Error(leads.error.message);
    return {
      leads: leads.data ?? [],
      applications: applications.data ?? [],
      subscribers: subscribers.data ?? [],
    };
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => leadStatusSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
