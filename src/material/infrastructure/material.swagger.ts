import { ApiProperty } from '@nestjs/swagger';
import { CreateMaterialDto, UpdateMaterialDto } from '../core/material.dto';
import { Material } from '../core/material.entity';
import { MaterialRow } from './material.repository';

export class CreateMaterialRequest implements CreateMaterialDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the material',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Unit cost of the material',
    nullable: true,
  })
  unitCost: number | null;

  constructor(data: CreateMaterialDto) {
    this.name = data.name;
    this.unitCost = data.unitCost;
  }
}

export class UpdateMaterialRequest implements UpdateMaterialDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the material',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Unit cost of the material',
    nullable: true,
  })
  unitCost: number | null;
  constructor(data: UpdateMaterialDto) {
    this.name = data.name;
    this.unitCost = data.unitCost;
  }
}

export class MaterialResponse implements MaterialRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the material',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Name of the material',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Unit cost of the material',
    nullable: true,
  })
  unitCost: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the material',
    nullable: true,
  })
  createdAt: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the material',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: Material) {
    this.id = data.id;
    this.name = data.name;
    this.unitCost = data.unitCost;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class MaterialPaginationResponse {
  @ApiProperty({
    type: [MaterialResponse],
    description: 'Data of the material',
    nullable: false,
  })
  data: MaterialResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the material',
    nullable: false,
  })
  total: number;

  constructor(data: { data: Material[]; total: number }) {
    this.data = data.data.map((d) => new MaterialResponse(d));
    this.total = data.total;
  }
}
