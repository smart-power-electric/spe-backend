import { z } from 'zod';
import {
  changePasswordSchema,
  createUserSchema,
  UpdateUserSchema,
} from './user.zod';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;