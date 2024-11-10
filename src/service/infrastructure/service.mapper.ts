import { CreateServiceDto } from '../core/service.dto';
import { Service } from '../core/service.entity';
import { ServiceNew, ServiceRow } from './service.repository';

export function CreateDtoToService(dto: CreateServiceDto): Service {
  return new Service({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToService(row: ServiceRow): Service {
  return new Service({
    ...row,
    createdAt: row.createdAt ?? new Date(),
  });
}

export function ServiceToRow(item: Service): ServiceRow {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    unitCost: item.unitCost,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function ServiceToServiceNew(item: Service): ServiceNew {
  return {
    name: item.name,
    description: item.description,
    unitCost: item.unitCost,
  };
}
