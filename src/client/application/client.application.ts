import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from '../core/client.dto';
import { ClientRepository, ClientUseCases } from '../core/client.interface';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import { Client } from '../core/client.entity';
import { CreateDtoToClient } from '../infrastructure/client.mapper';

@Injectable()
export class ClientApplication implements ClientUseCases {
  constructor(
    private readonly repository: ClientRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ClientApplication.name, 'info');
  }

  async create(ctx: Context, newClient: CreateClientDto): Promise<Client> {
    this.logger.info(
      ctx,
      ClientApplication.name,
      'create',
      'Creating new client',
    );
    const existUser = await this.repository.getByEmail(
      ctx,
      newClient.email ?? '',
    );
    if (existUser) {
      throw new Error('Client already exists');
    }
    const client = CreateDtoToClient(newClient);
    const newclient = await this.repository.insert(ctx, client);
    if (!newclient) {
      throw new Error('Client not created');
    }
    return newclient;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{ data: Client[]; total: number }> {
    this.logger.info(
      ctx,
      ClientApplication.name,
      'getAll',
      'Getting all clients',
    );
    const result = await this.repository.getAll(ctx, limit, offset);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<Client> {
    this.logger.info(ctx, ClientApplication.name, 'getById', 'Getting client');
    const client = await this.repository.getById(ctx, id);
    if (!client) {
      throw new Error('Client not found');
    }
    return client;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateClientDto,
  ): Promise<Client> {
    this.logger.info(ctx, ClientApplication.name, 'update', 'Updating client');
    const client = await this.repository.getById(ctx, id);
    if (!client) {
      throw new Error('Client not found');
    }
    const updatedClient = new Client({
      ...client,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedClient);
    if (!updated) {
      throw new Error('Client not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<Client> {
    this.logger.info(ctx, ClientApplication.name, 'delete', 'Deleting client');
    const client = await this.repository.getById(ctx, id);
    if (!client) {
      throw new Error('Client not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new Error('Client not deleted');
    }
    return deleted;
  }
}
