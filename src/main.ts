import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication, VersioningType } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Context } from './common/core/context.entity';
import { ErrorHandlerFilter } from './common/infrastructure/http/exception/http-exception.filter';

declare global {
  namespace Express {
    interface Request {
      appContext: Context;
    }
  }
}

async function SwaggerSetup(app: INestApplication) {
  const optionsDocumentationV1: SwaggerDocumentOptions = {
    include: [AppModule],
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const configDocumentationV1 = new DocumentBuilder()
    .setTitle('Smart Power Electric API')
    .setDescription('Smart Power Electric API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Please enter token in following format: Bearer ....JWT....',
        bearerFormat: 'JWT',
        type: 'http',
      },
      'AUTH_TOKEN', // Identificador del esquema de seguridad
    )
    .build();
  const documentV1 = SwaggerModule.createDocument(
    app,
    configDocumentationV1,
    optionsDocumentationV1,
  );
  writeFileSync('swaggerV1.json', JSON.stringify(documentV1), {
    encoding: 'utf8',
  });

  SwaggerModule.setup('v1/api', app, documentV1);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  });

    // Compodoc documentation
    app.useStaticAssets(join(__dirname, '..', 'documentation'), {
      prefix: '/docs', // Ruta expuesta: http://localhost:3000/docs
    });

  const { httpAdapter } = app.get(HttpAdapterHost);
  const globalFilters = new ErrorHandlerFilter(httpAdapter);
  app.useGlobalFilters(globalFilters);

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.use(helmet());
  await SwaggerSetup(app);
  const configService = app.get(ConfigService);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  await app.listen(configService.get<number>('port') ?? 3000);
}
bootstrap();
