import { z } from 'zod';
import { createProjectSchema, UpdateProjectSchema } from './project.zod';

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
