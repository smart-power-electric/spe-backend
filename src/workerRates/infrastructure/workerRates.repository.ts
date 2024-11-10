import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { workerRates } from 'src/common/infrastructure/schema/schema';

import { and, count, eq, SQLWrapper } from 'drizzle-orm';
import {
  WorkerRatesFilters,
  WorkerRatesRepository,
} from '../core/workerRates.interface';
import { WorkerRates } from '../core/workerRates.entity';
import {
  RowToWorkerRates,
  WorkerRatesToRow,
  WorkerRatesToWorkerRatesNew,
} from './workerRates.mapper';

export type WorkerRatesRow = typeof workerRates.$inferSelect;
export type WorkerRatesNew = typeof workerRates.$inferInsert;

@Injectable()
export class DrizzleWorkerRatesRepository implements WorkerRatesRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleWorkerRatesRepository.name, 'info');
  }

  async insert(ctx: Context, row: WorkerRates) {
    this.logger.info(
      ctx,
      DrizzleWorkerRatesRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: WorkerRatesNew = WorkerRatesToWorkerRatesNew(row);
    const result = await this.db
      .getDb()
      .insert(workerRates)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToWorkerRates).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: WorkerRatesFilters,
  ) {
    this.logger.info(
      ctx,
      DrizzleWorkerRatesRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.workerId) {
      sqlFilters.push(eq(workerRates.workerId, filters.workerId));
    }
    const result = await this.db
      .getDb()
      .select()
      .from(workerRates)
      .where(and(...sqlFilters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(workerRates)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToWorkerRates), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleWorkerRatesRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(workerRates)
      .where(eq(workerRates.id, id))
      .execute();
    return result.map(RowToWorkerRates).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: WorkerRates) {
    this.logger.info(
      ctx,
      DrizzleWorkerRatesRepository.name,
      'update',
      'Updating client',
    );
    const newRow = WorkerRatesToRow(row);
    const result = await this.db
      .getDb()
      .update(workerRates)
      .set(newRow)
      .where(eq(workerRates.id, id))
      .returning()
      .execute();
    return result.map(RowToWorkerRates).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleWorkerRatesRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(workerRates)
      .where(eq(workerRates.id, id))
      .returning()
      .execute();
    return result.map(RowToWorkerRates).at(0) ?? null;
  }
}
