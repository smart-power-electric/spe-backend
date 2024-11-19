import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { services } from 'src/common/infrastructure/schema/schema';
import { ServiceFilter, ServiceRepository } from '../core/service.interface';
import { Service } from '../core/service.entity';
import {
  ServiceToServiceNew,
  ServiceToRow,
  RowToService,
} from './service.mapper';
import { and, asc, count, desc, eq, SQLWrapper } from 'drizzle-orm';

export type ServiceRow = typeof services.$inferSelect;
export type ServiceNew = typeof services.$inferInsert;

@Injectable()
export class DrizzleServiceRepository implements ServiceRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleServiceRepository.name, 'info');
  }

  async insert(ctx: Context, row: Service) {
    this.logger.info(
      ctx,
      DrizzleServiceRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: ServiceNew = ServiceToServiceNew(row);
    const result = await this.db
      .getDb()
      .insert(services)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToService).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: ServiceFilter,
  ) {
    this.logger.info(
      ctx,
      DrizzleServiceRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.name) {
      sqlFilters.push(eq(services.name, filters.name));
    }
    const sortField = services[filters.sortField] ?? services.name;
    const sqlSortField =
      filters.sortOrder === 'ASC' ? asc(sortField) : desc(sortField);
    const result = await this.db
      .getDb()
      .select()
      .from(services)
      .where(and(...sqlFilters))
      .orderBy(sqlSortField)
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(services)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToService), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleServiceRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(services)
      .where(eq(services.id, id))
      .execute();
    return result.map(RowToService).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Service) {
    this.logger.info(
      ctx,
      DrizzleServiceRepository.name,
      'update',
      'Updating client',
    );
    const newRow = ServiceToRow(row);
    const result = await this.db
      .getDb()
      .update(services)
      .set(newRow)
      .where(eq(services.id, id))
      .returning()
      .execute();
    return result.map(RowToService).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleServiceRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(services)
      .where(eq(services.id, id))
      .returning()
      .execute();
    return result.map(RowToService).at(0) ?? null;
  }
}
