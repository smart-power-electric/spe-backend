import { services } from 'src/core/schema/schema';

export type Service = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;
