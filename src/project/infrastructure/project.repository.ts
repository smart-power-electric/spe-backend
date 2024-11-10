import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';
import { projects } from 'src/common/infrastructure/schema/schema';
import { Project } from '../core/project.entity';
import { and, count, eq, SQLWrapper } from 'drizzle-orm';
import {
  ProjectGetAllFilters,
  ProjectRepository,
} from '../core/project.interface';
import {
  ProjectToProjectNew,
  ProjectToRow,
  RowToProject,
} from './project.mapper';

export type ProjectRow = typeof projects.$inferSelect;
export type ProjectNew = typeof projects.$inferInsert;

@Injectable()
export class DrizzleProjectRepository implements ProjectRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleProjectRepository.name, 'info');
  }

  async insert(ctx: Context, row: Project) {
    this.logger.info(
      ctx,
      DrizzleProjectRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: ProjectNew = ProjectToProjectNew(row);
    const result = await this.db
      .getDb()
      .insert(projects)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToProject).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: ProjectGetAllFilters,
  ) {
    this.logger.info(
      ctx,
      DrizzleProjectRepository.name,
      'getAll',
      'Getting all clients',
    );
    const filters: SQLWrapper[] = [];
    if (filter.clientId) {
      filters.push(eq(projects.clientId, filter.clientId));
    }
    const result = await this.db
      .getDb()
      .select()
      .from(projects)
      .where(and(...filters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(projects)
      .where(and(...filters))
      .limit(1)
      .execute();
    return { data: result.map(RowToProject), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleProjectRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .execute();
    return result.map(RowToProject).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Project) {
    this.logger.info(
      ctx,
      DrizzleProjectRepository.name,
      'update',
      'Updating client',
    );
    const newRow = ProjectToRow(row);
    const result = await this.db
      .getDb()
      .update(projects)
      .set(newRow)
      .where(eq(projects.id, id))
      .returning()
      .execute();
    return result.map(RowToProject).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleProjectRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(projects)
      .where(eq(projects.id, id))
      .returning()
      .execute();
    return result.map(RowToProject).at(0) ?? null;
  }
}
