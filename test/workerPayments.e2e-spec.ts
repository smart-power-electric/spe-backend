import { ApplicationExceptionResponse } from '../src/common/infrastructure/http/exception/http.swagger';
import { ErrorHandlerFilter } from '../src/common/infrastructure/http/exception/http-exception.filter';
import { AppModule } from '../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { faker } from '@faker-js/faker';
import {
  Configuration,
  CreateWorkerPaymentsRequest,
  WorkerPaymentsApi,
  UpdateWorkerPaymentsRequest,
} from '../client/api';
import { HttpAdapterHost } from '@nestjs/core';
import { Stage } from '../src/stage/core/stage.entity';
import { Project } from '../src/project/core/project.entity';
import { Client } from '../src/client/core/client.entity';
import { ClientRepository } from '../src/client/core/client.interface';
import { newContext } from '../src/common/core/context.entity';
import { ProjectRepository } from '../src/project/core/project.interface';
import { StageRepository } from '../src/stage/core/stage.interface';
import { DrizzleClientRepository } from '../src/client/infrastructure/client.repository';
import { DrizzleProjectRepository } from '../src/project/infrastructure/project.repository';
import { DrizzleStageRepository } from '../src/stage/infrastructure/stage.repository';
import { CommonModule } from '../src/common/common.module';
import * as sysConsole from 'console';
import { WorkerRepository } from '../src/worker/core/worker.interface';
import { DrizzleWorkerRepository } from '../src/worker/infrastructure/worker.repository';
import { Worker } from '../src/worker/core/worker.entity';
import { Invoices } from '../src/invoices/core/invoices.entity';
import { InvoicesRepository } from '../src/invoices/core/invoices.interface';
import { DrizzleInvoicesRepository } from '../src/invoices/infrastructure/invoices.repository';
import { Material } from '../src/material/core/material.entity';
import { Service } from '../src/service/core/service.entity';
import { MaterialRepository } from '../src/material/core/material.interface';
import { DrizzleMaterialRepository } from '../src/material/infrastructure/material.repository';
import { ServiceRepository } from '../src/service/core/service.interface';
import { DrizzleServiceRepository } from '../src/service/infrastructure/service.repository';
import { ServiceSheets } from '../src/serviceSheets/core/serviceSheets.entity';
import { ServiceSheetsRepository } from '../src/serviceSheets/core/serviceSheets.interface';
import { DrizzleServiceSheetsRepository } from '../src/serviceSheets/infrastructure/serviceSheets.repository';

