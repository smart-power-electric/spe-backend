import { z } from 'zod';
import { createMaterialSchema, UpdateMaterialSchema } from './material.zod';

export type CreateMaterialDto = z.infer<typeof createMaterialSchema>;
export type UpdateMaterialDto = z.infer<typeof UpdateMaterialSchema>;
