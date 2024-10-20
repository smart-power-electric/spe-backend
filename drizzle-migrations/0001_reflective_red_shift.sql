ALTER SEQUENCE "main"."project_Quotation_id_seq" RENAME TO "project_quotation_id_seq";--> statement-breakpoint
ALTER TABLE "main"."project_quotation" ALTER COLUMN "id" SET CACHE 1;--> statement-breakpoint
ALTER TABLE "main"."notifications" ALTER COLUMN "created_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."projects" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."projects" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."materials" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."materials" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."stages" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."stages" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."project_quotation" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."project_quotation" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."services" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."services" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."worker_assignment" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."worker_assignment" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."workers" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."workers" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."worker_rates" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."worker_rates" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."service_sheets" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."service_sheets" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."worker_payments" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."worker_payments" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."notifications" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."invoices" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."invoices" ADD COLUMN "updated_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."clients" ADD COLUMN "email" varchar;--> statement-breakpoint
ALTER TABLE "main"."clients" ADD COLUMN "phone" varchar;--> statement-breakpoint
ALTER TABLE "main"."clients" ADD COLUMN "city" varchar;--> statement-breakpoint
ALTER TABLE "main"."clients" ADD COLUMN "state" varchar;--> statement-breakpoint
ALTER TABLE "main"."clients" ADD COLUMN "zip" varchar;--> statement-breakpoint
ALTER TABLE "main"."clients" ADD COLUMN "created_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "main"."clients" ADD COLUMN "updated_at" timestamp (6) with time zone;