describe('WorkerPaymentsModule (e2e)', () => {
  const jestConsole = console;
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
  let appPort = 0;
  let api: WorkerPaymentsApi;
  let baseStage: Stage;
  let baseProject: Project;
  let baseClient: Client;
  let baseWorker: Worker;
  let baseInvoice: Invoices;
  let baseMaterial: Material;
  let baseService: Service;
  let baseServiceSheet: ServiceSheets;
  beforeAll(async () => {
    global.console = sysConsole;
    dbContainer = await new PostgreSqlContainer()
      .withExposedPorts(5432)
      .start();
    process.env.DATABASE_PORT = dbContainer.getPort().toString();
    process.env.DATABASE_HOST = dbContainer.getHost();
    process.env.DATABASE_USER = dbContainer.getUsername();
    process.env.DATABASE_PASSWORD = dbContainer.getPassword();
    process.env.DATABASE_NAME = dbContainer.getDatabase();
    process.env.NODE_ENV = 'test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CommonModule],
      providers: [
        {
          provide: ClientRepository,
          useClass: DrizzleClientRepository,
        },
        {
          provide: ProjectRepository,
          useClass: DrizzleProjectRepository,
        },
        {
          provide: StageRepository,
          useClass: DrizzleStageRepository,
        },
        {
          provide: WorkerRepository,
          useClass: DrizzleWorkerRepository,
        },
        {
          provide: InvoicesRepository,
          useClass: DrizzleInvoicesRepository,
        },
        {
          provide: MaterialRepository,
          useClass: DrizzleMaterialRepository,
        },
        {
          provide: ServiceRepository,
          useClass: DrizzleServiceRepository,
        },
        {
          provide: ServiceSheetsRepository,
          useClass: DrizzleServiceSheetsRepository,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);
    const globalFilters = new ErrorHandlerFilter(httpAdapter);
    app.useGlobalFilters(globalFilters);

    app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });
    await app.init();
    appPort = dbContainer.getPort() - 10000;
    const basePath = `http://localhost:${appPort}`;
    const config = new Configuration({ basePath });
    api = new WorkerPaymentsApi(config);

    baseClient = new Client({
      id: undefined,
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseClient =
      (await app
        .get<ClientRepository>(ClientRepository)
        .insert(newContext(), baseClient)) ?? baseClient;
    baseProject = new Project({
      clientId: baseClient.id,
      name: faker.word.noun(),
      description: faker.lorem.words(),
      location: faker.location.city(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseProject =
      (await app
        .get<ProjectRepository>(ProjectRepository)
        .insert(newContext(), baseProject)) ?? baseProject;
    baseStage = new Stage({
      projectId: baseProject.id,
      name: faker.word.noun(),
      description: faker.lorem.words(),
      percentage: faker.number.int({ min: 0, max: 100 }),
      adjustedPercentage: faker.number.int({ min: 0, max: 100 }),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseStage =
      (await app
        .get<StageRepository>(StageRepository)
        .insert(newContext(), baseStage)) ?? baseStage;
    baseWorker = new Worker({
      id: undefined,
      name: faker.person.fullName(),
      contact: faker.person.fullName(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: 'international' }),
      socialSecurity: faker.number.int().toString(),
      startDate: faker.date.recent(),
      endDate: faker.date.future(),
      speciality: faker.lorem.words(),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseWorker =
      (await app
        .get<WorkerRepository>(WorkerRepository)
        .insert(newContext(), baseWorker)) ?? baseWorker;
    baseInvoice = new Invoices({
      id: undefined,
      date: new Date(),
      stageId: baseStage.id ?? null,
      invoiceNumber: faker.number.int().toString(),
      totalAmount: faker.number.int({ min: 0, max: 10000 }),
      showMaterials: faker.datatype.boolean(),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseInvoice =
      (await app
        .get<InvoicesRepository>(InvoicesRepository)
        .insert(newContext(), baseInvoice)) ?? baseInvoice;
    baseMaterial = new Material({
      id: undefined,
      name: faker.lorem.word(),
      unitCost: faker.number.int({ min: 0, max: 1000 }),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseMaterial =
      (await app
        .get<MaterialRepository>(MaterialRepository)
        .insert(newContext(), baseMaterial)) ?? baseMaterial;
    baseService = new Service({
      id: undefined,
      name: faker.lorem.word(),
      description: faker.lorem.words(),
      unitCost: faker.number.int({ min: 0, max: 1000 }),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseService =
      (await app
        .get<ServiceRepository>(ServiceRepository)
        .insert(newContext(), baseService)) ?? baseService;
    baseServiceSheet = new ServiceSheets({
      id: undefined,
      workerId: baseWorker.id,
      projectId: baseProject.id,
      weekStartDate: new Date(),
      totalHours: faker.number.int({ min: 0, max: 40 }),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseServiceSheet =
      (await app
        .get<ServiceSheetsRepository>(ServiceSheetsRepository)
        .insert(newContext(), baseServiceSheet)) ?? baseServiceSheet;
    await app.listen(appPort);
  }, 600000);
  afterAll(async () => {
    await app.close();
    global.console = jestConsole;
  }, 600000);

  it('POST/worker-payments', async () => {
    const newItem: CreateWorkerPaymentsRequest = {
      workerId: baseWorker.id,
      serviceSheetId: baseServiceSheet.id,
      totalPayment: faker.number.int({ min: 0, max: 10000 }),
      paymentDate: faker.date.recent(),
      isExtra: faker.datatype.boolean(),
    };
    const item = await api.createWorkerPayments({
      createWorkerPaymentsRequest: newItem,
    });

    expect(item).toBeDefined();
    expect(item).toBeDefined();
    expect(item.id).toBeDefined();
    expect(item.workerId).toEqual(newItem.workerId);
    expect(item.serviceSheetId).toEqual(newItem.serviceSheetId);
    expect(item.totalPayment).toEqual(newItem.totalPayment);
    expect(item.paymentDate).toBeDefined();
    expect(item.isExtra).toEqual(newItem.isExtra);
    expect(item.createdAt).toBeDefined();
    expect(item.updatedAt).toBeNull();
  }, 600000);
  it('GET/worker-payments', async () => {
    const newItem: CreateWorkerPaymentsRequest = {
      workerId: baseWorker.id,
      serviceSheetId: baseServiceSheet.id,
      totalPayment: faker.number.int({ min: 0, max: 10000 }),
      paymentDate: faker.date.recent(),
      isExtra: faker.datatype.boolean(),
    };
    const item = await api.createWorkerPayments({
      createWorkerPaymentsRequest: newItem,
    });

    const result = await api.findAllWorkerPayments({});
    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.total).toBeGreaterThan(0);
    expect(result.data?.length).toEqual(result.total);

    const result2 = await api.findAllWorkerPayments({
      serviceSheetId: baseServiceSheet.id,
    });
    expect(result2).toBeDefined();
    expect(result2.data).toBeDefined();
    expect(result2.total).toBeGreaterThan(0);
    expect(result2.data?.length).toEqual(result2.total);
    expect(
      result2.data.find((x) =>
        x.serviceSheetId
          ?.toLowerCase()
          .includes(newItem.serviceSheetId?.toLowerCase() ?? ''),
      ),
    ).toBeDefined();
    const result3 = await api.findAllWorkerPayments({
      workerId: newItem.workerId ?? '',
    });
    expect(result3).toBeDefined();
    expect(result3.data).toBeDefined();
    expect(result3.total).toBeGreaterThan(0);
    expect(result3.data?.length).toEqual(result3.total);
    expect(
      result3.data.find((x) =>
        x.workerId
          ?.toLowerCase()
          .includes(newItem.workerId?.toLowerCase() ?? ''),
      ),
    ).toBeDefined();
    const result5 = await api.findAllWorkerPayments({ limit: 0 });
    expect(result5).toBeDefined();
    expect(result5.data).toBeDefined();
    expect(result5.total).toBeGreaterThan(0);
    expect(result5.data?.length).toEqual(0);

    const result6 = await api.findAllWorkerPayments({ offset: 1000 });
    expect(result6).toBeDefined();
    expect(result6.data).toBeDefined();
    expect(result6.total).toBeGreaterThan(0);
    expect(result6.data?.length).toEqual(0);
  }, 600000);

  it('GET/worker-payments/:id', async () => {
    const newItem: CreateWorkerPaymentsRequest = {
      workerId: baseWorker.id,
      serviceSheetId: baseServiceSheet.id,
      totalPayment: faker.number.int({ min: 0, max: 10000 }),
      paymentDate: faker.date.recent(),
      isExtra: faker.datatype.boolean(),
    };
    const item = await api.createWorkerPayments({
      createWorkerPaymentsRequest: newItem,
    });

    const result = await api.findOneWorkerPayments({ id: item.id ?? '' });
    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
  }, 600000);

  it('PATCH/worker-payments/:id', async () => {
    const newItem: CreateWorkerPaymentsRequest = {
      workerId: baseWorker.id,
      serviceSheetId: baseServiceSheet.id,
      totalPayment: faker.number.int({ min: 0, max: 10000 }),
      paymentDate: faker.date.recent(),
      isExtra: faker.datatype.boolean(),
    };
    const item = await api.createWorkerPayments({
      createWorkerPaymentsRequest: newItem,
    });

    const updatedClient: UpdateWorkerPaymentsRequest = {
      totalPayment: faker.number.int({ min: 0, max: 10000 }),
      paymentDate: faker.date.recent(),
      isExtra: faker.datatype.boolean(),
    };
    const result = await api.updateWorkerPayments({
      id: item.id ?? '',
      updateWorkerPaymentsRequest: updatedClient,
    });

    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
    expect(result.totalPayment).toEqual(updatedClient.totalPayment);
    expect(result.paymentDate).toBeDefined();
    expect(result.isExtra).toEqual(updatedClient.isExtra);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('DELETE/worker-payments/:id', async () => {
    const newItem: CreateWorkerPaymentsRequest = {
      workerId: baseWorker.id,
      serviceSheetId: baseServiceSheet.id,
      totalPayment: faker.number.int({ min: 0, max: 10000 }),
      paymentDate: faker.date.recent(),
      isExtra: faker.datatype.boolean(),
    };
    const item = await api.createWorkerPayments({
      createWorkerPaymentsRequest: newItem,
    });

    try {
      await api.findOneWorkerPayments({ id: item.id ?? '' });
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ApplicationExceptionResponse) {
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
