ALTER TABLE "main"."clients" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."clients" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."materials" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."materials" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."services" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."services" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."workers" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."workers" ALTER COLUMN "created_at" SET NOT NULL;