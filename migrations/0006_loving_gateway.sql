ALTER TABLE "main"."worker_rates" DROP CONSTRAINT "worker_rates_worker_id_fkey";
--> statement-breakpoint
ALTER TABLE "main"."workers" ADD COLUMN "worker_rates_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."workers" ADD CONSTRAINT "workers_worker_rates_id_worker_rates_id_fk" FOREIGN KEY ("worker_rates_id") REFERENCES "main"."worker_rates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "main"."worker_rates" DROP COLUMN IF EXISTS "worker_id";