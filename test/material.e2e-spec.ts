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
  CreateMaterialRequest,
  MaterialApi,
  UpdateMaterialRequest,
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

describe('MaterialModule (e2e)', () => {
  const jestConsole = console;
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
  let appPort = 0;
  let api: MaterialApi;
  let baseStage: Stage;
  let baseProject: Project;
  let baseClient: Client;
  let baseWorker: Worker;
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
    api = new MaterialApi(config);

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
    await app.listen(appPort);
  }, 600000);
  afterAll(async () => {
    await app.close();
    global.console = jestConsole;
  }, 600000);

  it('POST /material', async () => {
    const newItem: CreateMaterialRequest = {
      name: faker.lorem.words(),
      unitCost: faker.number.float({ min: 0, max: 1000 }),
    };
    const item = await api.createMaterial({
      createMaterialRequest: newItem,
    });

    expect(item).toBeDefined();
    expect(item).toBeDefined();
    expect(item.id).toBeDefined();
    expect(item.name).toEqual(newItem.name);
    expect(item.unitCost).toEqual(newItem.unitCost);
    expect(item.createdAt).toBeDefined();
    expect(item.updatedAt).toBeNull();
  }, 600000);
  it('GET /material', async () => {
    const newItem: CreateMaterialRequest = {
      name: faker.lorem.words(),
      unitCost: faker.number.float({ min: 0, max: 1000 }),
    };
    const item = await api.createMaterial({
      createMaterialRequest: newItem,
    });

    const result = await api.findAllMaterial({});
    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.total).toBeGreaterThan(0);
    expect(result.data?.length).toEqual(result.total);

    const result2 = await api.findAllMaterial({
      name: newItem.name ?? '',
    });
    expect(result2).toBeDefined();
    expect(result2.data).toBeDefined();
    expect(result2.total).toBeGreaterThan(0);
    expect(result2.data?.length).toEqual(result2.total);
    expect(
      result2.data.find((x) =>
        x.name?.toLowerCase().includes(newItem.name?.toLowerCase() ?? ''),
      ),
    ).toBeDefined();

    const result5 = await api.findAllMaterial({ limit: 0 });
    expect(result5).toBeDefined();
    expect(result5.data).toBeDefined();
    expect(result5.total).toBeGreaterThan(0);
    expect(result5.data?.length).toEqual(0);

    const result6 = await api.findAllMaterial({ offset: 1000 });
    expect(result6).toBeDefined();
    expect(result6.data).toBeDefined();
    expect(result6.total).toBeGreaterThan(0);
    expect(result6.data?.length).toEqual(0);
  }, 600000);

  it('GET /material/:id', async () => {
    const newItem: CreateMaterialRequest = {
      name: faker.lorem.words(),
      unitCost: faker.number.float({ min: 0, max: 1000 }),
    };
    const item = await api.createMaterial({
      createMaterialRequest: newItem,
    });

    const result = await api.findOneMaterial({ id: item.id ?? '' });
    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
  }, 600000);

  it('PATCH /material/:id', async () => {
    const newItem: CreateMaterialRequest = {
      name: faker.lorem.words(),
      unitCost: faker.number.float({ min: 0, max: 1000 }),
    };
    const item = await api.createMaterial({
      createMaterialRequest: newItem,
    });

    const updatedClient: UpdateMaterialRequest = {
      name: faker.lorem.words(),
      unitCost: faker.number.float({ min: 0, max: 1000 }),
    };
    const result = await api.updateMaterial({
      id: item.id ?? '',
      updateMaterialRequest: updatedClient,
    });

    expect(result).toBeDefined();
    expect(result.id).toEqual(item.id);
    expect(result.name).toEqual(updatedClient.name);
    expect(result.unitCost).toEqual(updatedClient.unitCost);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('DELETE /material/:id', async () => {
    const newItem: CreateMaterialRequest = {
      name: faker.lorem.words(),
      unitCost: faker.number.float({ min: 0, max: 1000 }),
    };
    const item = await api.createMaterial({
      createMaterialRequest: newItem,
    });
    await api.removeMaterial({ id: item.id ?? '' });

    try {
      await api.findOneMaterial({ id: item.id ?? '' });
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ApplicationExceptionResponse) {
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
