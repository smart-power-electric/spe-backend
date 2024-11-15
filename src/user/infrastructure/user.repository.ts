import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { user } from 'src/common/infrastructure/schema/schema';

import { and, count, eq, ilike, or, SQLWrapper } from 'drizzle-orm';
import { UserFilters, UserRepository } from '../core/user.interface';
import { User } from '../core/user.entity';
import { RowToUser, UserToRow, UserToUserNew } from './user.mapper';

export type UserRow = typeof user.$inferSelect;
export type UserNew = typeof user.$inferInsert;

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleUserRepository.name, 'info');
  }

  async insert(ctx: Context, row: User) {
    this.logger.info(
      ctx,
      DrizzleUserRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: UserNew = UserToUserNew(row);
    const result = await this.db
      .getDb()
      .insert(user)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToUser).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: UserFilters,
  ) {
    this.logger.info(
      ctx,
      DrizzleUserRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlFilters: SQLWrapper[] = [];
    if (filters.search) {
      const orFilter = or(
        ilike(user.fullname, `%${filters.search}%`),
        ilike(user.username, `%${filters.search}%`),
        ilike(user.status, `%${filters.search}%`),
      );
      if (orFilter) {
        sqlFilters.push(orFilter);
      }
    }
    const result = await this.db
      .getDb()
      .select()
      .from(user)
      .where(and(...sqlFilters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(user)
      .where(and(...sqlFilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToUser), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleUserRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(user)
      .where(eq(user.id, id))
      .execute();
    return result.map(RowToUser).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: User) {
    this.logger.info(
      ctx,
      DrizzleUserRepository.name,
      'update',
      'Updating client',
    );
    const newRow = UserToRow(row);
    const result = await this.db
      .getDb()
      .update(user)
      .set(newRow)
      .where(eq(user.id, id))
      .returning()
      .execute();
    return result.map(RowToUser).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleUserRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(user)
      .where(eq(user.id, id))
      .returning()
      .execute();
    return result.map(RowToUser).at(0) ?? null;
  }
}
