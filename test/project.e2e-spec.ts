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
  CreateProjectRequest,
  ProjectApi,
  StageApi,
  UpdateProjectRequest,
  UpsertStageRequest,
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
import { CreateStageRequest } from '../src/stage/infrastructure/stage.swagger';

describe('ProjectModule (e2e)', () => {
  const jestConsole = console;
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
  let appPort = 0;
  let api: ProjectApi;
  let apiStage: StageApi;
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
    api = new ProjectApi(config);
    apiStage = new StageApi(config);

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
      tin: faker.number.int({ min: 1000000, max: 9999999 }).toString(),
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

  it('POST /project', async () => {
    const newItem: CreateProjectRequest = {
      clientId: baseClient.id ?? '',
      name: faker.person.fullName(),
      description: faker.lorem.words(),
      location: faker.location.city(),
      startDate: new Date(),
      endDate: new Date(),
    };
    const item = await api.createProject({
      createProjectRequest: newItem,
    });

    expect(item).toBeDefined();
    expect(item).toBeDefined();
    expect(item.id).toBeDefined();
    expect(item.clientId).toEqual(newItem.clientId);
    expect(item.name).toEqual(newItem.name);
    expect(item.description).toEqual(newItem.description);
    expect(item.location).toEqual(newItem.location);
    expect(item.startDate).toBeDefined();
    expect(item.endDate).toBeDefined();
    expect(item.createdAt).toBeDefined();
    expect(item.updatedAt).toBeNull();
  }, 600000);
  it('GET /project', async () => {
    const newItem: CreateProjectRequest = {
      clientId: baseClient.id ?? '',
      name: faker.person.fullName(),
      description: faker.lorem.words(),
      location: faker.location.city(),
      startDate: new Date(),
      endDate: new Date(),
    };
    const item = await api.createProject({
      createProjectRequest: newItem,
    });

    const result = await api.findAllProject({});
    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.total).toBeGreaterThan(0);
    expect(result.data?.length).toEqual(result.total);

    const result2 = await api.findAllProject({
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
    const result3 = await api.findAllProject({
      clientId: newItem.clientId ?? '',
    });
    expect(result3).toBeDefined();
    expect(result3.data).toBeDefined();
    expect(result3.total).toBeGreaterThan(0);
    expect(result3.data?.length).toEqual(result3.total);
    expect(
      result3.data.find((x) =>
        x.clientId
          ?.toLowerCase()
          .includes(newItem.clientId?.toLowerCase() ?? ''),
      ),
    ).toBeDefined();

    const result5 = await api.findAllProject({ limit: 0 });
    expect(result5).toBeDefined();
    expect(result5.data).toBeDefined();
    expect(result5.total).toBeGreaterThan(0);
    expect(result5.data?.length).toEqual(0);

    const result6 = await api.findAllProject({ offset: 1000 });
    expect(result6).toBeDefined();
    expect(result6.data).toBeDefined();
    expect(result6.total).toBeGreaterThan(0);
    expect(result6.data?.length).toEqual(0);
  }, 600000);

  it('GET /project/:id', async () => {
    const newItem: CreateProjectRequest = {
      clientId: baseClient.id ?? '',
      name: faker.person.fullName(),
      description: faker.lorem.words(),
      location: faker.location.city(),
      startDate: new Date(),
      endDate: new Date(),
    };
    const item = await api.createProject({
      createProjectRequest: newItem,
    });

    const result = await api.findOneProject({ id: item.id ?? '' });
    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
  }, 600000);

  it('PATCH /project/:id', async () => {
    const newItem: CreateProjectRequest = {
      clientId: baseClient.id ?? '',
      name: faker.person.fullName(),
      description: faker.lorem.words(),
      location: faker.location.city(),
      startDate: new Date(),
      endDate: new Date(),
    };
    const item = await api.createProject({
      createProjectRequest: newItem,
    });

    const updatedClient: UpdateProjectRequest = {
      name: faker.person.fullName(),
      description: faker.lorem.words(),
      location: faker.location.city(),
    };
    const result = await api.updateProject({
      id: item.id ?? '',
      updateProjectRequest: updatedClient,
    });

    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
    expect(result.clientId).toEqual(item.clientId);
    expect(result.name).toEqual(updatedClient.name);
    expect(result.description).toEqual(updatedClient.description);
    expect(result.location).toEqual(updatedClient.location);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('DELETE /project/:id', async () => {
    const newItem: CreateProjectRequest = {
      clientId: baseClient.id ?? '',
      name: faker.person.fullName(),
      description: faker.lorem.words(),
      location: faker.location.city(),
      startDate: new Date(),
      endDate: new Date(),
    };
    const item = await api.createProject({
      createProjectRequest: newItem,
    });

    try {
      await api.findOneProject({ id: item.id ?? '' });
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ApplicationExceptionResponse) {
        expect(error.statusCode).toEqual(404);
      }
    }
  });
  it('POST /project/:id/stage/bulk', async () => {
    const newItem: CreateProjectRequest = {
      clientId: baseClient.id ?? '',
      name: faker.person.fullName(),
      description: faker.lorem.words(),
      location: faker.location.city(),
      startDate: new Date(),
      endDate: new Date(),
    };
    const item = await api.createProject({
      createProjectRequest: newItem,
    });

    const insertStage: CreateStageRequest = {
      name: faker.person.fullName(),
      description: faker.lorem.words(),
      projectId: item.id,
      percentage: faker.number.int({ min: 0, max: 100 }),
      adjustedPercentage: faker.number.int({ min: 0, max: 100 }),
      startDate: faker.date.recent(),
      endDate: faker.date.future(),
    };
    const itemUpdateStage = await apiStage.createStage({
      createStageRequest: insertStage,
    });
    const itemDeleteStage = await apiStage.createStage({
      createStageRequest: insertStage,
    });

    const newStage: UpsertStageRequest = {
      id: null,
      projectId: item.id,
      name: faker.word.noun(),
      description: faker.lorem.words(),
      percentage: faker.number.int({ min: 0, max: 100 }),
      adjustedPercentage: faker.number.int({ min: 0, max: 100 }),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
    };

    const updateStage: UpsertStageRequest = {
      id: itemUpdateStage.id,
      projectId: item.id,
      name: faker.word.noun(),
      description: faker.lorem.words(),
      percentage: faker.number.int({ min: 0, max: 100 }),
      adjustedPercentage: faker.number.int({ min: 0, max: 100 }),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
    };

    const response = await api.updateBulkStage({
      id: item.id ?? '',
      upsertStageRequest: [newStage, updateStage],
    });

    expect(response).toBeDefined();
    expect(response.length).toEqual(2);

    const inserted = response.find((x) => x.name === newStage.name);
    const updated = response.find((x) => x.id === updateStage.id);

    expect(inserted).toBeDefined();
    expect(inserted!.id).toBeDefined();
    expect(inserted!.projectId).toEqual(item.id);
    expect(inserted!.name).toEqual(newStage.name);
    expect(inserted!.description).toEqual(newStage.description);
    expect(inserted!.percentage).toEqual(newStage.percentage);
    expect(inserted!.adjustedPercentage).toEqual(newStage.adjustedPercentage);
    expect(inserted!.startDate).toBeDefined();
    expect(inserted!.endDate).toBeDefined();
    expect(inserted!.createdAt).toBeDefined();
    expect(inserted!.updatedAt).toBeNull();

    expect(updated).toBeDefined();
    expect(updated!.id).toEqual(updateStage.id);
    expect(updated!.projectId).toEqual(item.id);
    expect(updated!.name).toEqual(updateStage.name);
    expect(updated!.description).toEqual(updateStage.description);
    expect(updated!.percentage).toEqual(updateStage.percentage);
    expect(updated!.adjustedPercentage).toEqual(updateStage.adjustedPercentage);
    expect(updated!.startDate).toBeDefined();
    expect(updated!.endDate).toBeDefined();
    expect(updated!.createdAt).toBeDefined();
    expect(updated!.updatedAt).toBeDefined();
  });
});
