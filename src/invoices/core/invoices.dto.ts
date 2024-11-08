import { z } from 'zod';
import { createInvoicesSchema, UpdateInvoicesSchema } from './invoices.zod';

export type CreateInvoicesDto = z.infer<typeof createInvoicesSchema>;
export type UpdateInvoicesDto = z.infer<typeof UpdateInvoicesSchema>;
