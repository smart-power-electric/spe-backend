import { Module } from '@nestjs/common';
import { WorkerPaymentsApplication } from './application/workerPayments.application';
import { DrizzleWorkerPaymentsRepository } from './infrastructure/workerPayments.repository';
import {
  WorkerPaymentsRepository,
  WorkerPaymentsUseCases,
} from './core/workerPayments.interface';
import { WorkerPaymentsController } from './infrastructure/workerPayments.controller';

@Module({
  controllers: [WorkerPaymentsController],
  providers: [
    {
      provide: WorkerPaymentsRepository,
      useClass: DrizzleWorkerPaymentsRepository,
    },
    {
      provide: WorkerPaymentsUseCases,
      useClass: WorkerPaymentsApplication,
    },
  ],
})
export class WorkerPaymentsModule {}
