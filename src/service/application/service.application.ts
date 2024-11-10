import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import { ServiceRepository, ServiceUseCases } from '../core/service.interface';
import { CreateServiceDto, UpdateServiceDto } from '../core/service.dto';
import { Service } from '../core/service.entity';
import { CreateDtoToService } from '../infrastructure/service.mapper';

@Injectable()
export class ServiceApplication implements ServiceUseCases {
  constructor(
    @Inject(ServiceRepository) private readonly repository: ServiceRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ServiceApplication.name, 'info');
  }

  async create(ctx: Context, dto: CreateServiceDto): Promise<Service> {
    this.logger.info(
      ctx,
      ServiceApplication.name,
      'create',
      'Creating new service',
    );
    const service = CreateDtoToService(dto);
    const newService = await this.repository.insert(ctx, service);
    if (!newService) {
      throw new InternalErrorException(ctx, 'Service already exists');
    }
    return newService;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{ data: Service[]; total: number }> {
    this.logger.info(
      ctx,
      ServiceApplication.name,
      'getAll',
      'Getting all services',
    );
    const result = await this.repository.getAll(ctx, limit, offset);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<Service> {
    this.logger.info(
      ctx,
      ServiceApplication.name,
      'getById',
      'Getting service',
    );
    const service = await this.repository.getById(ctx, id);
    if (!service) {
      throw new NotFoundException(ctx, 'Service not found');
    }
    return service;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateServiceDto,
  ): Promise<Service> {
    this.logger.info(
      ctx,
      ServiceApplication.name,
      'update',
      'Updating service',
    );
    const service = await this.repository.getById(ctx, id);
    if (!service) {
      throw new NotFoundException(ctx, 'Service not found');
    }
    const updatedService = new Service({
      ...service,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedService);
    if (!updated) {
      throw new InternalErrorException(ctx, 'Service not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<Service> {
    this.logger.info(
      ctx,
      ServiceApplication.name,
      'delete',
      'Deleting service',
    );
    const service = await this.repository.getById(ctx, id);
    if (!service) {
      throw new NotFoundException(ctx, 'Service not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'Service not deleted');
    }
    return deleted;
  }
}
