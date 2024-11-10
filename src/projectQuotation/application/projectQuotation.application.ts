import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  ProjectQuotationRepository,
  ProjectQuotationUseCases,
} from '../core/projectQuotation.interface';
import {
  CreateProjectQuotationDto,
  UpdateProjectQuotationDto,
} from '../core/projectQuotation.dto';
import { ProjectQuotation } from '../core/projectQuotation.entity';
import { CreateDtoToProjectQuotation } from '../infrastructure/projectQuotation.mapper';

@Injectable()
export class ProjectQuotationApplication implements ProjectQuotationUseCases {
  constructor(
    @Inject(ProjectQuotationRepository)
    private readonly repository: ProjectQuotationRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ProjectQuotationApplication.name, 'info');
  }

  async create(
    ctx: Context,
    dto: CreateProjectQuotationDto,
  ): Promise<ProjectQuotation> {
    this.logger.info(
      ctx,
      ProjectQuotationApplication.name,
      'create',
      'Creating new projectQuotation',
    );
    const projectQuotation = CreateDtoToProjectQuotation(dto);
    const newProjectQuotation = await this.repository.insert(
      ctx,
      projectQuotation,
    );
    if (!newProjectQuotation) {
      throw new InternalErrorException(ctx, 'ProjectQuotation already exists');
    }
    return newProjectQuotation;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{ data: ProjectQuotation[]; total: number }> {
    this.logger.info(
      ctx,
      ProjectQuotationApplication.name,
      'getAll',
      'Getting all projectQuotations',
    );
    const result = await this.repository.getAll(ctx, limit, offset);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<ProjectQuotation> {
    this.logger.info(
      ctx,
      ProjectQuotationApplication.name,
      'getById',
      'Getting projectQuotation',
    );
    const projectQuotation = await this.repository.getById(ctx, id);
    if (!projectQuotation) {
      throw new NotFoundException(ctx, 'ProjectQuotation not found');
    }
    return projectQuotation;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateProjectQuotationDto,
  ): Promise<ProjectQuotation> {
    this.logger.info(
      ctx,
      ProjectQuotationApplication.name,
      'update',
      'Updating projectQuotation',
    );
    const projectQuotation = await this.repository.getById(ctx, id);
    if (!projectQuotation) {
      throw new NotFoundException(ctx, 'ProjectQuotation not found');
    }
    const updatedProjectQuotation = new ProjectQuotation({
      ...projectQuotation,
      ...row,
    });
    const updated = await this.repository.update(
      ctx,
      id,
      updatedProjectQuotation,
    );
    if (!updated) {
      throw new InternalErrorException(ctx, 'ProjectQuotation not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<ProjectQuotation> {
    this.logger.info(
      ctx,
      ProjectQuotationApplication.name,
      'delete',
      'Deleting projectQuotation',
    );
    const projectQuotation = await this.repository.getById(ctx, id);
    if (!projectQuotation) {
      throw new NotFoundException(ctx, 'ProjectQuotation not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'ProjectQuotation not deleted');
    }
    return deleted;
  }
}
