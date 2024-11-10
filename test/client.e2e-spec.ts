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
import {
  ClientPaginationResponse,
  ClientResponse,
} from '../src/client/infrastructure/client.swagger';
import { Client } from '../src/client/core/client.entity';
import { newContext } from '../src/common/core/context.entity';

describe('ClientModule (e2e)', () => {
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
  let baseClient: Client;
  let deleteClient: Client;
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

    const base = new Client({
      id: undefined,
      name: 'John Doe',
      email: 'email@email.com',
      phone: '1234567890',
      address: '1234 Main St',
      city: 'Anytown',
      state: 'AS',
      zip: '12345',
      contact: 'Jane Doe',
      createdAt: null,
      updatedAt: null,
    });
    const deleteBase = new Client({
      id: undefined,
      name: 'John Doe2',
      email: 'email2@email.com',
      phone: '1234567890',
      address: '1234 Main St',
      city: 'Anytown',
      state: 'AS',
      zip: '12345',
      contact: 'Jane Doe',
      createdAt: null,
      updatedAt: null,
    });

    const result1 = await app
      .get<ClientRepository>(ClientRepository)
      .insert(newContext(), base);

    if (!result1) {
      throw new Error('Client not created');
    }
    baseClient = result1;
    const result2 = await app
      .get<ClientRepository>(ClientRepository)
      .insert(newContext(), deleteBase);
    if (!result2) {
      throw new Error('Client not created');
    }
    deleteClient = result2;
  }, 600000);
  afterAll(async () => {
    await app.close();
  }, 600000);

  it('POST /client', () => {
    request(app.getHttpServer())
      .post('/client')
      .send({
        name: 'John Doe',
        email: 'email@johndoe.com',
        phone: '1234567890',
        address: '1234 Main St',
        city: 'Anytown',
        state: 'AS',
        zip: '12345',
        contact: 'Jane Doe',
      })
      .expect(201)
      .expect((res) => {
        const clientRes = res.body as { data: ClientResponse };
        if (!clientRes.data) {
          throw new Error('Client not created');
        }
        if (clientRes.data.name !== 'John Doe') {
          throw new Error('Client not created by name');
        }
        if (clientRes.data.email !== 'email@johndoe.com') {
          throw new Error('Client not created by email');
        }
        if (clientRes.data.phone !== '1234567890') {
          throw new Error('Client not created by phone');
        }
        if (clientRes.data.address !== '1234 Main St') {
          throw new Error('Client not created by address');
        }
        if (clientRes.data.city !== 'Anytown') {
          throw new Error('Client not created by city');
        }
        if (clientRes.data.state !== 'AS') {
          throw new Error('Client not created by state');
        }
        if (clientRes.data.zip !== '12345') {
          throw new Error('Client not created by zip');
        }
        if (clientRes.data.contact !== 'Jane Doe') {
          throw new Error('Client not created by contact');
        }
        if (!clientRes.data.id) {
          throw new Error('Client not created by id');
        }
        if (!clientRes.data.createdAt) {
          throw new Error('Client not created by createdAt');
        }
        if (clientRes.data.updatedAt) {
          throw new Error('Client not created by updatedAt');
        }
      })
      .end();
  }, 600000);
  it('GET /client', () => {
    request(app.getHttpServer())
      .get('/client')
      .expect(200)
      .expect((res) => {
        const clientsRes = res.body as { data: ClientPaginationResponse };
        if (!clientsRes.data) {
          throw new Error('Clients not found');
        }
        const clients = clientsRes.data;
        if (clients.data.length > 0) {
          throw new Error('Clients not found');
        }
        if (clients.total > 1) {
          throw new Error('Clients not found in total');
        }
        if (clients.data.find((c) => c.id === baseClient.id)) {
          throw new Error('Client base not found');
        }
      })
      .end();
  }, 600000);

  it('GET /client/:id', () => {
    request(app.getHttpServer())
      .get(`/client/${baseClient.id}`)
      .expect(200)
      .expect((res) => {
        const clientRes = res.body as { data: ClientResponse };
        if (!clientRes.data) {
          throw new Error('Client not found');
        }
        if (clientRes.data.id !== baseClient.id) {
          throw new Error('Client not found by id');
        }
        if (clientRes.data.name !== 'John Doe') {
          throw new Error('Client not found by name');
        }
      });
  }, 600000);

  it('PATCH /client/:id', () => {
    request(app.getHttpServer())
      .put(`/client/${baseClient.id}`)
      .send({
        email: baseClient.email?.replace('email', 'newemail'),
        phone: baseClient.phone,
        address: baseClient.address,
        city: 'Newtown',
        state: 'NY',
        zip: null,
        contact: null,
      })
      .expect(200)
      .expect((res) => {
        const clientRes = res.body as { data: ClientResponse };
        if (!clientRes.data) {
          throw new Error('Client not updated');
        }
        if (clientRes.data.id !== baseClient.id) {
          throw new Error('Client not updated by id');
        }
        if (clientRes.data.name !== 'John Doe') {
          throw new Error('Client not updated by name');
        }
        if (
          clientRes.data.email !==
          baseClient.email?.replace('email', 'newemail')
        ) {
          throw new Error('Client not updated by email');
        }
        if (clientRes.data.phone !== baseClient.phone) {
          throw new Error('Client not updated by phone');
        }
        if (clientRes.data.address !== baseClient.address) {
          throw new Error('Client not updated by address');
        }
        if (clientRes.data.city !== 'Newtown') {
          throw new Error('Client not updated by city');
        }
        if (clientRes.data.state !== 'NY') {
          throw new Error('Client not updated by state');
        }
        if (clientRes.data.zip) {
          throw new Error('Client not updated by zip');
        }
        if (clientRes.data.contact) {
          throw new Error('Client not updated by contact');
        }
        if (!clientRes.data.createdAt) {
          throw new Error('Client not updated by createdAt');
        }
        if (!clientRes.data.updatedAt) {
          throw new Error('Client not updated by updatedAt');
        }
      });
  });

  it('DELETE /client/:id', () => {
    request(app.getHttpServer())
      .delete(`/client/${deleteClient.id}`)
      .expect(204);
  });
});
