import { relations } from "drizzle-orm/relations";
import { clients, projects, stages, materials, projectQuotation, services, workerAssignment, workers, workerRates, serviceSheets, workerPayments, notifications, invoices } from "./schema";

export const projectsRelations = relations(projects, ({one, many}) => ({
	clients: one(clients, {
		fields: [projects.clientId],
		references: [clients.id]
	}),
	stagess: many(stages),
	projectQuotations: many(projectQuotation),
	workerAssignments: many(workerAssignment),
	serviceSheetss: many(serviceSheets),
}));

export const clientsRelations = relations(clients, ({many}) => ({
	projectss: many(projects),
	notificationss: many(notifications),
}));

export const stagesRelations = relations(stages, ({one, many}) => ({
	projects: one(projects, {
		fields: [stages.projectId],
		references: [projects.id]
	}),
	workerAssignments: many(workerAssignment),
	invoicess: many(invoices),
}));

export const projectQuotationRelations = relations(projectQuotation, ({one}) => ({
	materials: one(materials, {
		fields: [projectQuotation.materialId],
		references: [materials.id]
	}),
	projects: one(projects, {
		fields: [projectQuotation.projectId],
		references: [projects.id]
	}),
	services: one(services, {
		fields: [projectQuotation.serviceId],
		references: [services.id]
	}),
}));

export const materialsRelations = relations(materials, ({many}) => ({
	projectQuotations: many(projectQuotation),
}));

export const servicesRelations = relations(services, ({many}) => ({
	projectQuotations: many(projectQuotation),
}));

export const workerAssignmentRelations = relations(workerAssignment, ({one}) => ({
	projects: one(projects, {
		fields: [workerAssignment.projectId],
		references: [projects.id]
	}),
	stages: one(stages, {
		fields: [workerAssignment.stageId],
		references: [stages.id]
	}),
	workers: one(workers, {
		fields: [workerAssignment.workerId],
		references: [workers.id]
	}),
}));

export const workersRelations = relations(workers, ({many}) => ({
	workerAssignments: many(workerAssignment),
	workerRatess: many(workerRates),
	serviceSheetss: many(serviceSheets),
	workerPaymentss: many(workerPayments),
}));

export const workerRatesRelations = relations(workerRates, ({one}) => ({
	workers: one(workers, {
		fields: [workerRates.workerId],
		references: [workers.id]
	}),
}));

export const serviceSheetsRelations = relations(serviceSheets, ({one, many}) => ({
	projects: one(projects, {
		fields: [serviceSheets.projectId],
		references: [projects.id]
	}),
	workers: one(workers, {
		fields: [serviceSheets.workerId],
		references: [workers.id]
	}),
	workerPaymentss: many(workerPayments),
}));

export const workerPaymentsRelations = relations(workerPayments, ({one}) => ({
	serviceSheets: one(serviceSheets, {
		fields: [workerPayments.serviceSheetId],
		references: [serviceSheets.id]
	}),
	workers: one(workers, {
		fields: [workerPayments.workerId],
		references: [workers.id]
	}),
}));

export const notificationsRelations = relations(notifications, ({one}) => ({
	clients: one(clients, {
		fields: [notifications.clientId],
		references: [clients.id]
	}),
	invoices: one(invoices, {
		fields: [notifications.invoiceId],
		references: [invoices.id]
	}),
}));

export const invoicesRelations = relations(invoices, ({one, many}) => ({
	notificationss: many(notifications),
	stages: one(stages, {
		fields: [invoices.stageId],
		references: [stages.id]
	}),
}));