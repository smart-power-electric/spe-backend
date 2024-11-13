import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ServiceSheetsRow } from './serviceSheets.repository';
import {
  CreateServiceSheetsDto,
  UpdateServiceSheetsDto,
} from '../core/serviceSheets.dto';
import { ServiceSheets } from '../core/serviceSheets.entity';

export class CreateServiceSheetsRequest implements CreateServiceSheetsDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the serviceSheets',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Speciality of the serviceSheets',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the serviceSheets',
    nullable: true,
  })
  weekStartDate: Date | null;
  @ApiProperty({
    type: 'number',
    description: 'Email of the serviceSheets',
    nullable: true,
  })
  totalHours: number | null;

  constructor(data: CreateServiceSheetsDto) {
    this.workerId = data.workerId;
    this.projectId = data.projectId;
    this.weekStartDate = data.weekStartDate;
    this.totalHours = data.totalHours;
  }
}

export class UpdateServiceSheetsRequest implements UpdateServiceSheetsDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Name of the serviceSheets',
    nullable: true,
  })
  workerId?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Speciality of the serviceSheets',
    nullable: true,
  })
  projectId?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Contact of the serviceSheets',
    nullable: true,
  })
  weekStartDate?: Date | null;
  @ApiPropertyOptional({
    type: 'number',
    description: 'Email of the serviceSheets',
    nullable: true,
  })
  totalHours?: number | null;

  constructor(data: UpdateServiceSheetsDto) {
    this.workerId = data.workerId;
    this.projectId = data.projectId;
    this.weekStartDate = data.weekStartDate;
    this.totalHours = data.totalHours;
  }
}

export class ServiceSheetsResponse implements ServiceSheetsRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the serviceSheets',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Name of the serviceSheets',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Speciality of the serviceSheets',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the serviceSheets',
    nullable: true,
  })
  weekStartDate: Date | null;
  @ApiProperty({
    type: 'number',
    description: 'Email of the serviceSheets',
    nullable: true,
  })
  totalHours: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the serviceSheets',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the serviceSheets',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: ServiceSheets) {
    this.id = data.id;
    this.workerId = data.workerId;
    this.projectId = data.projectId;
    this.weekStartDate = data.weekStartDate;
    this.totalHours = data.totalHours;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class ServiceSheetsPaginationResponse {
  @ApiProperty({
    type: [ServiceSheetsResponse],
    description: 'Data of the serviceSheets',
    nullable: false,
  })
  data: ServiceSheetsResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the serviceSheets',
    nullable: false,
  })
  total: number;

  constructor(data: { data: ServiceSheets[]; total: number }) {
    this.data = data.data.map((d) => new ServiceSheetsResponse(d));
    this.total = data.total;
  }
}
