import { z } from 'zod';

export const createProjectQuotationSchema = z.object({
  projectId: z.string().nullable().describe('Project ID'),
  materialId: z.string().nullable().describe('Material ID'),
  serviceId: z.string().nullable().describe('Service Id'),
  quantity: z.number().nullable().describe('Quantity of the material'),
  totalCost: z.number().nullable().describe('Total cost of the material'),
});

export const UpdateProjectQuotationSchema = z.object({
  projectId: z.string().nullable().describe('Project ID'),
  materialId: z.string().nullable().describe('Material ID'),
  serviceId: z.string().nullable().describe('Service Id'),
  quantity: z.number().nullable().describe('Quantity of the material'),
  totalCost: z.number().nullable().describe('Total cost of the material'),
});
