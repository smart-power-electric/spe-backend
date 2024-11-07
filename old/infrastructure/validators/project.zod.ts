import { z } from 'zod';

export const createProjectSchema = z
  .object({
    clientId: z.number().int().positive().describe('Client Id of Project'),
    name: z.string().min(3).max(255).describe('Name of Project'),
    description: z
      .string()
      .optional()
      .nullable()
      .describe('Description of Project'),
    location: z.string().optional().nullable().describe('Location of Project'),
    startDate: z.coerce.date().nullable().describe('Start Date of Project'),
    endDate: z.coerce.date().nullable().describe('End Date of Project'),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate < data.endDate;
      }
      return true;
    },
    {
      message: 'End Date should be greater than Start Date',
    },
  );

export const updateProjectSchema = z
  .object({
    clientId: z
      .number()
      .int()
      .positive()
      .optional()
      .describe('Client Id of Project'),
    name: z.string().min(3).max(255).optional().describe('Name of Project'),
    description: z
      .string()
      .optional()
      .nullable()
      .describe('Description of Project'),
    location: z.string().optional().nullable().describe('Location of Project'),
    startDate: z.coerce.date().nullable().describe('Start Date of Project'),
    endDate: z.coerce.date().nullable().describe('End Date of Project'),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate < data.endDate;
      }
      return true;
    },
    {
      message: 'End Date should be greater than Start Date',
    },
  );
