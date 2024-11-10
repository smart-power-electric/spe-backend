import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommonModule } from '../src/common/common.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
// import { Wait } from 'testcontainers';
import Config from '../src/common/application/application-config/configuration';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dbContainer: StartedPostgreSqlContainer;
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
    const config = Config();
    console.log(JSON.stringify(config));
  }, 600000);
  afterAll(async () => {
    await app.close();
  }, 600000);
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  }, 600000);

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  }, 600000);
});
