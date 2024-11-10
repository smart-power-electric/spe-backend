import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { and, count, eq, SQLWrapper } from 'drizzle-orm';
import { workerAssignment } from 'src/common/infrastructure/schema/schema';
import {
  WorkerAssignmentFilter,
  WorkerAssignmentRepository,
} from '../core/workerAssignment.interface';
import { WorkerAssignment } from '../core/workerAssignment.entity';
import {
  RowToWorkerAssignment,
  WorkerAssignmentToRow,
  WorkerAssignmentToWorkerAssignmentNew,
} from './workerAssignment.mapper';

export type WorkerAssignmentRow = typeof workerAssignment.$inferSelect;
export type WorkerAssignmentNew = typeof workerAssignment.$inferInsert;

@Injectable()
export class DrizzleWorkerAssignmentRepository
  implements WorkerAssignmentRepository
{
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleWorkerAssignmentRepository.name, 'info');
  }

  async insert(ctx: Context, row: WorkerAssignment) {
    this.logger.info(
      ctx,
      DrizzleWorkerAssignmentRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: WorkerAssignmentNew =
      WorkerAssignmentToWorkerAssignmentNew(row);
    const result = await this.db
      .getDb()
      .insert(workerAssignment)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToWorkerAssignment).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: WorkerAssignmentFilter,
  ) {
    this.logger.info(
      ctx,
      DrizzleWorkerAssignmentRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.workerId) {
      sqlFilters.push(eq(workerAssignment.workerId, filters.workerId));
    }
    if (filters.projectId) {
      sqlFilters.push(eq(workerAssignment.projectId, filters.projectId));
    }
    if (filters.stageId) {
      sqlFilters.push(eq(workerAssignment.stageId, filters.stageId));
    }
    const result = await this.db
      .getDb()
      .select()
      .from(workerAssignment)
      .where(and(...sqlFilters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(workerAssignment)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToWorkerAssignment), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleWorkerAssignmentRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(workerAssignment)
      .where(eq(workerAssignment.id, id))
      .execute();
    return result.map(RowToWorkerAssignment).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: WorkerAssignment) {
    this.logger.info(
      ctx,
      DrizzleWorkerAssignmentRepository.name,
      'update',
      'Updating client',
    );
    const newRow = WorkerAssignmentToRow(row);
    const result = await this.db
      .getDb()
      .update(workerAssignment)
      .set(newRow)
      .where(eq(workerAssignment.id, id))
      .returning()
      .execute();
    return result.map(RowToWorkerAssignment).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleWorkerAssignmentRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(workerAssignment)
      .where(eq(workerAssignment.id, id))
      .returning()
      .execute();
    return result.map(RowToWorkerAssignment).at(0) ?? null;
  }
}
