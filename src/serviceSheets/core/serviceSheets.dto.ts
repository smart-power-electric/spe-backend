import { z } from 'zod';
import {
  createServiceSheetsSchema,
  UpdateServiceSheetsSchema,
} from './serviceSheets.zod';

export type CreateServiceSheetsDto = z.infer<typeof createServiceSheetsSchema>;
export type UpdateServiceSheetsDto = z.infer<typeof UpdateServiceSheetsSchema>;
