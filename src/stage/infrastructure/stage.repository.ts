import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { stages } from 'src/common/infrastructure/schema/schema';
import { StageRepository } from '../core/stage.interface';
import { Stage } from '../core/stage.entity';
import { StageToStageNew, StageToRow, RowToStage } from './stage.mapper';
import { count, eq } from 'drizzle-orm';

export type StageRow = typeof stages.$inferSelect;
export type StageNew = typeof stages.$inferInsert;

@Injectable()
export class DrizzleStageRepository implements StageRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleStageRepository.name, 'info');
  }

  async insert(ctx: Context, row: Stage) {
    this.logger.info(
      ctx,
      DrizzleStageRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: StageNew = StageToStageNew(row);
    const result = await this.db
      .getDb()
      .insert(stages)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToStage).at(0) ?? null;
  }

  async getAll(ctx: Context, limit: number, offset: number) {
    this.logger.info(
      ctx,
      DrizzleStageRepository.name,
      'getAll',
      'Getting all clients',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(stages)
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(stages)
      .limit(1)
      .execute();
    return { data: result.map(RowToStage), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleStageRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(stages)
      .where(eq(stages.id, id))
      .execute();
    return result.map(RowToStage).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Stage) {
    this.logger.info(
      ctx,
      DrizzleStageRepository.name,
      'update',
      'Updating client',
    );
    const newRow = StageToRow(row);
    const result = await this.db
      .getDb()
      .update(stages)
      .set(newRow)
      .where(eq(stages.id, id))
      .returning()
      .execute();
    return result.map(RowToStage).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleStageRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(stages)
      .where(eq(stages.id, id))
      .returning()
      .execute();
    return result.map(RowToStage).at(0) ?? null;
  }
}