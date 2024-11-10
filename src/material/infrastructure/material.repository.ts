import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { materials } from 'src/common/infrastructure/schema/schema';
import {
  MaterialFilters,
  MaterialRepository,
} from '../core/material.interface';
import { Material } from '../core/material.entity';
import {
  MaterialToMaterialNew,
  MaterialToRow,
  RowToMaterial,
} from './material.mapper';
import { and, count, eq, ilike, sql, SQLWrapper } from 'drizzle-orm';

export type MaterialRow = typeof materials.$inferSelect;
export type MaterialNew = typeof materials.$inferInsert;

@Injectable()
export class DrizzleMaterialRepository implements MaterialRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleMaterialRepository.name, 'info');
  }

  async insert(ctx: Context, row: Material) {
    this.logger.info(
      ctx,
      DrizzleMaterialRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: MaterialNew = MaterialToMaterialNew(row);
    const result = await this.db
      .getDb()
      .insert(materials)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToMaterial).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: MaterialFilters,
  ) {
    this.logger.info(
      ctx,
      DrizzleMaterialRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.name) {
      sqlFilters.push(ilike(materials.name, `%${filters.name}%`));
    }
    const result = await this.db
      .getDb()
      .select()
      .from(materials)
      .where(and(...sqlFilters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(materials)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToMaterial), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleMaterialRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(materials)
      .where(eq(materials.id, id))
      .execute();
    return result.map(RowToMaterial).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Material) {
    this.logger.info(
      ctx,
      DrizzleMaterialRepository.name,
      'update',
      'Updating client',
    );
    const newRow = MaterialToRow(row);
    const result = await this.db
      .getDb()
      .update(materials)
      .set(newRow)
      .where(eq(materials.id, id))
      .returning()
      .execute();
    return result.map(RowToMaterial).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleMaterialRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(materials)
      .where(eq(materials.id, id))
      .returning()
      .execute();
    return result.map(RowToMaterial).at(0) ?? null;
  }
}
