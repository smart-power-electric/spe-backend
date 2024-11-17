ALTER TABLE "main"."invoices" ALTER COLUMN "invoice_number" 
SET DATA TYPE BIGINT USING invoice_number::BIGINT;;--> statement-breakpoint

CREATE SEQUENCE "main"."invoice_number_seq" START 1;--> statement-breakpoint

ALTER TABLE "main"."invoices" ALTER COLUMN "invoice_number" 
SET DEFAULT NEXTVAL('main.invoice_number_seq');--> statement-breakpoint

SELECT SETVAL('main.invoice_number_seq', MAX(invoice_number)) 
FROM "main"."invoices";--> statement-breakpoint

ALTER TABLE "main"."invoices" ALTER COLUMN "invoice_number" 
SET NOT NULL;--> statement-breakpoint