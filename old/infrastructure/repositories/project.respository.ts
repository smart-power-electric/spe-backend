import { Context } from 'src/commons/app-context/context.entity';
import { IBaseRespository } from '../interfaces/base-repository.interfaz';
import { Inject } from '@nestjs/common';
import { ILogger } from 'src/commons/logging/logger.interface';
import { DrizzleDb } from 'src/commons/database/drizzleDb';
import { eq, SQLWrapper, and, count, gte, lte } from 'drizzle-orm';
import { Pagination } from '../dtos/pagination.dto';
import { FullProject, Project } from 'src/core/entities/project.entity';
import { clients, projects } from 'src/core/schema/schema';
import { PlatformError } from 'src/commons/http-exception/Error.entity';

export class ProjectRepository
  implements
    IBaseRespository<
      Partial<Omit<Project, 'id'>>,
      FullProject
    >
{
  constructor(
    @Inject(ILogger) private readonly logger: ILogger,
    private readonly db: DrizzleDb,
  ) {
    this.logger.init(ProjectRepository.name, 'info');
  }

  /**
   * Create a Project
   * @param ctx Context of the request
   * @param data Data of the Project to create
   * @returns Created Project
   */
  async create(
    ctx: Context,
    data: Partial<Omit<Project, 'id'>>,
  ): Promise<(FullProject) | null> {
    this.logger.info(
      ctx,
      `${ProjectRepository.name}.${this.create.name} called`,
    );

    const transaction = await this.db.getDb().transaction(async (trx) => {
      const query = await trx.insert(projects).values(data).returning();

      if (!query || !query[0].clientId) {
        trx.rollback();
        throw PlatformError.Internal('Error creating project');
      }

      const client = await trx
        .select()
        .from(clients)
        .where(eq(clients.id, query[0].clientId))
        .execute();

      if (!client) {
        trx.rollback();
        throw PlatformError.BadRequest('Client not found');
      }

      return { ...query[0], client: client[0] };
    });

    return transaction ? transaction : null;
  }

  /**
   * Update a Project
   * @param ctx Context of the request
   * @param id Id of the Project to update
   * @param data Data to update
   * @returns Updated Project
   */
  async update(
    ctx: Context,
    id: number,
    data: Partial<Omit<Project, 'id'>>,
  ): Promise<(FullProject) | null> {
    this.logger.info(
      ctx,
      `${ProjectRepository.name}.${this.update.name} called`,
    );
    const transaction = await this.db.getDb().transaction(async (trx) => {
      const query = await this.db
        .getDb()
        .update(projects)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id))
        .returning()
        .execute();

      if (!query || !query[0].clientId) {
        trx.rollback();
        throw PlatformError.Internal('Error creating project');
      }

      const client = await trx
        .select()
        .from(clients)
        .where(eq(clients.id, query[0].clientId))
        .execute();

      if (!client) {
        trx.rollback();
        throw PlatformError.BadRequest('Client not found');
      }

      return { ...query[0], client: client[0] };
    });

    return transaction ? transaction : null;
  }

  /**
   * Delete a Project
   * @param ctx Context of the request
   * @param id Id of the Project to delete
   * @returns Deleted Project
   */
  async delete(
    ctx: Context,
    id: number,
  ): Promise<(FullProject) | null> {
    this.logger.info(
      ctx,
      `${ProjectRepository.name}.${this.delete.name} called`,
    );

    const transaction = await this.db.getDb().transaction(async (trx) => {
      const query = await this.db
        .getDb()
        .delete(projects)
        .where(eq(projects.id, id))
        .returning()
        .execute();

      if (!query || !query[0].clientId) {
        trx.rollback();
        throw PlatformError.Internal('Error creating project');
      }

      const client = await trx
        .select()
        .from(clients)
        .where(eq(clients.id, query[0].clientId))
        .execute();

      return { ...query[0], client: client? client[0] : null };
    });

    return transaction ? transaction : null;
  }

  /**
   * Get a Project by id
   * @param ctx Context of the request
   * @param id Id of the Project to get
   * @returns Project
   */
  async getById(
    ctx: Context,
    id: number,
  ): Promise<(FullProject) | null> {
    this.logger.info(
      ctx,
      `${ProjectRepository.name}.${this.getById.name} called`,
    );
    const query = await this.db
      .getDb()
      .select()
      .from(projects)
      .innerJoin(clients, eq(projects.clientId, clients.id))
      .where(eq(projects.id, id))
      .execute();

    return query ? { ...query[0].projects, client: query[0].clients } : null;
  }

  /**
   * Get all Projects
   * @param ctx Context of the request
   * @param filter Filter to apply
   * @param offset Offset of the pagination
   * @param limit Limit of the pagination
   * @returns Pagination of Projects
   */
  async getAll(
    ctx: Context,
    filter: Partial<Partial<Omit<Project, 'id'>>>,
    offset: number,
    limit: number,
  ): Promise<Pagination<FullProject>> {
    this.logger.info(
      ctx,
      `${ProjectRepository.name}.${this.getAll.name} called`,
    );

    const filters: SQLWrapper[] = [];

    if (filter.name) {
      filters.push(eq(projects.name, filter.name));
    }
    if (filter.clientId) {
      filters.push(eq(projects.clientId, filter.clientId));
    }
    if (filter.startDate) {
      filters.push(gte(projects.startDate, filter.startDate));
    }
    if (filter.endDate) {
      filters.push(lte(projects.endDate, filter.endDate));
    }

    const query = await this.db
      .getDb()
      .select()
      .from(projects)
      .innerJoin(clients, eq(projects.clientId, clients.id))
      .where(and(...filters))
      .limit(limit)
      .offset(offset)
      .execute();

    const total = await this.db
      .getDb()
      .select({
        total: count().as('count'),
      })
      .from(projects)
      .execute();

    return {
      data: query
        ? query.map((item) => ({ ...item.projects, client: item.clients }))
        : [],
      total: total[0].total,
      offset,
      limit,
    };
  }
}
