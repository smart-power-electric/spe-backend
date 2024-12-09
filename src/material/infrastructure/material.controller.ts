import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ApplicationExceptionResponse } from 'src/common/infrastructure/http/exception/http.swagger';
import { ZodValidationPipe } from 'src/common/application/pipes/ZodValidationPipe';
import { MaterialUseCases } from '../core/material.interface';
import {
  CreateMaterialRequest,
  MaterialPaginationResponse,
  MaterialResponse,
  UpdateMaterialRequest,
} from './material.swagger';
import {
  createMaterialSchema,
  UpdateMaterialSchema,
} from '../core/material.zod';
import { MaterialKeys, MaterialKeysType } from '../core/material.entity';
import { CustomValidateEnumPipe } from 'src/common/application/pipes/CustomValidateEnumPipe';

@ApiTags('material')
@Controller('material')
export class MaterialController {
  constructor(
    @Inject(MaterialUseCases) private readonly application: MaterialUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(MaterialController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Material created',
    type: MaterialResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiBody({ type: CreateMaterialRequest })
  @ApiOperation({
    summary: 'Create a new material',
  })
  createMaterial(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createMaterialSchema))
    createMaterialDto: CreateMaterialRequest,
  ): Promise<MaterialResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      MaterialController.name,
      'create',
      'Creating new material',
    );
    return this.application.create(ctx, createMaterialDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all materials',
  })
  @ApiOkResponse({
    description: 'All materials',
    type: MaterialPaginationResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'sortField', required: false, enum: MaterialKeys })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  findAllMaterial(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('sortField', new CustomValidateEnumPipe(MaterialKeys))
    sortField: MaterialKeysType,
    @Query('sortOrder', new CustomValidateEnumPipe(['ASC', 'DESC']))
    sortOrder: 'ASC' | 'DESC',
    @Query('name') name: string,
  ): Promise<MaterialPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      MaterialController.name,
      'findAll',
      'Getting all materials',
    );
    return this.application.getAll(ctx, limit, offset, {
      name,
      sortField,
      sortOrder,
    });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get material by id',
  })
  @ApiOkResponse({ description: 'Material found', type: MaterialResponse })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: String })
  findOneMaterial(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      MaterialController.name,
      'findOne',
      'Getting material',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Material updated', type: MaterialResponse })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateMaterialRequest })
  updateMaterial(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateMaterialSchema))
    updateMaterialDto: UpdateMaterialRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      MaterialController.name,
      'update',
      'Updating material',
    );
    return this.application.update(ctx, id, updateMaterialDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Material deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: String })
  removeMaterial(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      MaterialController.name,
      'remove',
      'Deleting material',
    );
    return this.application.delete(ctx, id);
  }
}
