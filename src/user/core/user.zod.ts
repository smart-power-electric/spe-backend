import { z } from 'zod';

export const createUserSchema = z.object({
  fullname: z.string().describe('Name of the user'),
  email: z.string().email().describe('Email of the user'),
  password: z.string().min(8).max(30).describe('Password of the user'),
  status: z.string().optional().nullable().describe('Status of the user'),
  isEnabled: z.boolean().optional().nullable().describe('Is user enabled'),
});

export const UpdateUserSchema = z.object({
  fullname: z.string().optional().describe('Name of the user'),
  email: z.string().email().optional().describe('Email of the user'),
  password: z
    .string()
    .min(8)
    .max(30)
    .optional()
    .describe('Password of the user'),
  status: z.string().optional().describe('Status of the user'),
  isEnabled: z.boolean().optional().describe('Is user enabled'),
});
