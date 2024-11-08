import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  InvoicesRepository,
  InvoicesUseCases,
} from '../core/invoices.interface';
import { CreateInvoicesDto, UpdateInvoicesDto } from '../core/invoices.dto';
import { Invoices } from '../core/invoices.entity';
import { CreateDtoToInvoices } from '../infrastructure/invoices.mapper';

@Injectable()
export class InvoicesApplication implements InvoicesUseCases {
  constructor(
    private readonly repository: InvoicesRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(InvoicesApplication.name, 'info');
  }

  async create(ctx: Context, dto: CreateInvoicesDto): Promise<Invoices> {
    this.logger.info(
      ctx,
      InvoicesApplication.name,
      'create',
      'Creating new invoices',
    );
    const invoices = CreateDtoToInvoices(dto);
    const newInvoices = await this.repository.insert(ctx, invoices);
    if (!newInvoices) {
      throw new InternalErrorException(ctx, 'Invoices already exists');
    }
    return newInvoices;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{ data: Invoices[]; total: number }> {
    this.logger.info(
      ctx,
      InvoicesApplication.name,
      'getAll',
      'Getting all invoicess',
    );
    const result = await this.repository.getAll(ctx, limit, offset);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<Invoices> {
    this.logger.info(
      ctx,
      InvoicesApplication.name,
      'getById',
      'Getting invoices',
    );
    const invoices = await this.repository.getById(ctx, id);
    if (!invoices) {
      throw new NotFoundException(ctx, 'Invoices not found');
    }
    return invoices;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateInvoicesDto,
  ): Promise<Invoices> {
    this.logger.info(
      ctx,
      InvoicesApplication.name,
      'update',
      'Updating invoices',
    );
    const invoices = await this.repository.getById(ctx, id);
    if (!invoices) {
      throw new NotFoundException(ctx, 'Invoices not found');
    }
    const updatedInvoices = new Invoices({
      ...invoices,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedInvoices);
    if (!updated) {
      throw new InternalErrorException(ctx, 'Invoices not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<Invoices> {
    this.logger.info(
      ctx,
      InvoicesApplication.name,
      'delete',
      'Deleting invoices',
    );
    const invoices = await this.repository.getById(ctx, id);
    if (!invoices) {
      throw new NotFoundException(ctx, 'Invoices not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'Invoices not deleted');
    }
    return deleted;
  }
}
