import { z } from 'zod';

export const createStageSchema = z.object({
  projectId: z.string().nullable().describe('Project ID'),
  name: z.string().nullable().describe('Name of stage'),
  description: z.string().nullable().describe('Description of stage'),
  percentage: z.number().nullable().describe('Percentage of stage'),
  adjustedPercentage: z
    .number()
    .nullable()
    .describe('Adjusted percentage of stage'),
  startDate: z.coerce.date().nullable().describe('Start date of stage'),
  endDate: z.coerce.date().nullable().describe('End date of stage'),
});

export const UpdateStageSchema = z.object({
  projectId: z.string().nullable().describe('Project ID'),
  name: z.string().nullable().describe('Name of stage'),
  description: z.string().nullable().describe('Description of stage'),
  percentage: z.number().nullable().describe('Percentage of stage'),
  adjustedPercentage: z
    .number()
    .nullable()
    .describe('Adjusted percentage of stage'),
  startDate: z.coerce.date().nullable().describe('Start date of stage'),
  endDate: z.coerce.date().nullable().describe('End date of stage'),
});
