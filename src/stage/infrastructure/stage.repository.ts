import { StageKeysType } from './../core/stage.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { stages } from 'src/common/infrastructure/schema/schema';
import { StageGetAllFilters, StageRepository } from '../core/stage.interface';
import { Stage } from '../core/stage.entity';
import { StageToStageNew, StageToRow, RowToStage } from './stage.mapper';
import { and, asc, count, desc, eq, ilike, SQLWrapper } from 'drizzle-orm';

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

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: StageGetAllFilters,
  ) {
    this.logger.info(
      ctx,
      DrizzleStageRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.projectId) {
      sqlFilters.push(eq(stages.projectId, filters.projectId));
    }
    if (filters.name) {
      sqlFilters.push(ilike(stages.name, `%${filters.name}%`));
    }
    const sortField = stages[filters.sortField as StageKeysType] ?? stages.name;
    const sortOrder =
      filters.sortOrder === 'ASC' ? asc(sortField) : desc(sortField);
    const result = await this.db
      .getDb()
      .select()
      .from(stages)
      .where(and(...sqlFilters))
      .orderBy(sortOrder)
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(stages)
      .where(and(...sqlFilters))
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
  async getByProjectId(ctx: Context, projectId: string): Promise<Stage[]> {
    this.logger.debug(
      ctx,
      DrizzleStageRepository.name,
      'getByProjectId',
      'Getting stages by project id',
    );

    const result = await this.db
      .getDb()
      .select()
      .from(stages)
      .where(eq(stages.projectId, projectId))
      .execute();
    return result.map(RowToStage);
  }
}
