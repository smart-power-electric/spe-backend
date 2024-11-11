UPDATE "main"."clients" SET "created_at" = now() WHERE "created_at" IS NULL;--> statement-breakpoint
UPDATE "main"."materials" SET "created_at" = now() WHERE "created_at" IS NULL;--> statement-breakpoint
UPDATE "main"."services" SET "created_at" = now() WHERE "created_at" IS NULL;--> statement-breakpoint
UPDATE "main"."workers" SET "created_at" = now() WHERE "created_at" IS NULL;--> statement-breakpoint
ALTER TABLE "main"."clients" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."clients" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."materials" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."materials" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."services" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."services" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "main"."workers" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "main"."workers" ALTER COLUMN "created_at" SET NOT NULL;