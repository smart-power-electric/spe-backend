import { z } from 'zod';
import {
  createProjectQuotationSchema,
  UpdateProjectQuotationSchema,
} from './projectQuotation.zod';

export type CreateProjectQuotationDto = z.infer<
  typeof createProjectQuotationSchema
>;
export type UpdateProjectQuotationDto = z.infer<
  typeof UpdateProjectQuotationSchema
>;
