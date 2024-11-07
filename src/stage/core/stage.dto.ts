import { z } from 'zod';
import { createStageSchema, UpdateStageSchema } from './stage.zod';

export type CreateStageDto = z.infer<typeof createStageSchema>;
export type UpdateStageDto = z.infer<typeof UpdateStageSchema>;
