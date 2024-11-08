import { Module } from '@nestjs/common';
import { InvoicesApplication } from './application/invoices.application';
import { DrizzleInvoicesRepository } from './infrastructure/invoices.repository';
import {
  InvoicesRepository,
  InvoicesUseCases,
} from './core/invoices.interface';
import { InvoicesController } from './infrastructure/invoices.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [InvoicesController],
  providers: [
    {
      provide: InvoicesRepository,
      useClass: DrizzleInvoicesRepository,
    },
    {
      provide: InvoicesUseCases,
      useClass: InvoicesApplication,
    },
  ],
})
export class InvoicesModule {}
