import { z } from 'zod';

export const createWorkerAssignmentSchema = z.object({
  workerId: z.string().nullable().describe('Worker ID'),
  projectId: z.string().nullable().describe('Project ID'),
  stageId: z.string().nullable().describe('Stage ID'),
});

export const UpdateWorkerAssignmentSchema = z.object({
  workerId: z.string().nullable().describe('Worker ID'),
  projectId: z.string().nullable().describe('Project ID'),
  stageId: z.string().nullable().describe('Stage ID'),
});
