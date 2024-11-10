ALTER TABLE "main"."invoices" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."invoices" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."notifications" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."notifications" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."project_quotation" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."project_quotation" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."projects" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."projects" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."service_sheets" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."service_sheets" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."stages" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."stages" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."worker_assignment" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."worker_assignment" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."worker_payments" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."worker_payments" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."worker_rates" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."worker_rates" ALTER COLUMN "created_at" SET NOT NULL;