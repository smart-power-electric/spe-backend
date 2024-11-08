import { Module } from '@nestjs/common';
import { ProjectQuotationApplication } from './application/projectQuotation.application';
import { DrizzleProjectQuotationRepository } from './infrastructure/projectQuotation.repository';
import {
  ProjectQuotationRepository,
  ProjectQuotationUseCases,
} from './core/projectQuotation.interface';
import { ProjectQuotationController } from './infrastructure/projectQuotation.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [ProjectQuotationController],
  providers: [
    {
      provide: ProjectQuotationRepository,
      useClass: DrizzleProjectQuotationRepository,
    },
    {
      provide: ProjectQuotationUseCases,
      useClass: ProjectQuotationApplication,
    },
  ],
})
export class ProjectQuotationModule {}
