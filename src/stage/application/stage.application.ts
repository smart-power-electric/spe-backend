import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  StageGetAllFilters,
  StageRepository,
  StageUseCases,
} from '../core/stage.interface';
import { CreateStageDto, UpdateStageDto } from '../core/stage.dto';
import { Stage } from '../core/stage.entity';
import { CreateDtoToStage } from '../infrastructure/stage.mapper';

@Injectable()
export class StageApplication implements StageUseCases {
  constructor(
    @Inject(StageRepository) private readonly repository: StageRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(StageApplication.name, 'info');
  }

  async create(ctx: Context, dto: CreateStageDto): Promise<Stage> {
    this.logger.info(
      ctx,
      StageApplication.name,
      'create',
      'Creating new stage',
    );
    const stage = CreateDtoToStage(dto);
    const newStage = await this.repository.insert(ctx, stage);
    if (!newStage) {
      throw new InternalErrorException(ctx, 'Stage already exists');
    }
    return newStage;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: StageGetAllFilters,
  ): Promise<{ data: Stage[]; total: number }> {
    this.logger.info(
      ctx,
      StageApplication.name,
      'getAll',
      'Getting all stages',
    );
    const result = await this.repository.getAll(ctx, limit, offset, filters);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<Stage> {
    this.logger.info(ctx, StageApplication.name, 'getById', 'Getting stage');
    const stage = await this.repository.getById(ctx, id);
    if (!stage) {
      throw new NotFoundException(ctx, 'Stage not found');
    }
    return stage;
  }

  async update(ctx: Context, id: string, row: UpdateStageDto): Promise<Stage> {
    this.logger.info(ctx, StageApplication.name, 'update', 'Updating stage');
    const stage = await this.repository.getById(ctx, id);
    if (!stage) {
      throw new NotFoundException(ctx, 'Stage not found');
    }
    const { id: rowId, ...rowData } = row;
    const updatedStage = new Stage({
      ...stage,
      ...rowData,
    });
    const updated = await this.repository.update(ctx, id, updatedStage);
    if (!updated) {
      throw new InternalErrorException(ctx, 'Stage not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<Stage> {
    this.logger.info(ctx, StageApplication.name, 'delete', 'Deleting stage');
    const stage = await this.repository.getById(ctx, id);
    if (!stage) {
      throw new NotFoundException(ctx, 'Stage not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'Stage not deleted');
    }
    return deleted;
  }
}
