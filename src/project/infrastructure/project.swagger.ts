import { ProjectRow } from './project.repository';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProjectDto, UpdateProjectDto } from '../core/project.dto';
import { Project } from '../core/project.entity';

export class CreateProjectRequest implements CreateProjectDto {
  @ApiProperty({
    type: 'string',
    description: 'Client id of the project',
    nullable: true,
  })
  clientId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Name of the project',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Description of the project',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Location of the project',
    nullable: true,
  })
  location: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Start date of the project',
    nullable: true,
  })
  startDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'End date of the project',
    nullable: true,
  })
  endDate: Date | null;

  constructor(data: CreateProjectDto) {
    this.clientId = data.clientId;
    this.name = data.name;
    this.description = data.description;
    this.location = data.location;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}

export class UpdateProjectRequest implements UpdateProjectDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Client id of the project',
    nullable: true,
  })
  clientId?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Name of the project',
    nullable: true,
  })
  name?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Description of the project',
    nullable: true,
  })
  description?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Location of the project',
    nullable: true,
  })
  location?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Start date of the project',
    nullable: true,
  })
  startDate?: Date | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'End date of the project',
    nullable: true,
  })
  endDate?: Date | null;
  constructor(data: UpdateProjectDto) {
    this.clientId = data.clientId;
    this.name = data.name;
    this.description = data.description;
    this.location = data.location;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}

export class ProjectResponse implements ProjectRow {
  @ApiProperty({
    type: 'string',
    description: 'Name of the project',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Description of the project',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Client id of the project',
    nullable: true,
  })
  clientId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Location of the project',
    nullable: true,
  })
  location: string | null;
  @ApiProperty({
    type: Date,
    description: 'Start date of the project',
    nullable: true,
  })
  startDate: Date | null;
  @ApiProperty({
    type: Date,
    description: 'End date of the project',
    nullable: true,
  })
  endDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Id of the project',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the project',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the project',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: Project) {
    this.id = data.id;
    this.clientId = data.clientId;
    this.name = data.name;
    this.description = data.description;
    this.location = data.location;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class ProjectPaginationResponse {
  @ApiProperty({
    type: [ProjectResponse],
    description: 'Data of the project',
    nullable: false,
  })
  data: ProjectResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the project',
    nullable: false,
  })
  total: number;

  constructor(data: { data: Project[]; total: number }) {
    this.data = data.data.map((d) => new ProjectResponse(d));
    this.total = data.total;
  }
}
