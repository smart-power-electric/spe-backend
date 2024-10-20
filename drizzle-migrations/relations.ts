import { relations } from "drizzle-orm/relations";
import { clientsInMain, projectsInMain, stagesInMain, materialsInMain, projectQuotationInMain, servicesInMain, workerAssignmentInMain, workersInMain, workerRatesInMain, serviceSheetsInMain, workerPaymentsInMain, notificationsInMain, invoicesInMain } from "./schema";

export const projectsInMainRelations = relations(projectsInMain, ({one, many}) => ({
	clientsInMain: one(clientsInMain, {
		fields: [projectsInMain.clientId],
		references: [clientsInMain.id]
	}),
	stagesInMains: many(stagesInMain),
	projectQuotationInMains: many(projectQuotationInMain),
	workerAssignmentInMains: many(workerAssignmentInMain),
	serviceSheetsInMains: many(serviceSheetsInMain),
}));

export const clientsInMainRelations = relations(clientsInMain, ({many}) => ({
	projectsInMains: many(projectsInMain),
	notificationsInMains: many(notificationsInMain),
}));

export const stagesInMainRelations = relations(stagesInMain, ({one, many}) => ({
	projectsInMain: one(projectsInMain, {
		fields: [stagesInMain.projectId],
		references: [projectsInMain.id]
	}),
	workerAssignmentInMains: many(workerAssignmentInMain),
	invoicesInMains: many(invoicesInMain),
}));

export const projectQuotationInMainRelations = relations(projectQuotationInMain, ({one}) => ({
	materialsInMain: one(materialsInMain, {
		fields: [projectQuotationInMain.materialId],
		references: [materialsInMain.id]
	}),
	projectsInMain: one(projectsInMain, {
		fields: [projectQuotationInMain.projectId],
		references: [projectsInMain.id]
	}),
	servicesInMain: one(servicesInMain, {
		fields: [projectQuotationInMain.serviceId],
		references: [servicesInMain.id]
	}),
}));

export const materialsInMainRelations = relations(materialsInMain, ({many}) => ({
	projectQuotationInMains: many(projectQuotationInMain),
}));

export const servicesInMainRelations = relations(servicesInMain, ({many}) => ({
	projectQuotationInMains: many(projectQuotationInMain),
}));

export const workerAssignmentInMainRelations = relations(workerAssignmentInMain, ({one}) => ({
	projectsInMain: one(projectsInMain, {
		fields: [workerAssignmentInMain.projectId],
		references: [projectsInMain.id]
	}),
	stagesInMain: one(stagesInMain, {
		fields: [workerAssignmentInMain.stageId],
		references: [stagesInMain.id]
	}),
	workersInMain: one(workersInMain, {
		fields: [workerAssignmentInMain.workerId],
		references: [workersInMain.id]
	}),
}));

export const workersInMainRelations = relations(workersInMain, ({many}) => ({
	workerAssignmentInMains: many(workerAssignmentInMain),
	workerRatesInMains: many(workerRatesInMain),
	serviceSheetsInMains: many(serviceSheetsInMain),
	workerPaymentsInMains: many(workerPaymentsInMain),
}));

export const workerRatesInMainRelations = relations(workerRatesInMain, ({one}) => ({
	workersInMain: one(workersInMain, {
		fields: [workerRatesInMain.workerId],
		references: [workersInMain.id]
	}),
}));

export const serviceSheetsInMainRelations = relations(serviceSheetsInMain, ({one, many}) => ({
	projectsInMain: one(projectsInMain, {
		fields: [serviceSheetsInMain.projectId],
		references: [projectsInMain.id]
	}),
	workersInMain: one(workersInMain, {
		fields: [serviceSheetsInMain.workerId],
		references: [workersInMain.id]
	}),
	workerPaymentsInMains: many(workerPaymentsInMain),
}));

export const workerPaymentsInMainRelations = relations(workerPaymentsInMain, ({one}) => ({
	serviceSheetsInMain: one(serviceSheetsInMain, {
		fields: [workerPaymentsInMain.serviceSheetId],
		references: [serviceSheetsInMain.id]
	}),
	workersInMain: one(workersInMain, {
		fields: [workerPaymentsInMain.workerId],
		references: [workersInMain.id]
	}),
}));

export const notificationsInMainRelations = relations(notificationsInMain, ({one}) => ({
	clientsInMain: one(clientsInMain, {
		fields: [notificationsInMain.clientId],
		references: [clientsInMain.id]
	}),
	invoicesInMain: one(invoicesInMain, {
		fields: [notificationsInMain.invoiceId],
		references: [invoicesInMain.id]
	}),
}));

export const invoicesInMainRelations = relations(invoicesInMain, ({one, many}) => ({
	notificationsInMains: many(notificationsInMain),
	stagesInMain: one(stagesInMain, {
		fields: [invoicesInMain.stageId],
		references: [stagesInMain.id]
	}),
}));