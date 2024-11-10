import { ApiProperty } from '@nestjs/swagger';
import {
  CreateWorkerRatesDto,
  UpdateWorkerRatesDto,
} from '../core/workerRates.dto';
import { WorkerRatesRow } from './workerRates.repository';
import { WorkerRates } from '../core/workerRates.entity';

export class CreateWorkerRatesRequest implements CreateWorkerRatesDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerRates',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Rate of the workerRates',
    nullable: true,
  })
  rate: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Effective date of the workerRates',
    nullable: true,
  })
  effectiveDate: Date | null;

  constructor(data: CreateWorkerRatesDto) {
    this.workerId = data.workerId;
    this.rate = data.rate;
    this.effectiveDate = data.effectiveDate;
  }
}

export class UpdateWorkerRatesRequest implements UpdateWorkerRatesDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerRates',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Rate of the workerRates',
    nullable: true,
  })
  rate: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Effective date of the workerRates',
    nullable: true,
  })
  effectiveDate: Date | null;
  constructor(data: UpdateWorkerRatesDto) {
    this.workerId = data.workerId;
    this.rate = data.rate;
    this.effectiveDate = data.effectiveDate;
  }
}

export class WorkerRatesResponse implements WorkerRatesRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the workerRates',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerRates',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Rate of the workerRates',
    nullable: true,
  })
  rate: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Effective date of the workerRates',
    nullable: true,
  })
  effectiveDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the workerRates',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the workerRates',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: WorkerRates) {
    this.id = data.id;
    this.workerId = data.workerId;
    this.rate = data.rate;
    this.effectiveDate = data.effectiveDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class WorkerRatesPaginationResponse {
  @ApiProperty({
    type: [WorkerRatesResponse],
    description: 'Data of the workerRates',
    nullable: false,
  })
  data: WorkerRatesResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the workerRates',
    nullable: false,
  })
  total: number;

  constructor(data: { data: WorkerRates[]; total: number }) {
    this.data = data.data.map((d) => new WorkerRatesResponse(d));
    this.total = data.total;
  }
}
