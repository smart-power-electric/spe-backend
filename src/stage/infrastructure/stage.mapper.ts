import { CreateStageDto } from '../core/stage.dto';
import { Stage } from '../core/stage.entity';
import { StageNew, StageRow } from './stage.repository';

export function CreateDtoToStage(dto: CreateStageDto): Stage {
  return new Stage({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToStage(row: StageRow): Stage {
  return new Stage({
    ...row,
  });
}

export function StageToRow(item: Stage): StageRow {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    projectId: item.projectId,
    percentage: item.percentage,
    adjustedPercentage: item.adjustedPercentage,
    startDate: item.startDate,
    endDate: item.endDate,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function StageToStageNew(item: Stage): StageNew {
  return {
    name: item.name,
    description: item.description,
    projectId: item.projectId,
    percentage: item.percentage,
    adjustedPercentage: item.adjustedPercentage,
    startDate: item.startDate,
    endDate: item.endDate,
  };
}
