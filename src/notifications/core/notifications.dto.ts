import { z } from 'zod';
import {
  createNotificationsSchema,
  UpdateNotificationsSchema,
} from './notifications.zod';

export type CreateNotificationsDto = z.infer<typeof createNotificationsSchema>;
export type UpdateNotificationsDto = z.infer<typeof UpdateNotificationsSchema>;
