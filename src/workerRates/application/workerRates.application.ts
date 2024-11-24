import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  WorkerRatesRepository,
  WorkerRatesUseCases,
} from '../core/workerRates.interface';
import {
  CreateWorkerRatesDto,
  UpdateWorkerRatesDto,
} from '../core/workerRates.dto';
import { WorkerRates } from '../core/workerRates.entity';
import { CreateDtoToWorkerRates } from '../infrastructure/workerRates.mapper';

@Injectable()
export class WorkerRatesApplication implements WorkerRatesUseCases {
  constructor(
    @Inject(WorkerRatesRepository)
    private readonly repository: WorkerRatesRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(WorkerRatesApplication.name, 'info');
  }

  async create(ctx: Context, dto: CreateWorkerRatesDto): Promise<WorkerRates> {
    this.logger.info(
      ctx,
      WorkerRatesApplication.name,
      'create',
      'Creating new workerRates',
    );
    const workerRates = CreateDtoToWorkerRates(dto);
    const newWorkerRates = await this.repository.insert(ctx, workerRates);
    if (!newWorkerRates) {
      throw new InternalErrorException(ctx, 'WorkerRates already exists');
    }
    return newWorkerRates;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{ data: WorkerRates[]; total: number }> {
    this.logger.info(
      ctx,
      WorkerRatesApplication.name,
      'getAll',
      'Getting all workerRatess',
    );
    const result = await this.repository.getAll(ctx, limit, offset);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<WorkerRates> {
    this.logger.info(
      ctx,
      WorkerRatesApplication.name,
      'getById',
      'Getting workerRates',
    );
    const workerRates = await this.repository.getById(ctx, id);
    if (!workerRates) {
      throw new NotFoundException(ctx, 'WorkerRates not found');
    }
    return workerRates;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateWorkerRatesDto,
  ): Promise<WorkerRates> {
    this.logger.info(
      ctx,
      WorkerRatesApplication.name,
      'update',
      'Updating workerRates',
    );
    const workerRates = await this.repository.getById(ctx, id);
    if (!workerRates) {
      throw new NotFoundException(ctx, 'WorkerRates not found');
    }
    const updatedWorkerRates = new WorkerRates({
      ...workerRates,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedWorkerRates);
    if (!updated) {
      throw new InternalErrorException(ctx, 'WorkerRates not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<WorkerRates> {
    this.logger.info(
      ctx,
      WorkerRatesApplication.name,
      'delete',
      'Deleting workerRates',
    );
    const workerRates = await this.repository.getById(ctx, id);
    if (!workerRates) {
      throw new NotFoundException(ctx, 'WorkerRates not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'WorkerRates not deleted');
    }
    return deleted;
  }
}
