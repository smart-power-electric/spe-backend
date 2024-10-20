import { clients } from 'src/core/schema/schema';

export type Client = typeof clients.$inferSelect;
export type ClientInsert = typeof clients.$inferInsert;
