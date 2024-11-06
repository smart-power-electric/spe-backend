import { Context } from 'src/common/core/context.entity';
import { Client } from './client.entity';

export interface ClientRepository {
  insert(ctx: Context, row: Client): Promise<Client | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{ data: Client[]; total: number }>;
  getById(ctx: Context, id: number): Promise<Client | null>;
  update(ctx: Context, id: number, row: Client): Promise<Client | null>;
  delete(ctx: Context, id: number): Promise<Client | null>;
}
export const ClientRepository = Symbol('ClientRepository');
