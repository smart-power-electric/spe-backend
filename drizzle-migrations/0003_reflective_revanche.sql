ALTER TABLE "main"."services" ALTER COLUMN "unit_cost" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "main"."projects" DROP COLUMN IF EXISTS "start_date";--> statement-breakpoint
ALTER TABLE "main"."projects" DROP COLUMN IF EXISTS "end_date";