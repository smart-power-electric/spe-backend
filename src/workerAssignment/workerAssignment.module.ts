import { Module } from '@nestjs/common';
import { WorkerAssignmentController } from './infrastructure/workerAssignment.controller';
import {
  WorkerAssignmentRepository,
  WorkerAssignmentUseCases,
} from './core/workerAssignment.interface';
import { DrizzleWorkerAssignmentRepository } from './infrastructure/workerAssignment.repository';
import { WorkerAssignmentApplication } from './application/workerAssignment.application';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [WorkerAssignmentController],
  providers: [
    {
      provide: WorkerAssignmentRepository,
      useClass: DrizzleWorkerAssignmentRepository,
    },
    {
      provide: WorkerAssignmentUseCases,
      useClass: WorkerAssignmentApplication,
    },
  ],
})
export class WorkerAssignmentModule {}
