import { z } from 'zod';
import {
  createWorkerRatesSchema,
  UpdateWorkerRatesSchema,
} from './workerRates.zod';

export type CreateWorkerRatesDto = z.infer<typeof createWorkerRatesSchema>;
export type UpdateWorkerRatesDto = z.infer<typeof UpdateWorkerRatesSchema>;
