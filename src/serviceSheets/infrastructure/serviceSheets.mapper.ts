import { CreateServiceSheetsDto } from '../core/serviceSheets.dto';
import { ServiceSheets } from '../core/serviceSheets.entity';
import { ServiceSheetsNew, ServiceSheetsRow } from './serviceSheets.repository';

export function CreateDtoToServiceSheets(
  dto: CreateServiceSheetsDto,
): ServiceSheets {
  return new ServiceSheets({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToServiceSheets(row: ServiceSheetsRow): ServiceSheets {
  return new ServiceSheets({
    ...row,
  });
}

export function ServiceSheetsToRow(item: ServiceSheets): ServiceSheetsRow {
  return {
    id: item.id,
    workerId: item.workerId,
    projectId: item.projectId,
    weekStartDate: item.weekStartDate,
    totalHours: item.totalHours,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function ServiceSheetsToServiceSheetsNew(
  item: ServiceSheets,
): ServiceSheetsNew {
  return {
    workerId: item.workerId,
    projectId: item.projectId,
    weekStartDate: item.weekStartDate,
    totalHours: item.totalHours,
  };
}
