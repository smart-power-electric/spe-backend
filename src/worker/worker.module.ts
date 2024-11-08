import { Module } from '@nestjs/common';
import { WorkerApplication } from './application/worker.application';
import { DrizzleWorkerRepository } from './infrastructure/worker.repository';
import { WorkerRepository, WorkerUseCases } from './core/worker.interface';
import { WorkerController } from './infrastructure/worker.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [WorkerController],
  providers: [
    {
      provide: WorkerRepository,
      useClass: DrizzleWorkerRepository,
    },
    {
      provide: WorkerUseCases,
      useClass: WorkerApplication,
    },
  ],
})
export class WorkerModule {}
