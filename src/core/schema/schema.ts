import { pgSchema, foreignKey, integer, varchar, text, date, numeric, doublePrecision, boolean, timestamp } from "drizzle-orm/pg-core"

export const main = pgSchema("main");

export const projectQuotationIdSeq = main.sequence("project_Quotation_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })


export const projects = main.table("projects", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.projects_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	clientId: integer("client_id"),
	name: varchar(),
	description: text(),
	location: varchar(),
	startDate: date("start_date"),
	endDate: date("end_date"),
},
(table) => {
	return {
		projectsClientIdFkey: foreignKey({
			columns: [table.clientId],
			foreignColumns: [clients.id],
			name: "projects_client_id_fkey"
		}),
	}
});

export const materials = main.table("materials", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.materials_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar(),
	unitCost: numeric("unit_cost"),
});

export const stages = main.table("stages", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.stages_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	projectId: integer("project_id"),
	name: varchar(),
	description: text(),
	percentage: doublePrecision(),
	adjustedPercentage: doublePrecision("adjusted_percentage"),
	startDate: date("start_date"),
	endDate: date("end_date"),
},
(table) => {
	return {
		stagesProjectIdFkey: foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "stages_project_id_fkey"
		}),
	}
});

export const projectQuotation = main.table("project_quotation", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.project_quotation_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	projectId: integer("project_id"),
	materialId: integer("material_id"),
	serviceId: integer("service_id"),
	quantity: integer(),
	totalCost: numeric("total_cost"),
},
(table) => {
	return {
		projectQuotationMaterialIdFkey: foreignKey({
			columns: [table.materialId],
			foreignColumns: [materials.id],
			name: "project_Quotation_material_id_fkey"
		}),
		projectQuotationProjectIdFkey: foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "project_Quotation_project_id_fkey"
		}),
		projectQuotationServiceIdFkey: foreignKey({
			columns: [table.serviceId],
			foreignColumns: [services.id],
			name: "project_Quotation_service_id_fkey"
		}),
	}
});

export const services = main.table("services", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.services_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar(),
	unitCost: numeric("unit_cost"),
});

export const workerAssignment = main.table("worker_assignment", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.worker_assignment_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	workerId: integer("worker_id"),
	projectId: integer("project_id"),
	stageId: integer("stage_id"),
},
(table) => {
	return {
		workerAssignmentProjectIdFkey: foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "worker_assignment_project_id_fkey"
		}),
		workerAssignmentStageIdFkey: foreignKey({
			columns: [table.stageId],
			foreignColumns: [stages.id],
			name: "worker_assignment_stage_id_fkey"
		}),
		workerAssignmentWorkerIdFkey: foreignKey({
			columns: [table.workerId],
			foreignColumns: [workers.id],
			name: "worker_assignment_worker_id_fkey"
		}),
	}
});

export const workers = main.table("workers", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.workers_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar(),
	specialty: varchar(),
	contact: varchar(),
	address: varchar(),
	phone: varchar(),
	socialSecurity: varchar("social_security"),
	startDate: date("start_date"),
	endDate: date("end_date"),
});

export const workerRates = main.table("worker_rates", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.worker_rates_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	workerId: integer("worker_id"),
	rate: numeric(),
	effectiveDate: date("effective_date"),
},
(table) => {
	return {
		workerRatesWorkerIdFkey: foreignKey({
			columns: [table.workerId],
			foreignColumns: [workers.id],
			name: "worker_rates_worker_id_fkey"
		}),
	}
});

export const serviceSheets = main.table("service_sheets", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.service_sheets_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	workerId: integer("worker_id"),
	projectId: integer("project_id"),
	weekStartDate: date("week_start_date"),
	totalHours: integer("total_hours"),
},
(table) => {
	return {
		serviceSheetsProjectIdFkey: foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "service_sheets_project_id_fkey"
		}),
		serviceSheetsWorkerIdFkey: foreignKey({
			columns: [table.workerId],
			foreignColumns: [workers.id],
			name: "service_sheets_worker_id_fkey"
		}),
	}
});

export const workerPayments = main.table("worker_payments", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.worker_payments_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	workerId: integer("worker_id"),
	serviceSheetId: integer("service_sheet_id"),
	totalPayment: numeric("total_payment"),
	paymentDate: date("payment_date"),
	isExtra: boolean("is_extra"),
},
(table) => {
	return {
		workerPaymentsServiceSheetIdFkey: foreignKey({
			columns: [table.serviceSheetId],
			foreignColumns: [serviceSheets.id],
			name: "worker_payments_service_sheet_id_fkey"
		}),
		workerPaymentsWorkerIdFkey: foreignKey({
			columns: [table.workerId],
			foreignColumns: [workers.id],
			name: "worker_payments_worker_id_fkey"
		}),
	}
});

export const notifications = main.table("notifications", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.notifications_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	invoiceId: integer("invoice_id"),
	clientId: integer("client_id"),
	status: varchar(),
	createdAt: timestamp("created_at", { mode: 'string' }),
},
(table) => {
	return {
		notificationsClientIdFkey: foreignKey({
			columns: [table.clientId],
			foreignColumns: [clients.id],
			name: "notifications_client_id_fkey"
		}),
		notificationsInvoiceIdFkey: foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [invoices.id],
			name: "notifications_invoice_id_fkey"
		}),
	}
});

export const invoices = main.table("invoices", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.invoices_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	stageId: integer("stage_id"),
	invoiceNumber: varchar("invoice_number"),
	date: date(),
	totalAmount: numeric("total_amount"),
	showMaterials: boolean("show_materials"),
},
(table) => {
	return {
		invoicesStageIdFkey: foreignKey({
			columns: [table.stageId],
			foreignColumns: [stages.id],
			name: "invoices_stage_id_fkey"
		}),
	}
});

export const clients = main.table("clients", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "main.clients_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar(),
	address: varchar(),
	contact: varchar(),
});
