import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { projectQuotation } from 'src/common/infrastructure/schema/schema';
import {
  ProjectQuotationFilters,
  ProjectQuotationRepository,
} from '../core/projectQuotation.interface';
import { ProjectQuotation } from '../core/projectQuotation.entity';
import {
  ProjectQuotationToProjectQuotationNew,
  ProjectQuotationToRow,
  RowToProjectQuotation,
} from './projectQuotation.mapper';
import { and, count, eq, SQLWrapper } from 'drizzle-orm';

export type ProjectQuotationRow = typeof projectQuotation.$inferSelect;
export type ProjectQuotationNew = typeof projectQuotation.$inferInsert;

@Injectable()
export class DrizzleProjectQuotationRepository
  implements ProjectQuotationRepository
{
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleProjectQuotationRepository.name, 'info');
  }

  async insert(ctx: Context, row: ProjectQuotation) {
    this.logger.info(
      ctx,
      DrizzleProjectQuotationRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: ProjectQuotationNew =
      ProjectQuotationToProjectQuotationNew(row);
    const result = await this.db
      .getDb()
      .insert(projectQuotation)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToProjectQuotation).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: ProjectQuotationFilters,
  ) {
    this.logger.info(
      ctx,
      DrizzleProjectQuotationRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.projectId) {
      sqlFilters.push(eq(projectQuotation.projectId, filters.projectId));
    }
    if (filters.materialId) {
      sqlFilters.push(eq(projectQuotation.materialId, filters.materialId));
    }
    const result = await this.db
      .getDb()
      .select()
      .from(projectQuotation)
      .where(and(...sqlFilters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(projectQuotation)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToProjectQuotation), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleProjectQuotationRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(projectQuotation)
      .where(eq(projectQuotation.id, id))
      .execute();
    return result.map(RowToProjectQuotation).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: ProjectQuotation) {
    this.logger.info(
      ctx,
      DrizzleProjectQuotationRepository.name,
      'update',
      'Updating client',
    );
    const newRow = ProjectQuotationToRow(row);
    const result = await this.db
      .getDb()
      .update(projectQuotation)
      .set(newRow)
      .where(eq(projectQuotation.id, id))
      .returning()
      .execute();
    return result.map(RowToProjectQuotation).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleProjectQuotationRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(projectQuotation)
      .where(eq(projectQuotation.id, id))
      .returning()
      .execute();
    return result.map(RowToProjectQuotation).at(0) ?? null;
  }
}
