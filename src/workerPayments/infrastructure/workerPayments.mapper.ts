import { CreateWorkerPaymentsDto } from '../core/workerPayments.dto';
import { WorkerPayments } from '../core/workerPayments.entity';
import {
  WorkerPaymentsNew,
  WorkerPaymentsRow,
} from './workerPayments.repository';

export function CreateDtoToWorkerPayments(
  dto: CreateWorkerPaymentsDto,
): WorkerPayments {
  return new WorkerPayments({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToWorkerPayments(row: WorkerPaymentsRow): WorkerPayments {
  return new WorkerPayments({
    ...row,
  });
}

export function WorkerPaymentsToRow(item: WorkerPayments): WorkerPaymentsRow {
  return {
    id: item.id,
    workerId: item.workerId,
    serviceSheetId: item.serviceSheetId,
    totalPayment: item.totalPayment,
    paymentDate: item.paymentDate,
    isExtra: item.isExtra,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function WorkerPaymentsToWorkerPaymentsNew(
  item: WorkerPayments,
): WorkerPaymentsNew {
  return {
    workerId: item.workerId,
    serviceSheetId: item.serviceSheetId,
    totalPayment: item.totalPayment,
    paymentDate: item.paymentDate,
    isExtra: item.isExtra,
  };
}
