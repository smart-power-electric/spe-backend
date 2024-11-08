import { Context } from 'src/common/core/context.entity';
import { CreateInvoicesDto, UpdateInvoicesDto } from './invoices.dto';
import { Invoices } from './invoices.entity';

export interface InvoicesRepository {
  insert(ctx: Context, row: Invoices): Promise<Invoices | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: Invoices[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Invoices | null>;
  update(ctx: Context, id: string, row: Invoices): Promise<Invoices | null>;
  delete(ctx: Context, id: string): Promise<Invoices | null>;
}
export const InvoicesRepository = Symbol('InvoicesRepository');

export interface InvoicesUseCases {
  create(ctx: Context, dto: CreateInvoicesDto): Promise<Invoices>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: Invoices[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Invoices>;
  update(ctx: Context, id: string, row: UpdateInvoicesDto): Promise<Invoices>;
  delete(ctx: Context, id: string): Promise<Invoices>;
}
export const InvoicesUseCases = Symbol('InvoicesUseCases');
