import { Module } from '@nestjs/common';
import { WorkerRatesController } from './infrastructure/workerRates.controller';
import {
  WorkerRatesRepository,
  WorkerRatesUseCases,
} from './core/workerRates.interface';
import { DrizzleWorkerRatesRepository } from './infrastructure/workerRates.repository';
import { WorkerRatesApplication } from './application/workerRates.application';

@Module({
  controllers: [WorkerRatesController],
  providers: [
    {
      provide: WorkerRatesRepository,
      useClass: DrizzleWorkerRatesRepository,
    },
    {
      provide: WorkerRatesUseCases,
      useClass: WorkerRatesApplication,
    },
  ],
})
export class WorkerRatesModule {}
