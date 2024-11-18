import { ErrorHandlerFilter } from './../src/common/infrastructure/http/exception/http-exception.filter';
import { AppModule } from './../src/app.module';
import { ApplicationExceptionResponse } from '../src/common/infrastructure/http/exception/http.swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { faker } from '@faker-js/faker';
import { ClientApi, Configuration } from '../client/api';
import { HttpAdapterHost } from '@nestjs/core';
import * as sysConsole from 'console';

describe('ClientModule (e2e)', () => {
  const jestConsole = console;
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
  let appPort = 0;
  let api: ClientApi;
  beforeAll(async () => {
    global.console = sysConsole;
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
      imports: [AppModule],
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
    api = new ClientApi(config);

    await app.listen(appPort);
  }, 600000);
  afterAll(async () => {
    await app.close();
    global.console = jestConsole;
  }, 600000);

  it('POST /client', async () => {
    const newClient = {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      tin: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
    };
    const result = await api.createClient({ createClientRequest: newClient });

    expect(result).toBeDefined();
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(newClient.name);
    expect(result.address).toEqual(newClient.address);
    expect(result.tin).toEqual(newClient.tin);
    expect(result.contact).toEqual(newClient.contact);
    expect(result.email).toEqual(newClient.email);
    expect(result.phone).toEqual(newClient.phone);
    expect(result.city).toEqual(newClient.city);
    expect(result.state).toEqual(newClient.state);
    expect(result.zip).toEqual(newClient.zip);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeNull();
  }, 600000);
  it('GET /client', async () => {
    const newClient = {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      tin: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
    };
    await api.createClient({ createClientRequest: newClient });
    const newClient2 = {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      tin: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
    };
    await api.createClient({ createClientRequest: newClient2 });

    const result = await api.findAllClient({});
    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.total).toBeGreaterThan(0);
    expect(result.data?.length).toEqual(result.total);

    const result2 = await api.findAllClient({ name: newClient.name });
    expect(result2).toBeDefined();
    expect(result2.data).toBeDefined();
    expect(result2.total).toBeGreaterThan(0);
    expect(result2.data?.length).toEqual(result2.total);
    expect(
      result2.data?.every((c) =>
        c.name?.toLowerCase().includes(newClient.name.toLowerCase()),
      ),
    ).toBeTruthy();

    const result3 = await api.findAllClient({ email: newClient.email });
    expect(result3).toBeDefined();
    expect(result3.data).toBeDefined();
    expect(result3.total).toBeGreaterThan(0);
    expect(result3.data?.length).toEqual(result3.total);
    expect(
      result3.data?.every((c) =>
        c.email?.toLowerCase().includes(newClient.email.toLowerCase()),
      ),
    ).toBeTruthy();

    const result4 = await api.findAllClient({ limit: 0 });
    expect(result4).toBeDefined();
    expect(result4.data).toBeDefined();
    expect(result4.total).toBeGreaterThan(0);
    expect(result4.data?.length).toEqual(0);

    const result5 = await api.findAllClient({ offset: 1000 });
    expect(result5).toBeDefined();
    expect(result5.data).toBeDefined();
    expect(result5.total).toBeGreaterThan(0);
    expect(result5.data?.length).toEqual(0);

    const ascSort = await api.findAllClient({
      sortField: 'createdAt',
      sortOrder: 'ASC',
    });

    const descSort = await api.findAllClient({
      sortField: 'createdAt',
      sortOrder: 'DESC',
    });

    expect(ascSort).toBeDefined();
    expect(descSort).toBeDefined();
    expect(ascSort.data).toBeDefined();
    expect(descSort.data).toBeDefined();
    expect(ascSort.total).toBeGreaterThan(0);
    expect(descSort.total).toBeGreaterThan(0);
    expect(ascSort.data?.length).toEqual(ascSort.total);
    expect(descSort.data?.length).toEqual(descSort.total);
    expect(ascSort.data).toEqual(descSort.data?.reverse());
    
  }, 600000);

  it('GET /client/:id', async () => {
    const newClient = {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      tin: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
    };
    const clientCreated = await api.createClient({
      createClientRequest: newClient,
    });

    const result = await api.findOneClient({ id: clientCreated.id ?? '' });
    expect(result).toBeDefined();
    expect(result.id).toEqual(clientCreated.id);
  }, 600000);

  it('PATCH /client/:id', async () => {
    const newClient = {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      tin: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
    };
    const clientCreated = await api.createClient({
      createClientRequest: newClient,
    });

    const updatedClient = {
      name: faker.person.fullName(),
      zip: faker.location.zipCode(),
    };
    const result = await api.updateClient({
      id: clientCreated.id ?? '',
      updateClientRequest: updatedClient,
    });

    expect(result).toBeDefined();
    expect(result.id).toEqual(clientCreated.id);
    expect(result.name).toEqual(updatedClient.name);
    expect(result.zip).toEqual(updatedClient.zip);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();

    const updatedClient2 = {
      city: null,
    };
    const result2 = await api.updateClient({
      id: clientCreated.id ?? '',
      updateClientRequest: updatedClient2,
    });

    expect(result2).toBeDefined();
    expect(result2.id).toEqual(clientCreated.id);
    expect(result2.city).toBeNull();
    expect(result2.createdAt).toBeDefined();
    expect(result2.updatedAt).toBeDefined();
  });

  it('DELETE /client/:id', async () => {
    const newClient = {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      tin: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
    };
    const clientCreated = await api.createClient({
      createClientRequest: newClient,
    });

    await api.removeClient({ id: clientCreated.id ?? '' });

    try {
      await api.findOneClient({ id: clientCreated.id ?? '' });
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ApplicationExceptionResponse) {
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
