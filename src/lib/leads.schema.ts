import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20)
  .regex(/^[+\d][\d\s-]{6,19}$/, "Enter a valid phone number");

const optionalEmail = z
  .string()
  .trim()
  .max(255)
  .email("Enter a valid email address")
  .optional()
  .or(z.literal("").transform(() => undefined));

const source = z.object({
  sourcePage: z.string().max(200).optional(),
  sourceChannel: z.string().max(40).optional(),
  referrer: z.string().max(300).optional(),
  utm: z.record(z.string(), z.string().max(120)).optional(),
});

export const leadSchema = source.extend({
  kind: z.enum(["quote", "estimate", "chat", "callback"]).default("quote"),
  track: z.enum(["full", "trades"]).optional(),
  packageSlug: z.string().max(80).optional(),
  serviceSlugs: z.array(z.string().max(80)).max(20).default([]),
  bundleDiscount: z.number().int().min(0).max(50).default(0),
  location: z.string().trim().max(120).optional(),
  stage: z.string().trim().max(60).optional(),
  size: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(1500).optional(),
  estimateLow: z.number().int().nonnegative().optional(),
  estimateHigh: z.number().int().nonnegative().optional(),
  name: z.string().trim().min(2, "Enter your full name").max(100),
  phone,
  email: optionalEmail,
});

export const newsletterSchema = source.extend({
  email: z.string().trim().min(5).max(255).email("Enter a valid email address"),
});

export const applicationSchema = source.extend({
  applicantType: z.enum(["individual", "subcontractor"]).default("individual"),
  roleTitle: z.string().trim().max(120).optional(),
  name: z.string().trim().min(2, "Enter your full name").max(100),
  phone,
  email: optionalEmail,
  location: z.string().trim().max(120).optional(),
  experience: z.string().trim().max(60).optional(),
  message: z.string().trim().max(1500).optional(),
});

export const leadStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]),
});

export type LeadInput = z.input<typeof leadSchema>;
export type NewsletterInput = z.input<typeof newsletterSchema>;
export type ApplicationInput = z.input<typeof applicationSchema>;
