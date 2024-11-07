import { z } from 'zod';
import { createWorkerSchema, UpdateWorkerSchema } from './worker.zod';

export type CreateWorkerDto = z.infer<typeof createWorkerSchema>;
export type UpdateWorkerDto = z.infer<typeof UpdateWorkerSchema>;
