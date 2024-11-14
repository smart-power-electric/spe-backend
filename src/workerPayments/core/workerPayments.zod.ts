import { z } from 'zod';

export const createWorkerPaymentsSchema = z.object({
  workerId: z.string().nullable().describe('Worker id of workerPayments'),
  serviceSheetId: z
    .string()
    .nullable()
    .describe('Service sheet id of workerPayments'),
  totalPayment: z
    .number()
    .nullable()
    .describe('Total payment of workerPayments'),
  paymentDate: z.coerce
    .date()
    .nullable()
    .describe('Payment date of workerPayments'),
  isExtra: z.boolean().nullable().describe('Is extra of workerPayments'),
});

export const UpdateWorkerPaymentsSchema = z.object({
  workerId: z
    .string()
    .optional()
    .nullable()
    .describe('Worker id of workerPayments'),
  serviceSheetId: z
    .string()
    .optional()
    .nullable()
    .describe('Service sheet id of workerPayments'),
  totalPayment: z
    .number()
    .optional()
    .nullable()
    .describe('Total payment of workerPayments'),
  paymentDate: z.coerce
    .date()
    .optional()
    .nullable()
    .describe('Payment date of workerPayments'),
  isExtra: z
    .boolean()
    .optional()
    .nullable()
    .describe('Is extra of workerPayments'),
});
