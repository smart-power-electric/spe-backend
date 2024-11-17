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
  CreateNotificationsRequest,
  NotificationsApi,
  UpdateNotificationsRequest,
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

describe('NotificationModule (e2e)', () => {
  const jestConsole = console;
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
  let appPort = 0;
  let api: NotificationsApi;
  let baseStage: Stage;
  let baseProject: Project;
  let baseClient: Client;
  let baseWorker: Worker;
  let baseInvoice: Invoices;
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
    api = new NotificationsApi(config);

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
      percentage: faker.number.float({ min: 0, max: 100 }),
      adjustedPercentage: faker.number.float({ min: 0, max: 100 }),
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
      invoiceNumber: faker.number.int(),
      totalAmount: faker.number.float({ min: 0, max: 10000 }),
      showMaterials: faker.datatype.boolean(),
      createdAt: new Date(),
      updatedAt: null,
    });
    baseInvoice =
      (await app
        .get<InvoicesRepository>(InvoicesRepository)
        .insert(newContext(), baseInvoice)) ?? baseInvoice;
    await app.listen(appPort);
  }, 600000);
  afterAll(async () => {
    await app.close();
    global.console = jestConsole;
  }, 600000);

  it('POST /notification', async () => {
    const newItem: CreateNotificationsRequest = {
      invoiceId: baseInvoice.id ?? '',
      clientId: baseClient.id ?? '',
      status: faker.lorem.words(),
    };
    const item = await api.createNotification({
      createNotificationsRequest: newItem,
    });

    expect(item).toBeDefined();
    expect(item).toBeDefined();
    expect(item.id).toBeDefined();
    expect(item.invoiceId).toEqual(newItem.invoiceId);
    expect(item.clientId).toEqual(newItem.clientId);
    expect(item.status).toEqual(newItem.status);
    expect(item.createdAt).toBeDefined();
    expect(item.updatedAt).toBeNull();
  }, 600000);
  it('GET /notification', async () => {
    const newItem: CreateNotificationsRequest = {
      invoiceId: baseInvoice.id ?? '',
      clientId: baseClient.id ?? '',
      status: faker.lorem.words(),
    };
    const item = await api.createNotification({
      createNotificationsRequest: newItem,
    });

    const result = await api.findAllNotification({});
    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.total).toBeGreaterThan(0);
    expect(result.data?.length).toEqual(result.total);

    const result2 = await api.findAllNotification({
      clientId: newItem.clientId ?? '',
    });
    expect(result2).toBeDefined();
    expect(result2.data).toBeDefined();
    expect(result2.total).toBeGreaterThan(0);
    expect(result2.data?.length).toEqual(result2.total);
    expect(
      result2.data.find((x) =>
        x.clientId
          ?.toLowerCase()
          .includes(newItem.clientId?.toLowerCase() ?? ''),
      ),
    ).toBeDefined();
    const result3 = await api.findAllNotification({
      invoiceId: newItem.invoiceId ?? '',
    });
    expect(result3).toBeDefined();
    expect(result3.data).toBeDefined();
    expect(result3.total).toBeGreaterThan(0);
    expect(result3.data?.length).toEqual(result3.total);
    expect(
      result3.data.find((x) =>
        x.invoiceId
          ?.toLowerCase()
          .includes(newItem.invoiceId?.toLowerCase() ?? ''),
      ),
    ).toBeDefined();

    const result5 = await api.findAllNotification({ limit: 0 });
    expect(result5).toBeDefined();
    expect(result5.data).toBeDefined();
    expect(result5.total).toBeGreaterThan(0);
    expect(result5.data?.length).toEqual(0);

    const result6 = await api.findAllNotification({ offset: 1000 });
    expect(result6).toBeDefined();
    expect(result6.data).toBeDefined();
    expect(result6.total).toBeGreaterThan(0);
    expect(result6.data?.length).toEqual(0);
  }, 600000);

  it('GET /notification/:id', async () => {
    const newItem: CreateNotificationsRequest = {
      invoiceId: baseInvoice.id ?? '',
      clientId: baseClient.id ?? '',
      status: faker.lorem.words(),
    };
    const item = await api.createNotification({
      createNotificationsRequest: newItem,
    });

    const result = await api.findOneNotification({ id: item.id ?? '' });
    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
  }, 600000);

  it('PATCH /notification/:id', async () => {
    const newItem: CreateNotificationsRequest = {
      invoiceId: baseInvoice.id ?? '',
      clientId: baseClient.id ?? '',
      status: faker.lorem.words(),
    };
    const item = await api.createNotification({
      createNotificationsRequest: newItem,
    });

    const updatedClient: UpdateNotificationsRequest = {
      status: faker.lorem.words(),
    };
    const result = await api.updateNotification({
      id: item.id ?? '',
      updateNotificationsRequest: updatedClient,
    });

    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
    expect(result.status).toEqual(updatedClient.status);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('DELETE /notification/:id', async () => {
    const newItem: CreateNotificationsRequest = {
      invoiceId: baseInvoice.id ?? '',
      clientId: baseClient.id ?? '',
      status: faker.lorem.words(),
    };
    const item = await api.createNotification({
      createNotificationsRequest: newItem,
    });
    await api.removeNotification({ id: item.id ?? '' });

    try {
      await api.findOneNotification({ id: item.id ?? '' });
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ApplicationExceptionResponse) {
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
