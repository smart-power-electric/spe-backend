import { z } from 'zod';

export const createWorkerRatesSchema = z.object({
  rate: z.number().nullable().describe('Rate of workerRates'),
  effectiveDate: z.coerce
    .date()
    .nullable()
    .describe('Effective date of workerRates'),
});

export const UpdateWorkerRatesSchema = z.object({
  rate: z.number().optional().nullable().describe('Rate of workerRates'),
  effectiveDate: z.coerce
    .date()
    .optional()
    .nullable()
    .describe('Effective date of workerRates'),
});
