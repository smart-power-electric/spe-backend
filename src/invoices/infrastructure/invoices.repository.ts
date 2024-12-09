import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { invoices } from 'src/common/infrastructure/schema/schema';

import { and, asc, count, desc, eq, SQLWrapper } from 'drizzle-orm';
import { InvoiceFilters, InvoicesRepository } from '../core/invoices.interface';
import {
  RowToInvoices,
  InvoicesToRow,
  InvoicesToInvoicesNew,
} from './invoices.mapper';
import { Invoices, InvoicesKeysType } from '../core/invoices.entity';

export type InvoicesRow = typeof invoices.$inferSelect;
export type InvoicesNew = typeof invoices.$inferInsert;

@Injectable()
export class DrizzleInvoicesRepository implements InvoicesRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleInvoicesRepository.name, 'info');
  }

  async insert(ctx: Context, row: Invoices) {
    this.logger.info(
      ctx,
      DrizzleInvoicesRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: InvoicesNew = InvoicesToInvoicesNew(row);
    const result = await this.db
      .getDb()
      .insert(invoices)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToInvoices).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: InvoiceFilters,
  ) {
    this.logger.info(
      ctx,
      DrizzleInvoicesRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.stageId) {
      sqlFilters.push(eq(invoices.stageId, filters.stageId));
    }
    const sortField =
      invoices[filters.sortField as InvoicesKeysType] ?? invoices.invoiceNumber;
    const sortOrder =
      filters.sortOrder === 'ASC' ? asc(sortField) : desc(sortField);
    const result = await this.db
      .getDb()
      .select()
      .from(invoices)
      .where(and(...sqlFilters))
      .orderBy(sortOrder)
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(invoices)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToInvoices), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleInvoicesRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(invoices)
      .where(eq(invoices.id, id))
      .execute();
    return result.map(RowToInvoices).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Invoices) {
    this.logger.info(
      ctx,
      DrizzleInvoicesRepository.name,
      'update',
      'Updating client',
    );
    const newRow = InvoicesToRow(row);
    const result = await this.db
      .getDb()
      .update(invoices)
      .set(newRow)
      .where(eq(invoices.id, id))
      .returning()
      .execute();
    return result.map(RowToInvoices).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleInvoicesRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(invoices)
      .where(eq(invoices.id, id))
      .returning()
      .execute();
    return result.map(RowToInvoices).at(0) ?? null;
  }
}
