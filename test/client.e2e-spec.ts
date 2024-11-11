import { ClientApi } from './../client/api/api';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommonModule } from '../src/common/common.module';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { ClientController } from '../src/client/infrastructure/client.controller';
import { ClientApplication } from '../src/client/application/client.application';
import { DrizzleClientRepository } from '../src/client/infrastructure/client.repository';
import {
  ClientRepository,
  ClientUseCases,
} from '../src/client/core/client.interface';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/common/application/application-config/configuration';
import { faker } from '@faker-js/faker';
import { Configuration } from '../client/api/configuration';

describe('ClientModule (e2e)', () => {
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
  let appPort = 0;
  let api: ClientApi;
  beforeAll(async () => {
    jest.setTimeout(60000);
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
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        CommonModule,
      ],
      controllers: [ClientController],
      providers: [
        {
          provide: ClientRepository,
          useClass: DrizzleClientRepository,
        },
        {
          provide: ClientUseCases,
          useClass: ClientApplication,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    appPort = dbContainer.getPort() - 10000;
    const basePath = `http://localhost:${appPort}/v1`;
    api = new ClientApi(basePath);

    app.listen(appPort);
  }, 600000);
  afterAll(async () => {
    await app.close();
  }, 600000);

  it('POST /client', async () => {
    const newClient = {
      name: faker.person.fullName(),
      address: faker.address.streetAddress(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      city: faker.location.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
    };
    const result = await api.createClient(newClient);

    expect(result).toBeDefined();
    expect(result.body).toBeDefined();
    expect(result.body.id).toBeDefined();
    expect(result.body.name).toEqual(newClient.name);
    expect(result.body.address).toEqual(newClient.address);
    expect(result.body.contact).toEqual(newClient.contact);
    expect(result.body.email).toEqual(newClient.email);
    expect(result.body.phone).toEqual(newClient.phone);
    expect(result.body.city).toEqual(newClient.city);
    expect(result.body.state).toEqual(newClient.state);
    expect(result.body.zip).toEqual(newClient.zip);
    expect(result.body.createdAt).toBeDefined();
    expect(result.body.updatedAt).toBeNull();
  }, 600000);
  it('GET /client', async () => {
    const newClient = {
      name: faker.person.fullName(),
      address: faker.address.streetAddress(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      city: faker.location.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
    };
    await api.createClient(newClient);

    const result = await api.findAllClient();
  }, 600000);

  it('GET /client/:id', async () => {}, 600000);

  it('PATCH /client/:id', async () => {});

  it('DELETE /client/:id', async () => {});
});
