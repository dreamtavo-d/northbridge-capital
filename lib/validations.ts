import { z } from "zod";

export const investmentAmountSchema = z.object({
  planId: z.string().cuid(),
  amount: z.coerce.number().positive("Amount must be greater than zero."),
});

export const depositSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than zero."),
  reference: z.string().max(200).optional(),
});

export const withdrawalSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than zero."),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty.").max(100),
});

export const investmentPlanSchema = z.object({
  name: z.string().trim().min(1, "Plan name is required.").max(100),
  description: z.string().trim().min(1, "Description is required.").max(1000),
  minInvestment: z.coerce.number().positive("Minimum investment must be greater than zero."),
  maxInvestment: z.coerce.number().positive().optional().nullable(),
  durationDays: z.coerce.number().int().positive("Duration must be a positive number of days."),
  riskCategory: z.enum(["LOW", "MEDIUM", "HIGH"]),
  strategy: z.string().trim().min(1, "Strategy is required.").max(500),
  targetReturnLabel: z.string().max(200).optional().nullable(),
});

export const notificationSchema = z.object({
  userEmail: z.string().email("Enter a valid email address."),
  title: z.string().trim().min(1, "Title is required.").max(150),
  message: z.string().trim().min(1, "Message is required.").max(1000),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});