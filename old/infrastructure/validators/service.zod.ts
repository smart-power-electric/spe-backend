import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().describe('Name of service'),
  description: z.string().optional().describe('Description of service'),
  unitCost: z
    .number()
    .optional()
    .transform((unitCost) => unitCost ?? 0)
    .describe('Price of service'),
});

export const updateServiceSchema = z.object({
  name: z.string().optional().describe('Name of service'),
  description: z.string().optional().describe('Description of service'),
  unitCost: z
    .number()
    .optional()
    .transform((unitCost) => unitCost ?? 0)
    .describe('Price of service'),
});
