import { CreateWorkerAssignmentDto } from '../core/workerAssignment.dto';
import { WorkerAssignment } from '../core/workerAssignment.entity';
import {
  WorkerAssignmentNew,
  WorkerAssignmentRow,
} from './workerAssignment.repository';

export function CreateDtoToWorkerAssignment(
  dto: CreateWorkerAssignmentDto,
): WorkerAssignment {
  return new WorkerAssignment({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToWorkerAssignment(
  row: WorkerAssignmentRow,
): WorkerAssignment {
  return new WorkerAssignment({
    ...row,
  });
}

export function WorkerAssignmentToRow(
  item: WorkerAssignment,
): WorkerAssignmentRow {
  return {
    id: item.id,
    workerId: item.workerId,
    projectId: item.projectId,
    stageId: item.stageId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function WorkerAssignmentToWorkerAssignmentNew(
  item: WorkerAssignment,
): WorkerAssignmentNew {
  return {
    workerId: item.workerId,
    projectId: item.projectId,
    stageId: item.stageId,
  };
}
