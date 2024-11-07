CREATE SCHEMA "main";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."clients" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"address" varchar,
	"contact" varchar,
	"email" varchar,
	"phone" varchar,
	"city" varchar,
	"state" varchar,
	"zip" varchar,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."invoices" (
	"id" uuid PRIMARY KEY NOT NULL,
	"stage_id" uuid,
	"invoice_number" varchar,
	"date" date,
	"total_amount" numeric,
	"show_materials" boolean,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."materials" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"unit_cost" numeric,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."notifications" (
	"id" uuid PRIMARY KEY NOT NULL,
	"invoice_id" uuid,
	"client_id" uuid,
	"status" varchar,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."project_quotation" (
	"id" uuid PRIMARY KEY NOT NULL,
	"project_id" uuid,
	"material_id" uuid,
	"service_id" uuid,
	"quantity" integer,
	"total_cost" numeric,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."projects" (
	"id" uuid PRIMARY KEY NOT NULL,
	"client_id" uuid,
	"name" varchar,
	"description" text,
	"location" varchar,
	"start_date" date,
	"end_date" date,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."service_sheets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"worker_id" uuid,
	"project_id" uuid,
	"week_start_date" date,
	"total_hours" integer,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."services" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"unit_cost" numeric(10, 2),
	"description" varchar,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."stages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"project_id" uuid,
	"name" varchar,
	"description" text,
	"percentage" double precision,
	"adjusted_percentage" double precision,
	"start_date" date,
	"end_date" date,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."worker_assignment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"worker_id" uuid,
	"project_id" uuid,
	"stage_id" uuid,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."worker_payments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"worker_id" uuid,
	"service_sheet_id" uuid,
	"total_payment" numeric,
	"payment_date" date,
	"is_extra" boolean,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."worker_rates" (
	"id" uuid PRIMARY KEY NOT NULL,
	"worker_id" uuid,
	"rate" numeric,
	"effective_date" date,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."workers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"specialty" varchar,
	"contact" varchar,
	"address" varchar,
	"phone" varchar,
	"social_security" varchar,
	"start_date" date,
	"end_date" date,
	"created_at" timestamp (6) with time zone,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."invoices" ADD CONSTRAINT "invoices_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "main"."stages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."notifications" ADD CONSTRAINT "notifications_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "main"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."notifications" ADD CONSTRAINT "notifications_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "main"."invoices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."project_quotation" ADD CONSTRAINT "project_Quotation_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "main"."materials"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."project_quotation" ADD CONSTRAINT "project_Quotation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "main"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."project_quotation" ADD CONSTRAINT "project_Quotation_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "main"."services"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."projects" ADD CONSTRAINT "projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "main"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."service_sheets" ADD CONSTRAINT "service_sheets_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "main"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."service_sheets" ADD CONSTRAINT "service_sheets_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "main"."workers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."stages" ADD CONSTRAINT "stages_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "main"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."worker_assignment" ADD CONSTRAINT "worker_assignment_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "main"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."worker_assignment" ADD CONSTRAINT "worker_assignment_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "main"."stages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."worker_assignment" ADD CONSTRAINT "worker_assignment_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "main"."workers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."worker_payments" ADD CONSTRAINT "worker_payments_service_sheet_id_fkey" FOREIGN KEY ("service_sheet_id") REFERENCES "main"."service_sheets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."worker_payments" ADD CONSTRAINT "worker_payments_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "main"."workers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."worker_rates" ADD CONSTRAINT "worker_rates_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "main"."workers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
