import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { notifications } from 'src/common/infrastructure/schema/schema';

import { and, count, eq, SQLWrapper } from 'drizzle-orm';
import {
  NotificationsFilter,
  NotificationsRepository,
} from '../core/notifications.interface';
import {
  RowToNotifications,
  NotificationsToRow,
  NotificationsToNotificationsNew,
} from './notifications.mapper';
import { Notifications } from '../core/notifications.entity';

export type NotificationsRow = typeof notifications.$inferSelect;
export type NotificationsNew = typeof notifications.$inferInsert;

@Injectable()
export class DrizzleNotificationsRepository implements NotificationsRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleNotificationsRepository.name, 'info');
  }

  async insert(ctx: Context, row: Notifications) {
    this.logger.info(
      ctx,
      DrizzleNotificationsRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: NotificationsNew = NotificationsToNotificationsNew(row);
    const result = await this.db
      .getDb()
      .insert(notifications)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToNotifications).at(0) ?? null;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: NotificationsFilter,
  ) {
    this.logger.info(
      ctx,
      DrizzleNotificationsRepository.name,
      'getAll',
      'Getting all clients',
    );
    const sqlDilters: SQLWrapper[] = [];
    if (filters.invoiceId) {
      sqlDilters.push(eq(notifications.invoiceId, filters.invoiceId));
    }
    if (filters.clientId) {
      sqlDilters.push(eq(notifications.clientId, filters.clientId));
    }
    const result = await this.db
      .getDb()
      .select()
      .from(notifications)
      .where(and(...sqlDilters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(notifications)
      .where(and(...sqlDilters))
      .limit(1)
      .execute();
    return { data: result.map(RowToNotifications), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleNotificationsRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(notifications)
      .where(eq(notifications.id, id))
      .execute();
    return result.map(RowToNotifications).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Notifications) {
    this.logger.info(
      ctx,
      DrizzleNotificationsRepository.name,
      'update',
      'Updating client',
    );
    const newRow = NotificationsToRow(row);
    const result = await this.db
      .getDb()
      .update(notifications)
      .set(newRow)
      .where(eq(notifications.id, id))
      .returning()
      .execute();
    return result.map(RowToNotifications).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleNotificationsRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(notifications)
      .where(eq(notifications.id, id))
      .returning()
      .execute();
    return result.map(RowToNotifications).at(0) ?? null;
  }
}
