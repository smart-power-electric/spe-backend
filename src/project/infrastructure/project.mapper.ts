import { CreateProjectDto } from '../core/project.dto';
import { Project } from '../core/project.entity';
import { ProjectNew, ProjectRow } from './project.repository';

export function CreateDtoToProject(dto: CreateProjectDto): Project {
  return new Project({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToProject(row: ProjectRow): Project {
  return new Project({
    ...row,
  });
}

export function ProjectToRow(item: Project): ProjectRow {
  return {
    id: item.id,
    clientId: item.clientId,
    name: item.name,
    description: item.description,
    location: item.location,
    startDate: item.startDate,
    endDate: item.endDate,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function ProjectToProjectNew(item: Project): ProjectNew {
  return {
    name: item.name,
    clientId: item.clientId,
    description: item.description,
    location: item.location,
    startDate: item.startDate,
    endDate: item.endDate,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}
