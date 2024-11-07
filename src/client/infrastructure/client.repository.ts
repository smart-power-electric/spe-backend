import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';
import { clients } from 'src/common/infrastructure/schema/schema';
import { Client } from '../core/client.entity';
import { count, eq } from 'drizzle-orm';
import { ClientRepository } from '../core/client.interface';
import { RowtoClient } from './client.mapper';

export type ClientRow = typeof clients.$inferSelect;
export type ClientNew = typeof clients.$inferInsert;

@Injectable()
export class DrizzleClientRepository implements ClientRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleClientRepository.name, 'info');
  }

  async insert(ctx: Context, row: Client) {
    this.logger.info(
      ctx,
      DrizzleClientRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: ClientNew = {
      name: row.name,
      email: row.email,
      phone: row.phone,
      address: row.address,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    const result = await this.db
      .getDb()
      .insert(clients)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowtoClient).at(0) ?? null;
  }

  async getAll(ctx: Context, limit: number, offset: number) {
    this.logger.info(
      ctx,
      DrizzleClientRepository.name,
      'getAll',
      'Getting all clients',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(clients)
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(clients)
      .limit(1)
      .execute();
    return { data: result.map(RowtoClient), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleClientRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(clients)
      .where(eq(clients.id, id))
      .execute();
    return result.map(RowtoClient).at(0) ?? null;
  }
  async getByEmail(ctx: Context, email: string): Promise<Client | null> {
    this.logger.info(
      ctx,
      DrizzleClientRepository.name,
      'getByEmail',
      'Getting client by email',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(clients)
      .where(eq(clients.email, email))
      .execute();
    return result.map(RowtoClient).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Client) {
    this.logger.info(
      ctx,
      DrizzleClientRepository.name,
      'update',
      'Updating client',
    );
    const newRow: ClientNew = {
      name: row.name,
      email: row.email,
      phone: row.phone,
      address: row.address,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    const result = await this.db
      .getDb()
      .update(clients)
      .set(newRow)
      .where(eq(clients.id, id))
      .returning()
      .execute();
    return result.map(RowtoClient).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleClientRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(clients)
      .where(eq(clients.id, id))
      .returning()
      .execute();
    return result.map(RowtoClient).at(0) ?? null;
  }
}
