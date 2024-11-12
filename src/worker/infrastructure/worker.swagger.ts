import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WorkerRow } from './worker.repository';
import { CreateWorkerDto, UpdateWorkerDto } from '../core/worker.dto';
import { Worker } from '../core/worker.entity';

export class CreateWorkerRequest implements CreateWorkerDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the worker',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Speciality of the worker',
    nullable: true,
  })
  speciality: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the worker',
    nullable: true,
  })
  contact: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Email of the worker',
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Phone of the worker',
    nullable: true,
  })
  phone: string | null;
  @ApiProperty({
    type: 'string',
    description: 'City of the worker',
    nullable: true,
  })
  socialSecurity: string | null;
  @ApiProperty({
    type: 'string',
    description: 'State of the worker',
    nullable: true,
  })
  startDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Zip of the worker',
    nullable: true,
  })
  endDate: Date | null;

  constructor(data: CreateWorkerDto) {
    this.name = data.name;
    this.speciality = data.speciality;
    this.contact = data.contact;
    this.address = data.address;
    this.phone = data.phone;
    this.socialSecurity = data.socialSecurity;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}

export class UpdateWorkerRequest implements UpdateWorkerDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Name of the worker',
    nullable: true,
  })
  name?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Speciality of the worker',
    nullable: true,
  })
  speciality?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Contact of the worker',
    nullable: true,
  })
  contact?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Email of the worker',
    nullable: true,
  })
  address?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Phone of the worker',
    nullable: true,
  })
  phone?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'City of the worker',
    nullable: true,
  })
  socialSecurity?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'State of the worker',
    nullable: true,
  })
  startDate?: Date | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Zip of the worker',
    nullable: true,
  })
  endDate?: Date | null;

  constructor(data: UpdateWorkerDto) {
    this.name = data.name;
    this.speciality = data.speciality;
    this.contact = data.contact;
    this.address = data.address;
    this.phone = data.phone;
    this.socialSecurity = data.socialSecurity;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}

export class WorkerResponse implements WorkerRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the worker',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Name of the worker',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Speciality of the worker',
    nullable: true,
  })
  speciality: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the worker',
    nullable: true,
  })
  contact: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Email of the worker',
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Phone of the worker',
    nullable: true,
  })
  phone: string | null;
  @ApiProperty({
    type: 'string',
    description: 'City of the worker',
    nullable: true,
  })
  socialSecurity: string | null;
  @ApiProperty({
    type: 'string',
    description: 'State of the worker',
    nullable: true,
  })
  startDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Zip of the worker',
    nullable: true,
  })
  endDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the worker',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the worker',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: Worker) {
    this.id = data.id;
    this.name = data.name;
    this.speciality = data.speciality;
    this.contact = data.contact;
    this.address = data.address;
    this.phone = data.phone;
    this.socialSecurity = data.socialSecurity;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class WorkerPaginationResponse {
  @ApiProperty({
    type: [WorkerResponse],
    description: 'Data of the worker',
    nullable: false,
  })
  data: WorkerResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the worker',
    nullable: false,
  })
  total: number;

  constructor(data: { data: Worker[]; total: number }) {
    this.data = data.data.map((d) => new WorkerResponse(d));
    this.total = data.total;
  }
}
