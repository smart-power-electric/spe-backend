import { z } from 'zod';
import { createUserSchema, UpdateUserSchema } from './user.zod';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
