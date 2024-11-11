import { z } from 'zod';

export const createInvoicesSchema = z.object({
  stageId: z.string().nullable().describe('Stage id of invoices'),
  invoiceNumber: z.string().nullable().describe('Invoice number of invoices'),
  date: z.coerce.date().nullable().describe('Date of invoices'),
  totalAmount: z.number().nullable().describe('Total amount of invoices'),
  showMaterials: z.boolean().nullable().describe('Show materials of invoices'),
});

export const UpdateInvoicesSchema = z.object({
  stageId: z.string().nullable().optional().describe('Stage id of invoices'),
  invoiceNumber: z
    .string()
    .nullable()
    .optional()
    .describe('Invoice number of invoices'),
  date: z.date().nullable().optional().describe('Date of invoices'),
  totalAmount: z
    .number()
    .optional()
    .nullable()
    .describe('Total amount of invoices'),
  showMaterials: z
    .boolean()
    .optional()
    .nullable()
    .describe('Show materials of invoices'),
});
