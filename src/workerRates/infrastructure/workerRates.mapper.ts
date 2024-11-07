import { CreateWorkerRatesDto } from '../core/workerRates.dto';
import { WorkerRates } from '../core/workerRates.entity';
import { WorkerRatesNew, WorkerRatesRow } from './workerRates.repository';

export function CreateDtoToWorkerRates(dto: CreateWorkerRatesDto): WorkerRates {
  return new WorkerRates({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToWorkerRates(row: WorkerRatesRow): WorkerRates {
  return new WorkerRates({
    ...row,
  });
}

export function WorkerRatesToRow(item: WorkerRates): WorkerRatesRow {
  return {
    id: item.id,
    workerId: item.workerId,
    rate: item.rate,
    effectiveDate: item.effectiveDate,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function WorkerRatesToWorkerRatesNew(item: WorkerRates): WorkerRatesNew {
  return {
    workerId: item.workerId,
    rate: item.rate,
    effectiveDate: item.effectiveDate,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}
