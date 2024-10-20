import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty({ type: [Object], description: 'Data' })
  data: T[];
  @ApiProperty({
    type: 'integer',
    description: 'Offset',
    default: 0,
    nullable: true,
  })
  offset: number | number;
  @ApiProperty({
    type: 'integer',
    description: 'Limit',
    default: 10,
    nullable: true,
  })
  limit: number | null;
  @ApiProperty({
    type: 'integer',
    description: 'Total',
    default: 0,
  })
  total: number;
  constructor(data: T[], offset: number, limit: number, total: number) {
    this.data = data;
    this.offset = offset;
    this.limit = limit;
    this.total = total;
  }
}
