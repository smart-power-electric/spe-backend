import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { workerPayments } from 'src/common/infrastructure/schema/schema';

import { count, eq } from 'drizzle-orm';
import { WorkerPaymentsRepository } from '../core/workerPayments.interface';
import {
  RowToWorkerPayments,
  WorkerPaymentsToRow,
  WorkerPaymentsToWorkerPaymentsNew,
} from './workerPayments.mapper';
import { WorkerPayments } from '../core/workerPayments.entity';

export type WorkerPaymentsRow = typeof workerPayments.$inferSelect;
export type WorkerPaymentsNew = typeof workerPayments.$inferInsert;

@Injectable()
export class DrizzleWorkerPaymentsRepository
  implements WorkerPaymentsRepository
{
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleWorkerPaymentsRepository.name, 'info');
  }

  async insert(ctx: Context, row: WorkerPayments) {
    this.logger.info(
      ctx,
      DrizzleWorkerPaymentsRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: WorkerPaymentsNew = WorkerPaymentsToWorkerPaymentsNew(row);
    const result = await this.db
      .getDb()
      .insert(workerPayments)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToWorkerPayments).at(0) ?? null;
  }

  async getAll(ctx: Context, limit: number, offset: number) {
    this.logger.info(
      ctx,
      DrizzleWorkerPaymentsRepository.name,
      'getAll',
      'Getting all clients',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(workerPayments)
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(workerPayments)
      .limit(1)
      .execute();
    return { data: result.map(RowToWorkerPayments), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleWorkerPaymentsRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(workerPayments)
      .where(eq(workerPayments.id, id))
      .execute();
    return result.map(RowToWorkerPayments).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: WorkerPayments) {
    this.logger.info(
      ctx,
      DrizzleWorkerPaymentsRepository.name,
      'update',
      'Updating client',
    );
    const newRow = WorkerPaymentsToRow(row);
    const result = await this.db
      .getDb()
      .update(workerPayments)
      .set(newRow)
      .where(eq(workerPayments.id, id))
      .returning()
      .execute();
    return result.map(RowToWorkerPayments).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleWorkerPaymentsRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(workerPayments)
      .where(eq(workerPayments.id, id))
      .returning()
      .execute();
    return result.map(RowToWorkerPayments).at(0) ?? null;
  }
}
