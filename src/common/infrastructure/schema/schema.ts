import {
  pgSchema,
  foreignKey,
  integer,
  varchar,
  text,
  date,
  doublePrecision,
  boolean,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
export const main = pgSchema('main');

export const projects = main.table(
  'projects',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    clientId: uuid('client_id'),
    name: varchar(),
    description: text(),
    location: varchar(),
    startDate: date('start_date', { mode: 'date' }),
    endDate: date('end_date', { mode: 'date' }),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      projectsClientIdFkey: foreignKey({
        columns: [table.clientId],
        foreignColumns: [clients.id],
        name: 'projects_client_id_fkey',
      }),
    };
  },
);

export const materials = main.table('materials', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
  name: varchar(),
  unitCost: doublePrecision('unit_cost'),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});

export const stages = main.table(
  'stages',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    projectId: uuid('project_id'),
    name: varchar(),
    description: text(),
    percentage: doublePrecision(),
    adjustedPercentage: doublePrecision('adjusted_percentage'),
    startDate: date('start_date', { mode: 'date' }),
    endDate: date('end_date', { mode: 'date' }),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      stagesProjectIdFkey: foreignKey({
        columns: [table.projectId],
        foreignColumns: [projects.id],
        name: 'stages_project_id_fkey',
      }),
    };
  },
);

export const projectQuotation = main.table(
  'project_quotation',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    projectId: uuid('project_id'),
    materialId: uuid('material_id'),
    serviceId: uuid('service_id'),
    quantity: integer(),
    totalCost: doublePrecision('total_cost'),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      projectQuotationMaterialIdFkey: foreignKey({
        columns: [table.materialId],
        foreignColumns: [materials.id],
        name: 'project_Quotation_material_id_fkey',
      }),
      projectQuotationProjectIdFkey: foreignKey({
        columns: [table.projectId],
        foreignColumns: [projects.id],
        name: 'project_Quotation_project_id_fkey',
      }),
      projectQuotationServiceIdFkey: foreignKey({
        columns: [table.serviceId],
        foreignColumns: [services.id],
        name: 'project_Quotation_service_id_fkey',
      }),
    };
  },
);

export const services = main.table('services', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
  name: varchar(),
  unitCost: doublePrecision('unit_cost'),
  description: varchar(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});

export const workerAssignment = main.table(
  'worker_assignment',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    workerId: uuid('worker_id'),
    projectId: uuid('project_id'),
    stageId: uuid('stage_id'),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      workerAssignmentProjectIdFkey: foreignKey({
        columns: [table.projectId],
        foreignColumns: [projects.id],
        name: 'worker_assignment_project_id_fkey',
      }),
      workerAssignmentStageIdFkey: foreignKey({
        columns: [table.stageId],
        foreignColumns: [stages.id],
        name: 'worker_assignment_stage_id_fkey',
      }),
      workerAssignmentWorkerIdFkey: foreignKey({
        columns: [table.workerId],
        foreignColumns: [workers.id],
        name: 'worker_assignment_worker_id_fkey',
      }),
    };
  },
);

export const workers = main.table('workers', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
  name: varchar(),
  specialty: varchar(),
  contact: varchar(),
  address: varchar(),
  phone: varchar(),
  socialSecurity: varchar('social_security'),
  startDate: date('start_date', { mode: 'date' }),
  endDate: date('end_date', { mode: 'date' }),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});

export const workerRates = main.table(
  'worker_rates',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    workerId: uuid('worker_id'),
    rate: doublePrecision(),
    effectiveDate: date('effective_date', { mode: 'date' }),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      workerRatesWorkerIdFkey: foreignKey({
        columns: [table.workerId],
        foreignColumns: [workers.id],
        name: 'worker_rates_worker_id_fkey',
      }),
    };
  },
);

export const serviceSheets = main.table(
  'service_sheets',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    workerId: uuid('worker_id'),
    projectId: uuid('project_id'),
    weekStartDate: date('week_start_date', { mode: 'date' }),
    totalHours: integer('total_hours'),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      serviceSheetsProjectIdFkey: foreignKey({
        columns: [table.projectId],
        foreignColumns: [projects.id],
        name: 'service_sheets_project_id_fkey',
      }),
      serviceSheetsWorkerIdFkey: foreignKey({
        columns: [table.workerId],
        foreignColumns: [workers.id],
        name: 'service_sheets_worker_id_fkey',
      }),
    };
  },
);

export const workerPayments = main.table(
  'worker_payments',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    workerId: uuid('worker_id'),
    serviceSheetId: uuid('service_sheet_id'),
    totalPayment: doublePrecision('total_payment'),
    paymentDate: date('payment_date', { mode: 'date' }),
    isExtra: boolean('is_extra'),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      workerPaymentsServiceSheetIdFkey: foreignKey({
        columns: [table.serviceSheetId],
        foreignColumns: [serviceSheets.id],
        name: 'worker_payments_service_sheet_id_fkey',
      }),
      workerPaymentsWorkerIdFkey: foreignKey({
        columns: [table.workerId],
        foreignColumns: [workers.id],
        name: 'worker_payments_worker_id_fkey',
      }),
    };
  },
);

export const notifications = main.table(
  'notifications',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    invoiceId: uuid('invoice_id'),
    clientId: uuid('client_id'),
    status: varchar(),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      notificationsClientIdFkey: foreignKey({
        columns: [table.clientId],
        foreignColumns: [clients.id],
        name: 'notifications_client_id_fkey',
      }),
      notificationsInvoiceIdFkey: foreignKey({
        columns: [table.invoiceId],
        foreignColumns: [invoices.id],
        name: 'notifications_invoice_id_fkey',
      }),
    };
  },
);

export const invoices = main.table(
  'invoices',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    stageId: uuid('stage_id'),
    invoiceNumber: varchar('invoice_number'),
    date: date({ mode: 'date' }),
    totalAmount: doublePrecision('total_amount'),
    showMaterials: boolean('show_materials'),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      invoicesStageIdFkey: foreignKey({
        columns: [table.stageId],
        foreignColumns: [stages.id],
        name: 'invoices_stage_id_fkey',
      }),
    };
  },
);

export const clients = main.table('clients', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
  name: varchar(),
  email: varchar(),
  phone: varchar(),
  address: varchar(),
  city: varchar(),
  state: varchar(),
  zip: varchar(),
  contact: varchar(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});
