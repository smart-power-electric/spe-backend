import { z } from 'zod';

export const createNotificationsSchema = z.object({
  invoiceId: z.string().nullable().describe('Invoice id of notifications'),
  clientId: z.string().nullable().describe('Client id of notifications'),
  status: z.string().nullable().describe('Status of notifications'),
});

export const UpdateNotificationsSchema = z.object({
  invoiceId: z.string().nullable().describe('Invoice id of notifications'),
  clientId: z.string().nullable().describe('Client id of notifications'),
  status: z.string().nullable().describe('Status of notifications'),
});