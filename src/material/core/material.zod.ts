import { z } from 'zod';

export const createMaterialSchema = z.object({
  name: z.string().nullable().describe('Name of the material'),
  unitCost: z.number().nullable().describe('Unit cost of the material'),
});

export const UpdateMaterialSchema = z.object({
  name: z.string().nullable().optional().describe('Name of the material'),
  unitCost: z
    .number()
    .nullable()
    .optional()
    .describe('Unit cost of the material'),
});
