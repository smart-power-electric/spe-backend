import { ApiProperty } from '@nestjs/swagger';
import { WorkerPaymentsRow } from './workerPayments.repository';
import {
  CreateWorkerPaymentsDto,
  UpdateWorkerPaymentsDto,
} from '../core/workerPayments.dto';
import { WorkerPayments } from '../core/workerPayments.entity';

export class CreateWorkerPaymentsRequest implements CreateWorkerPaymentsDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerPayments',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Speciality of the workerPayments',
    nullable: true,
  })
  serviceSheetId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the workerPayments',
    nullable: true,
  })
  totalPayment: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Email of the workerPayments',
    nullable: true,
  })
  paymentDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Is extra of the workerPayments',
    nullable: true,
  })
  isExtra: boolean | null;

  constructor(data: CreateWorkerPaymentsDto) {
    this.workerId = data.workerId;
    this.serviceSheetId = data.serviceSheetId;
    this.totalPayment = data.totalPayment;
    this.paymentDate = data.paymentDate;
    this.isExtra = data.isExtra;
  }
}

export class UpdateWorkerPaymentsRequest implements UpdateWorkerPaymentsDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerPayments',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Speciality of the workerPayments',
    nullable: true,
  })
  serviceSheetId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the workerPayments',
    nullable: true,
  })
  totalPayment: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Email of the workerPayments',
    nullable: true,
  })
  paymentDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Is extra of the workerPayments',
    nullable: true,
  })
  isExtra: boolean | null;

  constructor(data: UpdateWorkerPaymentsDto) {
    this.workerId = data.workerId;
    this.serviceSheetId = data.serviceSheetId;
    this.totalPayment = data.totalPayment;
    this.paymentDate = data.paymentDate;
    this.isExtra = data.isExtra;
  }
}

export class WorkerPaymentsResponse implements WorkerPaymentsRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the workerPayments',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerPayments',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Speciality of the workerPayments',
    nullable: true,
  })
  serviceSheetId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the workerPayments',
    nullable: true,
  })
  totalPayment: number | null;
  @ApiProperty({
    type: 'string',
    description: 'Email of the workerPayments',
    nullable: true,
  })
  paymentDate: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Is extra of the workerPayments',
    nullable: true,
  })
  isExtra: boolean | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the workerPayments',
    nullable: true,
  })
  createdAt: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the workerPayments',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: WorkerPayments) {
    this.id = data.id;
    this.workerId = data.workerId;
    this.serviceSheetId = data.serviceSheetId;
    this.totalPayment = data.totalPayment;
    this.paymentDate = data.paymentDate;
    this.isExtra = data.isExtra;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class WorkerPaymentsPaginationResponse {
  @ApiProperty({
    type: [WorkerPaymentsResponse],
    description: 'Data of the workerPayments',
    nullable: false,
  })
  data: WorkerPaymentsResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the workerPayments',
    nullable: false,
  })
  total: number;

  constructor(data: { data: WorkerPayments[]; total: number }) {
    this.data = data.data.map((d) => new WorkerPaymentsResponse(d));
    this.total = data.total;
  }
}