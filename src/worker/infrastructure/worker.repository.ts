import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { workers } from 'src/common/infrastructure/schema/schema';

import { and, count, eq, ilike, SQLWrapper } from 'drizzle-orm';
import { WorkerFilter, WorkerRepository } from '../core/worker.interface';
import { RowToWorker, WorkerToRow, WorkerToWorkerNew } from './worker.mapper';
import { Worker } from '../core/worker.entity';

export type WorkerRow = typeof workers.$inferSelect;
export type WorkerNew = typeof workers.$inferInsert;

@Injectable()
export class DrizzleWorkerRepository implements WorkerRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleWorkerRepository.name, 'info');
  }

  async insert(ctx: Context, row: Worker) {
    this.logger.info(
      ctx,
      DrizzleWorkerRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: WorkerNew = WorkerToWorkerNew(row);
    const result = await this.db
      .getDb()
      .insert(workers)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToWorker).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: WorkerFilter,
  ) {
    this.logger.info(
      ctx,
      DrizzleWorkerRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filter.name) {
      sqlFilters.push(ilike(workers.name, `%${filter.name}%`));
    }
    const result = await this.db
      .getDb()
      .select()
      .from(workers)
      .where(and(...sqlFilters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(workers)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToWorker), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleWorkerRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(workers)
      .where(eq(workers.id, id))
      .execute();
    return result.map(RowToWorker).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Worker) {
    this.logger.info(
      ctx,
      DrizzleWorkerRepository.name,
      'update',
      'Updating client',
    );
    const newRow = WorkerToRow(row);
    const result = await this.db
      .getDb()
      .update(workers)
      .set(newRow)
      .where(eq(workers.id, id))
      .returning()
      .execute();
    return result.map(RowToWorker).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleWorkerRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(workers)
      .where(eq(workers.id, id))
      .returning()
      .execute();
    return result.map(RowToWorker).at(0) ?? null;
  }
}
