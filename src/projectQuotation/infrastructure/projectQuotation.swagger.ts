import { ApiProperty } from '@nestjs/swagger';
import {
  CreateProjectQuotationDto,
  UpdateProjectQuotationDto,
} from '../core/projectQuotation.dto';
import { ProjectQuotation } from '../core/projectQuotation.entity';
import { ProjectQuotationRow } from './projectQuotation.repository';

export class CreateProjectQuotationRequest
  implements CreateProjectQuotationDto
{
  @ApiProperty({
    type: 'string',
    description: 'Name of the projectQuotation',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Material ID of the projectQuotation',
    nullable: true,
  })
  materialId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Service ID of the projectQuotation',
    nullable: true,
  })
  serviceId: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Quantity of the projectQuotation',
    nullable: true,
  })
  quantity: number | null;
  @ApiProperty({
    type: 'number',
    description: 'Total cost of the projectQuotation',
    nullable: true,
  })
  totalCost: number | null;

  constructor(data: CreateProjectQuotationDto) {
    this.projectId = data.projectId;
    this.materialId = data.materialId;
    this.serviceId = data.serviceId;
    this.quantity = data.quantity;
    this.totalCost = data.totalCost;
  }
}

export class UpdateProjectQuotationRequest
  implements UpdateProjectQuotationDto
{
  @ApiProperty({
    type: 'string',
    description: 'Name of the projectQuotation',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Material ID of the projectQuotation',
    nullable: true,
  })
  materialId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Service ID of the projectQuotation',
    nullable: true,
  })
  serviceId: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Quantity of the projectQuotation',
    nullable: true,
  })
  quantity: number | null;
  @ApiProperty({
    type: 'number',
    description: 'Total cost of the projectQuotation',
    nullable: true,
  })
  totalCost: number | null;

  constructor(data: UpdateProjectQuotationDto) {
    this.projectId = data.projectId;
    this.materialId = data.materialId;
    this.serviceId = data.serviceId;
    this.quantity = data.quantity;
    this.totalCost = data.totalCost;
  }
}

export class ProjectQuotationResponse implements ProjectQuotationRow {
  @ApiProperty({
    type: 'string',
    description: 'Name of the projectQuotation',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Material ID of the projectQuotation',
    nullable: true,
  })
  materialId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Service ID of the projectQuotation',
    nullable: true,
  })
  serviceId: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Quantity of the projectQuotation',
    nullable: true,
  })
  quantity: number | null;
  @ApiProperty({
    type: 'number',
    description: 'Total cost of the projectQuotation',
    nullable: true,
  })
  totalCost: number | null;
  @ApiProperty({
    type: 'string',
    description: 'ID of the projectQuotation',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: Date,
    description: 'Created at of the projectQuotation',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: Date,
    description: 'Updated at of the projectQuotation',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: ProjectQuotation) {
    this.id = data.id;
    this.projectId = data.projectId;
    this.materialId = data.materialId;
    this.serviceId = data.serviceId;
    this.quantity = data.quantity;
    this.totalCost = data.totalCost;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class ProjectQuotationPaginationResponse {
  @ApiProperty({
    type: [ProjectQuotationResponse],
    description: 'Data of the projectQuotation',
    nullable: false,
  })
  data: ProjectQuotationResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the projectQuotation',
    nullable: false,
  })
  total: number;

  constructor(data: { data: ProjectQuotation[]; total: number }) {
    this.data = data.data.map((d) => new ProjectQuotationResponse(d));
    this.total = data.total;
  }
}
