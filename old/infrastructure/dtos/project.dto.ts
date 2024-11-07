import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientDto } from './client.dto';

export class ProjectDto {
  @ApiProperty({ type: Number, example: 1, description: 'Id of Project' })
  id: number;
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Client Id of Project',
  })
  clientId: number;
  @ApiProperty({
    type: ClientDto,
    example: 1,
    description: 'Client of Project',
  })
  client: ClientDto;
  @ApiProperty({
    type: String,
    example: 'Project Name',
    description: 'Name of Project',
  })
  name: string;
  @ApiPropertyOptional({
    type: String,
    example: 'Project Description',
    description: 'Description of Project',
  })
  description?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: 100,
    description: 'Location of Project',
  })
  location?: string | null;
  @ApiPropertyOptional({
    type: Date,
    example: "2021-09-01",
    description: 'Start Date of Project',
  })
  startDate?: Date | null;
  @ApiPropertyOptional({
    type: Date,
    example: "2021-09-01",
    description: 'End Date of Project',
  })
  endDate?: Date | null;

  constructor(
    id: number,
    clientId: number,
    client: ClientDto,
    name: string,
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.id = id;
    this.clientId = clientId;
    this.client = client;
    this.name = name;
    this.description = description;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export class CreateProjectRequest {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Client Id of Project',
  })
  clientId: number;
  @ApiProperty({
    type: String,
    example: 'Project Name',
    description: 'Name of Project',
  })
  name: string;
  @ApiPropertyOptional({
    type: String,
    example: 'Project Description',
    description: 'Description of Project',
  })
  description?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: 100,
    description: 'Location of Project',
  })
  location?: string | null;
  @ApiPropertyOptional({
    type: Date,
    example: "2021-09-01",
    description: 'Start Date of Project',
  })
  startDate?: Date | null;
  @ApiPropertyOptional({
    type: Date,
    example: "2021-09-01",
    description: 'End Date of Project',
  })
  endDate?: Date | null;

  constructor(
    clientId: number,
    name: string,
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.clientId = clientId;
    this.name = name;
    this.description = description;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export class ProjectFilterQuery {
  @ApiPropertyOptional({
    type: String,
    description: 'Name of Project',
  })
  name?: string;
  @ApiPropertyOptional({
    type: Number,
    description: 'Client Id of Project',
  })
  clientId?: number | null;
  @ApiPropertyOptional({
    type: Date,
    description: 'Start Date of Project',
  })
  startDate?: Date;
  @ApiPropertyOptional({
    type: Date,
    description: 'End Date of Project',
  })
  endDate?: Date;

  constructor(name: string, clientId: number, startDate: Date, endDate: Date) {
    this.name = name;
    this.clientId = clientId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
