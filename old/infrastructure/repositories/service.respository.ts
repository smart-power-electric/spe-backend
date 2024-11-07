import { Context } from 'src/commons/app-context/context.entity';
import { IBaseRespository } from '../interfaces/base-repository.interfaz';
import { Inject } from '@nestjs/common';
import { ILogger } from 'src/commons/logging/logger.interface';
import { DrizzleDb } from 'src/commons/database/drizzleDb';
import { eq, SQLWrapper, and, count } from 'drizzle-orm';
import { Pagination } from '../dtos/pagination.dto';
import { Service } from 'src/core/entities/service.entity';
import { services } from 'src/core/schema/schema';

export class ServiceRepository
  implements IBaseRespository<Partial<Omit<Service, 'id'>>, Service>
{
  constructor(
    @Inject(ILogger) private readonly logger: ILogger,
    private readonly db: DrizzleDb,
  ) {
    this.logger.init(ServiceRepository.name, 'info');
  }

  /**
   * Create a service
   * @param ctx Context of the request
   * @param data Data of the service to create
   * @returns Created service
   */
  async create(
    ctx: Context,
    data: Partial<Omit<Service, 'id'>>,
  ): Promise<Service | null> {
    this.logger.info(
      ctx,
      `${ServiceRepository.name}.${this.create.name} called`,
    );
    const query = await this.db
      .getDb()
      .insert(services)
      .values(data)
      .returning()
      .execute();
    return query ? query[0] : null;
  }

  /**
   * Update a service
   * @param ctx Context of the request
   * @param id Id of the service to update
   * @param data Data to update
   * @returns Updated service
   */
  async update(
    ctx: Context,
    id: number,
    data: Partial<Omit<Service, 'id'>>,
  ): Promise<Service | null> {
    this.logger.info(
      ctx,
      `${ServiceRepository.name}.${this.update.name} called`,
    );
    const query = await this.db
      .getDb()
      .update(services)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(services.id, id))
      .returning()
      .execute();
    return query ? query[0] : null;
  }

  /**
   * Delete a service
   * @param ctx Context of the request
   * @param id Id of the service to delete
   * @returns Deleted service
   */
  async delete(ctx: Context, id: number): Promise<Service | null> {
    this.logger.info(
      ctx,
      `${ServiceRepository.name}.${this.delete.name} called`,
    );
    const query = await this.db
      .getDb()
      .delete(services)
      .where(eq(services.id, id))
      .returning()
      .execute();
    return query ? query[0] : null;
  }

  /**
   * Get a service by id
   * @param ctx Context of the request
   * @param id Id of the service to get
   * @returns Service
   */
  async getById(ctx: Context, id: number): Promise<Service | null> {
    this.logger.info(
      ctx,
      `${ServiceRepository.name}.${this.getById.name} called`,
    );
    const query = await this.db
      .getDb()
      .select()
      .from(services)
      .where(eq(services.id, id))
      .execute();
    return query ? query[0] : null;
  }

  /**
   * Get all services
   * @param ctx Context of the request
   * @param filter Filter to apply
   * @param offset Offset of the pagination
   * @param limit Limit of the pagination
   * @returns Pagination of services
   */
  async getAll(
    ctx: Context,
    filter: Partial<Partial<Omit<Service, 'id'>>>,
    offset: number,
    limit: number,
  ): Promise<Pagination<Service>> {
    this.logger.info(
      ctx,
      `${ServiceRepository.name}.${this.getAll.name} called`,
    );

    const filters: SQLWrapper[] = [];

    if (filter.name) {
      filters.push(eq(services.name, filter.name));
    }

    const query = await this.db
      .getDb()
      .select()
      .from(services)
      .where(and(...filters))
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({
        total: count().as('count'),
      })
      .from(services)
      .execute();

    return {
      data: query,
      total: total[0].total,
      offset,
      limit,
    };
  }
}
