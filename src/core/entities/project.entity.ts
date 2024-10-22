import { projects } from 'src/core/schema/schema';
import { Client } from './client.entity';

export type Project = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

export type FullProject = Project & { client: Client | null };