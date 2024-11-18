import { Context } from 'src/common/core/context.entity';
import { Client, ClientKeysType } from './client.entity';
import { CreateClientDto, UpdateClientDto } from './client.dto';

export type ClientFilters = {
  email?: string;
  name?: string;
  sortField?: ClientKeysType;
  sortOrder?: 'ASC' | 'DESC';
};
export interface ClientRepository {
  insert(ctx: Context, row: Client): Promise<Client | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: ClientFilters,
  ): Promise<{ data: Client[]; total: number }>;
  getById(ctx: Context, id: string): Promise<Client | null>;
  getByEmail(ctx: Context, email: string): Promise<Client | null>;
  update(ctx: Context, id: string, row: Client): Promise<Client | null>;
  delete(ctx: Context, id: string): Promise<Client | null>;
}
export const ClientRepository = Symbol('ClientRepository');

export interface ClientUseCases {
  create(ctx: Context, newclient: CreateClientDto): Promise<Client>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: ClientFilters,
  ): Promise<{ data: Client[]; total: number }>;
  getById(ctx: Context, id: string): Promise<Client>;
  update(ctx: Context, id: string, row: UpdateClientDto): Promise<Client>;
  delete(ctx: Context, id: string): Promise<Client>;
}
export const ClientUseCases = Symbol('ClientUseCases');
