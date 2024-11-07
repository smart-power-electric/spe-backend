import { z } from 'zod';
import {
  createWorkerAssignmentSchema,
  UpdateWorkerAssignmentSchema,
} from './workerAssignment.zod';

export type CreateWorkerAssignmentDto = z.infer<
  typeof createWorkerAssignmentSchema
>;
export type UpdateWorkerAssignmentDto = z.infer<
  typeof UpdateWorkerAssignmentSchema
>;
