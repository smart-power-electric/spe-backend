import { CreateInvoicesDto } from '../core/invoices.dto';
import { Invoices } from '../core/invoices.entity';
import { InvoicesNew, InvoicesRow } from './invoices.repository';

export function CreateDtoToInvoices(dto: CreateInvoicesDto): Invoices {
  return new Invoices({
    ...dto,
    invoiceNumber: null,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToInvoices(row: InvoicesRow): Invoices {
  return new Invoices({
    ...row,
  });
}

export function InvoicesToRow(item: Invoices): InvoicesRow {
  return {
    id: item.id,
    date: item.date,
    stageId: item.stageId,
    invoiceNumber: item.invoiceNumber,
    totalAmount: item.totalAmount,
    showMaterials: item.showMaterials,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function InvoicesToInvoicesNew(item: Invoices): InvoicesNew {
  return {
    date: item.date,
    stageId: item.stageId,
    invoiceNumber: undefined,
    totalAmount: item.totalAmount,
    showMaterials: item.showMaterials,
  };
}
