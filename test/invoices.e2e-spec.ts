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
  CreateInvoiceRequest,
  InvoicesApi,
  UpdateInvoiceRequest,
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

describe('InvoicesModule (e2e)', () => {
  const jestConsole = console;
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
  let appPort = 0;
  let api: InvoicesApi;
  let baseStage: Stage;
  let baseProject: Project;
  let baseClient: Client;
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
    api = new InvoicesApi(config);

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
    await app.listen(appPort);
  }, 600000);
  afterAll(async () => {
    await app.close();
    global.console = jestConsole;
  }, 600000);

  it('POST /invoice', async () => {
    const newItem: CreateInvoiceRequest = {
      createInvoicesRequest: {
        stageId: baseStage.id,
        date: faker.date.recent().toISOString(),
        totalAmount: +faker.finance.amount(),
        showMaterials: true,
      },
    };
    const result = await api.createInvoice(newItem);

    expect(result).toBeDefined();
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.stageId).toBeDefined();
    expect(result.invoiceNumber).toBeGreaterThan(0);
    expect(result.date).toBeDefined();
    expect(result.totalAmount).toEqual(
      newItem.createInvoicesRequest.totalAmount,
    );
    expect(result.showMaterials).toEqual(
      newItem.createInvoicesRequest.showMaterials,
    );
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeNull();
  }, 600000);
  it('GET /invoice', async () => {
    const newItem: CreateInvoiceRequest = {
      createInvoicesRequest: {
        stageId: baseStage.id,
        date: faker.date.recent().toISOString(),
        totalAmount: +faker.finance.amount(),
        showMaterials: true,
      },
    };
    await api.createInvoice(newItem);

    const result = await api.findAllInvoice({});
    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.total).toBeGreaterThan(0);
    expect(result.data?.length).toEqual(result.total);

    const result2 = await api.findAllInvoice({ stageId: baseStage.id });
    expect(result2).toBeDefined();
    expect(result2.data).toBeDefined();
    expect(result2.total).toBeGreaterThan(0);
    expect(result2.data?.length).toEqual(result2.total);
    expect(
      result2.data?.every((c) =>
        c.stageId?.toLowerCase().includes(baseStage.id.toLowerCase()),
      ),
    ).toBeTruthy();

    const result4 = await api.findAllInvoice({ limit: 0 });
    expect(result4).toBeDefined();
    expect(result4.data).toBeDefined();
    expect(result4.total).toBeGreaterThan(0);
    expect(result4.data?.length).toEqual(0);

    const result5 = await api.findAllInvoice({ offset: 1000 });
    expect(result5).toBeDefined();
    expect(result5.data).toBeDefined();
    expect(result5.total).toBeGreaterThan(0);
    expect(result5.data?.length).toEqual(0);
  }, 600000);

  it('GET /invoice/:id', async () => {
    const newItem: CreateInvoiceRequest = {
      createInvoicesRequest: {
        stageId: baseStage.id,
        date: faker.date.recent().toISOString(),
        totalAmount: +faker.finance.amount(),
        showMaterials: true,
      },
    };
    const item = await api.createInvoice(newItem);

    const result = await api.findOneInvoice({ id: item.id ?? '' });
    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
  }, 600000);

  it('PATCH /invoice/:id', async () => {
    const newItem: CreateInvoiceRequest = {
      createInvoicesRequest: {
        stageId: baseStage.id,
        date: faker.date.recent().toISOString(),
        totalAmount: +faker.finance.amount(),
        showMaterials: true,
      },
    };
    const item = await api.createInvoice(newItem);

    const updatedClient: UpdateInvoiceRequest = {
      id: item.id ?? '',
      updateInvoicesRequest: {
        totalAmount: +faker.finance.amount(),
      },
    };
    const result = await api.updateInvoice(updatedClient);

    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
    expect(result.totalAmount).toEqual(result.totalAmount);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();

    const updatedClient2 = {
      id: item.id ?? '',
      updateInvoicesRequest: {
        totalAmount: null,
      },
    };
    const result2 = await api.updateInvoice(updatedClient2);

    expect(result2).toBeDefined();
    expect(result2.id).toEqual(item.id);
    expect(result2.totalAmount).toBeNull();
    expect(result2.createdAt).toBeDefined();
    expect(result2.updatedAt).toBeDefined();
  });

  it('DELETE /invoice/:id', async () => {
    const newItem: CreateInvoiceRequest = {
      createInvoicesRequest: {
        stageId: baseStage.id,
        date: faker.date.recent().toISOString(),
        totalAmount: +faker.finance.amount(),
        showMaterials: true,
      },
    };
    const item = await api.createInvoice(newItem);

    await api.removeInvoice({ id: item.id ?? '' });

    try {
      await api.findOneInvoice({ id: item.id ?? '' });
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ApplicationExceptionResponse) {
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
