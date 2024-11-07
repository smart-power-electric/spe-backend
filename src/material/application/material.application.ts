import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  MaterialRepository,
  MaterialUseCases,
} from '../core/material.interface';
import { CreateMaterialDto, UpdateMaterialDto } from '../core/material.dto';
import { Material } from '../core/material.entity';
import { CreateDtoToMaterial } from '../infrastructure/material.mapper';

@Injectable()
export class MaterialApplication implements MaterialUseCases {
  constructor(
    private readonly repository: MaterialRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(MaterialApplication.name, 'info');
  }

  async create(ctx: Context, dto: CreateMaterialDto): Promise<Material> {
    this.logger.info(
      ctx,
      MaterialApplication.name,
      'create',
      'Creating new material',
    );
    const material = CreateDtoToMaterial(dto);
    const newMaterial = await this.repository.insert(ctx, material);
    if (!newMaterial) {
      throw new InternalErrorException(ctx, 'Material already exists');
    }
    return newMaterial;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{ data: Material[]; total: number }> {
    this.logger.info(
      ctx,
      MaterialApplication.name,
      'getAll',
      'Getting all materials',
    );
    const result = await this.repository.getAll(ctx, limit, offset);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<Material> {
    this.logger.info(
      ctx,
      MaterialApplication.name,
      'getById',
      'Getting material',
    );
    const material = await this.repository.getById(ctx, id);
    if (!material) {
      throw new NotFoundException(ctx, 'Material not found');
    }
    return material;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateMaterialDto,
  ): Promise<Material> {
    this.logger.info(
      ctx,
      MaterialApplication.name,
      'update',
      'Updating material',
    );
    const material = await this.repository.getById(ctx, id);
    if (!material) {
      throw new NotFoundException(ctx, 'Material not found');
    }
    const updatedMaterial = new Material({
      ...material,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedMaterial);
    if (!updated) {
      throw new InternalErrorException(ctx, 'Material not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<Material> {
    this.logger.info(
      ctx,
      MaterialApplication.name,
      'delete',
      'Deleting material',
    );
    const material = await this.repository.getById(ctx, id);
    if (!material) {
      throw new NotFoundException(ctx, 'Material not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'Material not deleted');
    }
    return deleted;
  }
}
