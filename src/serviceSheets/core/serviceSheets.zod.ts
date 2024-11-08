import { z } from 'zod';

export const createServiceSheetsSchema = z.object({
  workerId: z.string().nullable().describe('Worker id of serviceSheets'),
  projectId: z.string().nullable().describe('Project id of serviceSheets'),
  weekStartDate: z.coerce
    .date()
    .nullable()
    .describe('Week start date of serviceSheets'),
  totalHours: z.number().nullable().describe('Total hours of serviceSheets'),
});

export const UpdateServiceSheetsSchema = z.object({
  workerId: z.string().nullable().describe('Worker id of serviceSheets'),
  projectId: z.string().nullable().describe('Project id of serviceSheets'),
  weekStartDate: z.coerce
    .date()
    .nullable()
    .describe('Week start date of serviceSheets'),
  totalHours: z.number().nullable().describe('Total hours of serviceSheets'),
});
