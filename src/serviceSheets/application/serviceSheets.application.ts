import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  ServiceSheetsRepository,
  ServiceSheetsUseCases,
} from '../core/serviceSheets.interface';
import {
  CreateServiceSheetsDto,
  UpdateServiceSheetsDto,
} from '../core/serviceSheets.dto';
import { ServiceSheets } from '../core/serviceSheets.entity';
import { CreateDtoToServiceSheets } from '../infrastructure/serviceSheets.mapper';

@Injectable()
export class ServiceSheetsApplication implements ServiceSheetsUseCases {
  constructor(
    private readonly repository: ServiceSheetsRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ServiceSheetsApplication.name, 'info');
  }

  async create(
    ctx: Context,
    dto: CreateServiceSheetsDto,
  ): Promise<ServiceSheets> {
    this.logger.info(
      ctx,
      ServiceSheetsApplication.name,
      'create',
      'Creating new serviceSheets',
    );
    const serviceSheets = CreateDtoToServiceSheets(dto);
    const newServiceSheets = await this.repository.insert(ctx, serviceSheets);
    if (!newServiceSheets) {
      throw new InternalErrorException(ctx, 'ServiceSheets already exists');
    }
    return newServiceSheets;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{ data: ServiceSheets[]; total: number }> {
    this.logger.info(
      ctx,
      ServiceSheetsApplication.name,
      'getAll',
      'Getting all serviceSheetss',
    );
    const result = await this.repository.getAll(ctx, limit, offset);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<ServiceSheets> {
    this.logger.info(
      ctx,
      ServiceSheetsApplication.name,
      'getById',
      'Getting serviceSheets',
    );
    const serviceSheets = await this.repository.getById(ctx, id);
    if (!serviceSheets) {
      throw new NotFoundException(ctx, 'ServiceSheets not found');
    }
    return serviceSheets;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateServiceSheetsDto,
  ): Promise<ServiceSheets> {
    this.logger.info(
      ctx,
      ServiceSheetsApplication.name,
      'update',
      'Updating serviceSheets',
    );
    const serviceSheets = await this.repository.getById(ctx, id);
    if (!serviceSheets) {
      throw new NotFoundException(ctx, 'ServiceSheets not found');
    }
    const updatedServiceSheets = new ServiceSheets({
      ...serviceSheets,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedServiceSheets);
    if (!updated) {
      throw new InternalErrorException(ctx, 'ServiceSheets not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<ServiceSheets> {
    this.logger.info(
      ctx,
      ServiceSheetsApplication.name,
      'delete',
      'Deleting serviceSheets',
    );
    const serviceSheets = await this.repository.getById(ctx, id);
    if (!serviceSheets) {
      throw new NotFoundException(ctx, 'ServiceSheets not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'ServiceSheets not deleted');
    }
    return deleted;
  }
}
