import { z } from 'zod';
import { createClientSchema, UpdateClientSchema } from './client.zod';

export type CreateClientDto = z.infer<typeof createClientSchema>;
export type UpdateClientDto = z.infer<typeof UpdateClientSchema>;
