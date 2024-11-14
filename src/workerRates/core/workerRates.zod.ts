import { z } from 'zod';

export const createWorkerRatesSchema = z.object({
  workerId: z.string().nullable().describe('Worker ID'),
  rate: z.number().nullable().describe('Rate of workerRates'),
  effectiveDate: z.coerce
    .date()
    .nullable()
    .describe('Effective date of workerRates'),
});

export const UpdateWorkerRatesSchema = z.object({
  workerId: z.string().optional().nullable().describe('Worker ID'),
  rate: z.number().optional().nullable().describe('Rate of workerRates'),
  effectiveDate: z.coerce
    .date()
    .optional()
    .nullable()
    .describe('Effective date of workerRates'),
});
