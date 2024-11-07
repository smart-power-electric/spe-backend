import { ApiProperty } from '@nestjs/swagger';
import { CreateServiceDto, UpdateServiceDto } from '../core/service.dto';
import { Service } from '../core/service.entity';
import { ServiceRow } from './service.repository';

export class CreateServiceRequest implements CreateServiceDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the service',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Description of the service',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Project ID of the service',
    nullable: true,
  })
  unitCost: number | null;
  constructor(data: CreateServiceDto) {
    this.name = data.name;
    this.description = data.description;
    this.unitCost = data.unitCost;
  }
}

export class UpdateServiceRequest implements UpdateServiceDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the service',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Description of the service',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Project ID of the service',
    nullable: true,
  })
  unitCost: number | null;
  constructor(data: CreateServiceDto) {
    this.name = data.name;
    this.description = data.description;
    this.unitCost = data.unitCost;
  }
}

export class ServiceResponse implements ServiceRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the service',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Name of the service',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Description of the service',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Project ID of the service',
    nullable: true,
  })
  unitCost: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the service',
    nullable: true,
  })
  createdAt: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the service',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: Service) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.unitCost = data.unitCost;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class ServicePaginationResponse {
  @ApiProperty({
    type: [ServiceResponse],
    description: 'Data of the service',
    nullable: false,
  })
  data: ServiceResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the service',
    nullable: false,
  })
  total: number;

  constructor(data: { data: Service[]; total: number }) {
    this.data = data.data.map((d) => new ServiceResponse(d));
    this.total = data.total;
  }
}
