import { CreateProjectQuotationDto } from '../core/projectQuotation.dto';
import { ProjectQuotation } from '../core/projectQuotation.entity';
import {
  ProjectQuotationNew,
  ProjectQuotationRow,
} from './projectQuotation.repository';

export function CreateDtoToProjectQuotation(
  dto: CreateProjectQuotationDto,
): ProjectQuotation {
  return new ProjectQuotation({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToProjectQuotation(
  row: ProjectQuotationRow,
): ProjectQuotation {
  return new ProjectQuotation({
    ...row,
  });
}

export function ProjectQuotationToRow(
  item: ProjectQuotation,
): ProjectQuotationRow {
  return {
    id: item.id,
    projectId: item.projectId,
    materialId: item.materialId,
    serviceId: item.serviceId,
    quantity: item.quantity,
    totalCost: item.totalCost,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function ProjectQuotationToProjectQuotationNew(
  item: ProjectQuotation,
): ProjectQuotationNew {
  return {
    projectId: item.projectId,
    materialId: item.materialId,
    serviceId: item.serviceId,
    quantity: item.quantity,
    totalCost: item.totalCost,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}
