import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateStageDto, UpdateStageDto } from '../core/stage.dto';
import { Stage } from '../core/stage.entity';
import { StageRow } from './stage.repository';

export class CreateStageRequest implements CreateStageDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the stage',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Description of the stage',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Project ID of the stage',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Percentage of the stage',
    nullable: true,
  })
  percentage: number | null;
  @ApiProperty({
    type: 'number',
    description: 'Adjusted percentage of the stage',
    nullable: true,
  })
  adjustedPercentage: number | null;
  @ApiProperty({
    type: Date,
    description: 'Start date of the stage',
    nullable: true,
  })
  startDate: Date | null;
  @ApiProperty({
    type: Date,
    description: 'End date of the stage',
    nullable: true,
  })
  endDate: Date | null;

  constructor(data: CreateStageDto) {
    this.name = data.name;
    this.description = data.description;
    this.projectId = data.projectId;
    this.percentage = data.percentage;
    this.adjustedPercentage = data.adjustedPercentage;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}

export class UpdateStageRequest implements UpdateStageDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Name of the stage',
    nullable: true,
  })
  name?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Description of the stage',
    nullable: true,
  })
  description?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Project ID of the stage',
    nullable: true,
  })
  projectId?: string | null;
  @ApiPropertyOptional({
    type: 'number',
    description: 'Percentage of the stage',
    nullable: true,
  })
  percentage?: number | null;
  @ApiPropertyOptional({
    type: 'number',
    description: 'Adjusted percentage of the stage',
    nullable: true,
  })
  adjustedPercentage?: number | null;
  @ApiPropertyOptional({
    type: Date,
    description: 'Start date of the stage',
    nullable: true,
  })
  startDate?: Date | null;
  @ApiPropertyOptional({
    type: Date,
    description: 'End date of the stage',
    nullable: true,
  })
  endDate?: Date | null;

  constructor(data: UpdateStageDto) {
    this.name = data.name;
    this.description = data.description;
    this.projectId = data.projectId;
    this.percentage = data.percentage;
    this.adjustedPercentage = data.adjustedPercentage;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}

export class UpsertStageRequest extends UpdateStageRequest {
  @ApiProperty({
    type: 'string',
    description: 'id of the stage',
    nullable: true,
  })
  id: string | null;

  constructor(data: UpdateStageDto & { id: string }) {
    super(data);
    this.id = data.id;
  }
}
export class StageResponse implements StageRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the stage',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Name of the stage',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Description of the stage',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Project ID of the stage',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Percentage of the stage',
    nullable: true,
  })
  percentage: number | null;
  @ApiProperty({
    type: Number,
    description: 'Adjusted percentage of the stage',
    nullable: true,
  })
  adjustedPercentage: number | null;
  @ApiProperty({
    type: Date,
    description: 'Start date of the stage',
    nullable: true,
  })
  startDate: Date | null;
  @ApiProperty({
    type: Date,
    description: 'End date of the stage',
    nullable: true,
  })
  endDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the stage',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the stage',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: Stage) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.projectId = data.projectId;
    this.percentage = data.percentage;
    this.adjustedPercentage = data.adjustedPercentage;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class StagePaginationResponse {
  @ApiProperty({
    type: [StageResponse],
    description: 'Data of the stage',
    nullable: false,
  })
  data: StageResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the stage',
    nullable: false,
  })
  total: number;

  constructor(data: { data: Stage[]; total: number }) {
    this.data = data.data.map((d) => new StageResponse(d));
    this.total = data.total;
  }
}
