import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServiceDto {
  @ApiProperty({ type: Number, example: 1, description: 'Id of service' })
  id: number;
  @ApiProperty({
    type: String,
    example: 'Service Name',
    description: 'Name of service',
  })
  name: string;
  @ApiPropertyOptional({
    type: String,
    example: 'Service Description',
    description: 'Description of service',
  })
  description?: string | null;
  @ApiPropertyOptional({
    type: Number,
    example: 100,
    description: 'Price of service',
  })
  unitCost?: number | null;

  constructor(id: number, name: string, description: string, unitCost: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.unitCost = unitCost;
  }
  
}

export class CreateServiceRequest {
  @ApiProperty({
    type: String,
    example: 'Service Name',
    description: 'Name of service',
  })
  name: string;
  @ApiPropertyOptional({
    type: String,
    example: 'Service Description',
    description: 'Description of service',
  })
  description?: string | null;
  @ApiPropertyOptional({
    type: Number,
    example: 100,
    description: 'Price of service',
  })
  unitCost?: string | null;

  constructor(name: string, description: string, unitCost: number) {
    this.name = name;
    this.description = description;
    this.unitCost = unitCost.toString();
  }
}

export class ServiceFilterQuery {
  @ApiPropertyOptional({
    type: String,
    description: 'Name of client',
    nullable: true,
  })
  name?: string | null;
  

  constructor(
    name: string,
  ) {
    this.name = name;
  }
}
