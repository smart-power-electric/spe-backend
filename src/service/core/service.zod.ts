import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().nullable().describe('Name of service'),
  unitCost: z.number().nullable().describe('Unit cost of service'),
  description: z.string().nullable().describe('Description of service'),
});

export const UpdateServiceSchema = z.object({
  name: z.string().optional().nullable().describe('Name of service'),
  unitCost: z.number().optional().nullable().describe('Unit cost of service'),
  description: z
    .string()
    .optional()
    .nullable()
    .describe('Description of service'),
});
