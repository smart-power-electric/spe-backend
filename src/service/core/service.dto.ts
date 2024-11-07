import { z } from 'zod';
import { createServiceSchema, UpdateServiceSchema } from './service.zod';

export type CreateServiceDto = z.infer<typeof createServiceSchema>;
export type UpdateServiceDto = z.infer<typeof UpdateServiceSchema>;
