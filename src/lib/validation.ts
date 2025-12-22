/**
 * Centralized validation schemas for all forms
 * Uses zod for type-safe validation
 */

import { z } from "zod";

// Common validation patterns
const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .email({ message: "Please enter a valid email address" })
  .max(255, { message: "Email must be less than 255 characters" });

const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must be at least 2 characters" })
  .max(100, { message: "Name must be less than 100 characters" })
  .regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters" });

const phoneSchema = z
  .string()
  .trim()
  .max(20, { message: "Phone number is too long" })
  .regex(/^[\d\s+()-]*$/, { message: "Invalid phone number format" })
  .optional()
  .or(z.literal(""));

const messageSchema = z
  .string()
  .trim()
  .min(10, { message: "Message must be at least 10 characters" })
  .max(2000, { message: "Message must be less than 2000 characters" });

// Contact Form Schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: z
    .string()
    .trim()
    .max(100, { message: "Company name is too long" })
    .optional()
    .or(z.literal("")),
  service: z.string({ required_error: "Please select a service" }).min(1, { message: "Please select a service" }),
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: emailSchema,
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Project Inquiry Schema (popup)
export const projectInquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  details: z
    .string()
    .trim()
    .min(10, { message: "Please provide more details about your project" })
    .max(1000, { message: "Details must be less than 1000 characters" }),
});

export type ProjectInquiryData = z.infer<typeof projectInquirySchema>;

// Blog Suggestion Schema
export const blogSuggestionSchema = z.object({
  email: emailSchema,
  topic: z
    .string()
    .trim()
    .max(100, { message: "Topic is too long" })
    .optional()
    .or(z.literal("")),
  details: z
    .string()
    .trim()
    .min(10, { message: "Please provide more details about your suggestion" })
    .max(1000, { message: "Suggestion must be less than 1000 characters" }),
});

export type BlogSuggestionData = z.infer<typeof blogSuggestionSchema>;

// Project Quote Schema
export const projectQuoteSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  companyName: z
    .string()
    .trim()
    .max(100, { message: "Company name is too long" })
    .optional()
    .or(z.literal("")),
  selectedCategory: z.string().min(1, { message: "Please select a category" }),
  selectedFeatures: z.array(z.string()).default([]),
  otherFeatures: z
    .string()
    .trim()
    .max(500, { message: "Additional features text is too long" })
    .optional()
    .or(z.literal("")),
  pages: z.number().min(1).max(100).default(5),
  timeline: z.string().min(1, { message: "Please select a timeline" }),
  budget: z.number().min(20, { message: "Minimum budget is $20" }).max(1000, { message: "Maximum budget is $1000" }).default(100),
  comments: z
    .string()
    .trim()
    .max(2000, { message: "Comments are too long" })
    .optional()
    .or(z.literal("")),
});

export type ProjectQuoteData = z.infer<typeof projectQuoteSchema>;

// Auth Schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(72, { message: "Password is too long" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(72, { message: "Password is too long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  fullName: nameSchema,
});

export type SignupFormData = z.infer<typeof signupSchema>;

// Utility function to sanitize user input for external URLs
export const sanitizeForUrl = (input: string): string => {
  return encodeURIComponent(input.trim().slice(0, 500));
};

// Utility to check for potential XSS patterns
export const containsXss = (input: string): boolean => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<embed/gi,
    /<object/gi,
  ];
  return xssPatterns.some((pattern) => pattern.test(input));
};
