import { CreateMaterialDto } from '../core/material.dto';
import { Material } from '../core/material.entity';
import { MaterialNew, MaterialRow } from './material.repository';

export function CreateDtoToMaterial(dto: CreateMaterialDto): Material {
  return new Material({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToMaterial(row: MaterialRow): Material {
  return new Material({
    ...row,
  });
}

export function MaterialToRow(item: Material): MaterialRow {
  return {
    id: item.id,
    name: item.name,
    unitCost: item.unitCost,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function MaterialToMaterialNew(item: Material): MaterialNew {
  return {
    name: item.name,
    unitCost: item.unitCost,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}
