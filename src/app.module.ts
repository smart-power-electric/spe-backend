import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/application/application-config/configuration';
import { CommonModule } from './common/common.module';
import { VersionModule } from './version/version.module';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { MaterialModule } from './material/material.module';
import { StageModule } from './stage/stage.module';
import { ProjectQuotationModule } from './projectQuotation/projectQuotation.module';
import { WorkerAssignmentModule } from './workerAssignment/workerAssignment.module';
import { WorkerModule } from './worker/worker.module';
import { WorkerRatesModule } from './workerRates/workerRates.module';
import { ServiceSheetsModule } from './serviceSheets/serviceSheets.module';
import { WorkerPaymentsModule } from './workerPayments/workerPayments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ServiceModule } from './service/service.module';
import { LoggingMiddleware } from './common/infrastructure/http/middleware/logging.middleware';
import { AppContextMiddleware } from './common/infrastructure/http/middleware/context.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CommonModule,
    VersionModule,
    ClientModule,
    InvoicesModule,
    MaterialModule,
    NotificationsModule,
    ProjectModule,
    ProjectQuotationModule,
    ServiceModule,
    ServiceSheetsModule,
    StageModule,
    UserModule,
    WorkerModule,
    WorkerAssignmentModule,
    WorkerPaymentsModule,
    WorkerRatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware, AppContextMiddleware).forRoutes('*');
  }
}
