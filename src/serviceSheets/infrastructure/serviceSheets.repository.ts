import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { serviceSheets } from 'src/common/infrastructure/schema/schema';

import { and, count, eq, SQLWrapper } from 'drizzle-orm';
import {
  ServiceSheetsFilter,
  ServiceSheetsRepository,
} from '../core/serviceSheets.interface';
import {
  RowToServiceSheets,
  ServiceSheetsToRow,
  ServiceSheetsToServiceSheetsNew,
} from './serviceSheets.mapper';
import { ServiceSheets } from '../core/serviceSheets.entity';

export type ServiceSheetsRow = typeof serviceSheets.$inferSelect;
export type ServiceSheetsNew = typeof serviceSheets.$inferInsert;

@Injectable()
export class DrizzleServiceSheetsRepository implements ServiceSheetsRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleServiceSheetsRepository.name, 'info');
  }

  async insert(ctx: Context, row: ServiceSheets) {
    this.logger.info(
      ctx,
      DrizzleServiceSheetsRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: ServiceSheetsNew = ServiceSheetsToServiceSheetsNew(row);
    const result = await this.db
      .getDb()
      .insert(serviceSheets)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToServiceSheets).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: ServiceSheetsFilter,
  ) {
    this.logger.info(
      ctx,
      DrizzleServiceSheetsRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.workerId) {
      sqlFilters.push(eq(serviceSheets.workerId, filters.workerId));
    }
    if (filters.projectId) {
      sqlFilters.push(eq(serviceSheets.projectId, filters.projectId));
    }
    const result = await this.db
      .getDb()
      .select()
      .from(serviceSheets)
      .where(and(...sqlFilters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(serviceSheets)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToServiceSheets), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleServiceSheetsRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(serviceSheets)
      .where(eq(serviceSheets.id, id))
      .execute();
    return result.map(RowToServiceSheets).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: ServiceSheets) {
    this.logger.info(
      ctx,
      DrizzleServiceSheetsRepository.name,
      'update',
      'Updating client',
    );
    const newRow = ServiceSheetsToRow(row);
    const result = await this.db
      .getDb()
      .update(serviceSheets)
      .set(newRow)
      .where(eq(serviceSheets.id, id))
      .returning()
      .execute();
    return result.map(RowToServiceSheets).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleServiceSheetsRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(serviceSheets)
      .where(eq(serviceSheets.id, id))
      .returning()
      .execute();
    return result.map(RowToServiceSheets).at(0) ?? null;
  }
}
