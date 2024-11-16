CREATE TABLE IF NOT EXISTS "main"."role" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role_name" varchar NOT NULL,
	"role_description" varchar NOT NULL,
	"role" varchar NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fullname" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"status" varchar NOT NULL,
	"is_enabled" boolean NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main"."user_role" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "main"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main"."user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "main"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
-- Custom SQL migration file, put you code below! --
INSERT INTO "main"."role" ("id", "roleName", "roleDescription", "role") 
VALUES ('0193345e-6b81-7e54-b208-52821d481658', 'Admin', 'Admin role', 'ADMIN');

INSERT INTO "main"."user" ("id", "fullname", "username", "password", "status", "is_enabled")
VALUES ('0193345e-6b81-7e54-b208-52821d481658', 'The Devs', 'developer', '$2y$10$XZBkMD11EqwuYtAayhAZl.Z8WUU00lZuvHNOLeLSywvlr3OklxRJO', 'ACTIVE', true);

