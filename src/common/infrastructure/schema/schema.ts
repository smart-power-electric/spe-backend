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
  bigserial,
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
    })
      .defaultNow()
      .notNull(),
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
  })
    .defaultNow()
    .notNull(),
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
    })
      .defaultNow()
      .notNull(),
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
    })
      .defaultNow()
      .notNull(),
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
  })
    .defaultNow()
    .notNull(),
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
    })
      .defaultNow()
      .notNull(),
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
export const workerRates = main.table('worker_rates', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
  rate: doublePrecision(),
  effectiveDate: date('effective_date', { mode: 'date' }),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});

export const workers = main.table('workers', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
  workerRatesId: uuid('worker_rates_id').references(() => workerRates.id),
  name: varchar(),
  speciality: varchar(),
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
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});


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
    })
      .defaultNow()
      .notNull(),
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
    })
      .defaultNow()
      .notNull(),
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
    //add projectId
    // projectId NAMEX has finished stage NAMEY
    // billing Information
    //7 days before finish create notification but not send just for admin seend with status pending billing
    // after stage finish send notification with sent billing status
    // then create invoice with pending status
    status: varchar(),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    })
      .defaultNow()
      .notNull(),
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
    invoiceNumber: bigserial('invoice_number', { mode: 'number' }).notNull(),
    date: date({ mode: 'date' }),
    totalAmount: doublePrecision('total_amount'),
    showMaterials: boolean('show_materials'),
    //add status pending, paid, reject
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    })
      .defaultNow()
      .notNull(),
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
  tin: varchar(),
  address: varchar(),
  city: varchar(),
  state: varchar(),
  zip: varchar(),
  contact: varchar(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});

export const user = main.table('user', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
  fullname: varchar().notNull(),
  username: varchar().notNull(),
  password: varchar().notNull(),
  status: varchar().notNull(),
  isEnabled: boolean('is_enabled').notNull(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
  deletedAt: timestamp('deleted_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});
export const role = main.table('role', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
  roleName: varchar('role_name').notNull(),
  roleDescription: varchar('role_description').notNull(),
  role: varchar().notNull(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
  deletedAt: timestamp('deleted_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date',
  }),
});

export const userRole = main.table(
  'user_role',
  {
    id: uuid('id').primaryKey().$defaultFn(uuidv7).notNull(),
    userId: uuid('user_id').notNull(),
    roleId: uuid('role_id').notNull(),
    createdAt: timestamp('created_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
    deletedAt: timestamp('deleted_at', {
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }),
  },
  (table) => {
    return {
      userRoleUserIdFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: 'user_role_user_id_fkey',
      }),
      userRoleRoleIdFkey: foreignKey({
        columns: [table.roleId],
        foreignColumns: [role.id],
        name: 'user_role_role_id_fkey',
      }),
    };
  },
);
