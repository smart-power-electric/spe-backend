import { CreateWorkerDto } from '../core/worker.dto';
import { Worker } from '../core/worker.entity';
import { WorkerNew, WorkerRow } from './worker.repository';

export function CreateDtoToWorker(dto: CreateWorkerDto): Worker {
  return new Worker({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
    speciality: dto.speciality,
  });
}
export function RowToWorker(row: WorkerRow): Worker {
  return new Worker({
    ...row,
  });
}

export function WorkerToRow(item: Worker): WorkerRow {
  return {
    id: item.id,
    name: item.name,
    speciality: item.speciality,
    contact: item.contact,
    address: item.address,
    phone: item.phone,
    socialSecurity: item.socialSecurity,
    startDate: item.startDate,
    endDate: item.endDate,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function WorkerToWorkerNew(item: Worker): WorkerNew {
  return {
    name: item.name,
    speciality: item.speciality,
    contact: item.contact,
    address: item.address,
    phone: item.phone,
    socialSecurity: item.socialSecurity,
    startDate: item.startDate,
    endDate: item.endDate,
  };
}