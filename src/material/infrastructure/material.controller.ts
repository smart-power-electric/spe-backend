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
} from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
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

@Controller('material')
export class MaterialController {
  constructor(
    private readonly application: MaterialUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ description: 'Material created', type: MaterialResponse })
  @ApiBadRequestResponse({
    status: 400,
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
  create(
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
  @ApiOkResponse({ description: 'All materials', type: [MaterialResponse] })
  @ApiBadRequestResponse({
    status: 400,
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
  findAll(
    @Req() req: Request,
    @Param('limit') limit: number,
    @Param('offset') offset: number,
  ): Promise<MaterialPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      MaterialController.name,
      'findAll',
      'Getting all materials',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get material by id',
  })
  @ApiOkResponse({ description: 'Material found', type: MaterialResponse })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Req() req: Request, @Param('id') id: string) {
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
    status: 400,
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMaterialRequest })
  update(
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
  @HttpCode(204)
  @ApiOkResponse({ description: 'Material deleted' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: Number })
  remove(@Req() req: Request, @Param('id') id: string) {
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