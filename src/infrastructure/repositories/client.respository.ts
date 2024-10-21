import { Context } from 'src/commons/app-context/context.entity';
import { IBaseRespository } from '../interfaces/base-repository.interfaz';
import { Inject } from '@nestjs/common';
import { ILogger } from 'src/commons/logging/logger.interface';
import { DrizzleDb } from 'src/commons/database/drizzleDb';
import { Client } from 'src/core/entities/client.entity';
import { clients } from 'src/core/schema/schema';
import { eq, SQLWrapper, and, count } from 'drizzle-orm';
import { Pagination } from '../dtos/pagination.dto';

export class ClientRepository
  implements IBaseRespository<Partial<Omit<Client, 'id'>>, Client>
{
  constructor(
    @Inject(ILogger) private readonly logger: ILogger,
    private readonly db: DrizzleDb,
  ) {
    this.logger.init(ClientRepository.name, 'info');
  }

  async getAll(
    ctx: Context,
    filter: Partial<
      Partial<
        Omit<
          {
            name: string | null;
            id: number;
            address: string | null;
            contact: string | null;
            email: string | null;
            phone: string | null;
            city: string | null;
            state: string | null;
            zip: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
          },
          'id'
        >
      >
    >,
    offset: number,
    limit: number,
  ): Promise<
    Pagination<{
      name: string | null;
      id: number;
      address: string | null;
      contact: string | null;
      email: string | null;
      phone: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    }>
  > {
    this.logger.info(
      ctx,
      `${ClientRepository.name}.${this.getAll.name} called`,
    );

    const filters: SQLWrapper[] = [];

    if (filter.name) {
      filters.push(eq(clients.name, filter.name));
    }
    if (filter.address) {
      filters.push(eq(clients.address, filter.address));
    }
    if (filter.contact) {
      filters.push(eq(clients.contact, filter.contact));
    }
    if (filter.email) {
      filters.push(eq(clients.email, filter.email));
    }
    if (filter.phone) {
      filters.push(eq(clients.phone, filter.phone));
    }
    if (filter.city) {
      filters.push(eq(clients.city, filter.city));
    }
    if (filter.state) {
      filters.push(eq(clients.state, filter.state));
    }
    if (filter.zip) {
      filters.push(eq(clients.zip, filter.zip));
    }

    const data = await this.db
      .getDb()
      .select()
      .from(clients)
      .where(and(...filters))
      .offset(offset)
      .limit(limit)
      .execute();

    const countQuery = await this.db
      .getDb()
      .select({
        total: count().as('total'),
      })
      .from(clients)
      .execute();

    return {
      data,
      total: countQuery[0].total,
      offset,
      limit,
    };
  }

  async create(
    ctx: Context,
    data: Partial<
      Omit<
        {
          name: string | null;
          id: number;
          address: string | null;
          contact: string | null;
          email: string | null;
          phone: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          createdAt: Date | null;
          updatedAt: Date | null;
        },
        'id'
      >
    >,
  ): Promise<{
    name: string | null;
    id: number;
    address: string | null;
    contact: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null> {
    this.logger.info(
      ctx,
      `${ClientRepository.name}.${this.create.name} called`,
    );
    const query = await this.db
      .getDb()
      .insert(clients)
      .values(data)
      .returning()
      .execute();

    return query ? query[0] : null;
  }

  async update(
    ctx: Context,
    id: number,
    data: Partial<
      Omit<
        {
          name: string | null;
          id: number;
          address: string | null;
          contact: string | null;
          email: string | null;
          phone: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          createdAt: Date | null;
          updatedAt: Date | null;
        },
        'id'
      >
    >,
  ): Promise<{
    name: string | null;
    id: number;
    address: string | null;
    contact: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null> {
    this.logger.info(
      ctx,
      `${ClientRepository.name}.${this.update.name} called`,
    );
    const query = await this.db
      .getDb()
      .update(clients)
      .set(data)
      .where(eq(clients.id, id))
      .returning()
      .execute();

    return query ? query[0] : null;
  }

  async delete(
    ctx: Context,
    id: number,
  ): Promise<{
    name: string | null;
    id: number;
    address: string | null;
    contact: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null> {
    this.logger.info(
      ctx,
      `${ClientRepository.name}.${this.delete.name} called`,
    );
    const query = await this.db
      .getDb()
      .delete(clients)
      .where(eq(clients.id, id))
      .returning()
      .execute();

    return query ? query[0] : null;
  }

  async getById(
    ctx: Context,
    id: number,
  ): Promise<{
    name: string | null;
    id: number;
    address: string | null;
    contact: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null> {
    this.logger.info(
      ctx,
      `${ClientRepository.name}.${this.getById.name} called`,
    );
    const query = await this.db
      .getDb()
      .select()
      .from(clients)
      .where(eq(clients.id, id))
      .execute();

    return query ? query[0] : null;
  }
}
