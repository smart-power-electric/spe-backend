import { z } from 'zod';
import {
  createWorkerPaymentsSchema,
  UpdateWorkerPaymentsSchema,
} from './workerPayments.zod';

export type CreateWorkerPaymentsDto = z.infer<
  typeof createWorkerPaymentsSchema
>;
export type UpdateWorkerPaymentsDto = z.infer<
  typeof UpdateWorkerPaymentsSchema
>;
