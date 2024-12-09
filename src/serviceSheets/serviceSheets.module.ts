import { Module } from '@nestjs/common';
import { ServiceSheetsApplication } from './application/serviceSheets.application';
import { DrizzleServiceSheetsRepository } from './infrastructure/serviceSheets.repository';
import {
  ServiceSheetsRepository,
  ServiceSheetsUseCases,
} from './core/serviceSheets.interface';
import { ServiceSheetsController } from './infrastructure/serviceSheets.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [ServiceSheetsController],
  providers: [
    {
      provide: ServiceSheetsRepository,
      useClass: DrizzleServiceSheetsRepository,
    },
    {
      provide: ServiceSheetsUseCases,
      useClass: ServiceSheetsApplication,
    },
  ],
})
export class ServiceSheetsModule {}
