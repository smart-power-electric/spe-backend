import { ApiProperty } from '@nestjs/swagger';
import { InvoicesRow } from './invoices.repository';
import { CreateInvoicesDto, UpdateInvoicesDto } from '../core/invoices.dto';
import { Invoices } from '../core/invoices.entity';

export class CreateInvoicesRequest implements CreateInvoicesDto {
  @ApiProperty({
    type: 'string',
    description: 'Stage id of invoices',
    nullable: true,
  })
  stageId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Invoice number of invoices',
    nullable: true,
  })
  invoiceNumber: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Date of invoices',
    nullable: true,
  })
  date: Date | null;
  @ApiProperty({
    type: 'number',
    description: 'Total amount of invoices',
    nullable: true,
  })
  totalAmount: number | null;
  @ApiProperty({
    type: 'boolean',
    description: 'Show materials of invoices',
    nullable: true,
  })
  showMaterials: boolean | null;

  constructor(data: CreateInvoicesDto) {
    this.stageId = data.stageId;
    this.invoiceNumber = data.invoiceNumber;
    this.date = data.date;
    this.totalAmount = data.totalAmount;
    this.showMaterials = data.showMaterials;
  }
}

export class UpdateInvoicesRequest implements UpdateInvoicesDto {
  @ApiProperty({
    type: 'string',
    description: 'Stage id of invoices',
    nullable: true,
  })
  stageId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Invoice number of invoices',
    nullable: true,
  })
  invoiceNumber: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Date of invoices',
    nullable: true,
  })
  date: Date | null;
  @ApiProperty({
    type: 'number',
    description: 'Total amount of invoices',
    nullable: true,
  })
  totalAmount: number | null;
  @ApiProperty({
    type: 'boolean',
    description: 'Show materials of invoices',
    nullable: true,
  })
  showMaterials: boolean | null;

  constructor(data: UpdateInvoicesDto) {
    this.stageId = data.stageId;
    this.invoiceNumber = data.invoiceNumber;
    this.date = data.date;
    this.totalAmount = data.totalAmount;
    this.showMaterials = data.showMaterials;
  }
}

export class InvoicesResponse implements InvoicesRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the invoices',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Stage id of invoices',
    nullable: true,
  })
  stageId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Invoice number of invoices',
    nullable: true,
  })
  invoiceNumber: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Date of invoices',
    nullable: true,
  })
  date: Date | null;
  @ApiProperty({
    type: 'number',
    description: 'Total amount of invoices',
    nullable: true,
  })
  totalAmount: number | null;
  @ApiProperty({
    type: 'boolean',
    description: 'Show materials of invoices',
    nullable: true,
  })
  showMaterials: boolean | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the invoices',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the invoices',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: Invoices) {
    this.id = data.id;
    this.stageId = data.stageId;
    this.invoiceNumber = data.invoiceNumber;
    this.date = data.date;
    this.totalAmount = data.totalAmount;
    this.showMaterials = data.showMaterials;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class InvoicesPaginationResponse {
  @ApiProperty({
    type: [InvoicesResponse],
    description: 'Data of the invoices',
    nullable: false,
  })
  data: InvoicesResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the invoices',
    nullable: false,
  })
  total: number;

  constructor(data: { data: Invoices[]; total: number }) {
    this.data = data.data.map((d) => new InvoicesResponse(d));
    this.total = data.total;
  }
}
