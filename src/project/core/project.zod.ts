import { z } from 'zod';

export const createProjectSchema = z.object({
  clientId: z.string().nullable().describe('Project ID'),
  name: z.string().nullable().describe('Name of project'),
  description: z.string().nullable().describe('Description of project'),
  location: z.string().nullable().describe('Location of project'),
  startDate: z.coerce.date().nullable().describe('Start date of project'),
  endDate: z.coerce.date().nullable().describe('End date of project'),
});

export const UpdateProjectSchema = z.object({
  clientId: z.string().nullable().describe('Project ID'),
  name: z.string().nullable().describe('Name of project'),
  description: z.string().nullable().describe('Description of project'),
  location: z.string().nullable().describe('Location of project'),
  startDate: z.coerce.date().nullable().describe('Start date of project'),
  endDate: z.coerce.date().nullable().describe('End date of project'),
});
