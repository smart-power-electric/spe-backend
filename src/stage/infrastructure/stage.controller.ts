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
import { StageUseCases } from '../core/stage.interface';
import {
  CreateStageRequest,
  StagePaginationResponse,
  StageResponse,
  UpdateStageRequest,
} from './stage.swagger';
import { createStageSchema, UpdateStageSchema } from '../core/stage.zod';

@ApiTags('stage')
@Controller('stage')
export class StageController {
  constructor(
    @Inject(StageUseCases) private readonly application: StageUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(StageController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ description: 'Stage created', type: StageResponse })
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
  @ApiBody({ type: CreateStageRequest })
  @ApiOperation({
    summary: 'Create a new stage',
  })
  createStage(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createStageSchema))
    createStageDto: CreateStageRequest,
  ): Promise<StageResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      StageController.name,
      'create',
      'Creating new stage',
    );
    return this.application.create(ctx, createStageDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all stages',
  })
  @ApiOkResponse({ description: 'All stages', type: StagePaginationResponse })
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
  @ApiQuery({ name: 'projectId', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  findAllStage(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('projectId') projectId: string,
    @Query('name') name: string,
  ): Promise<StagePaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      StageController.name,
      'findAll',
      'Getting all stages',
    );
    return this.application.getAll(ctx, limit, offset, { projectId, name });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get stage by id',
  })
  @ApiOkResponse({ description: 'Stage found', type: StageResponse })
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
  @ApiParam({ name: 'id', type: String })
  findOneStage(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      StageController.name,
      'findOne',
      'Getting stage',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Stage updated', type: StageResponse })
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
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateStageRequest })
  updateStage(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateStageSchema))
    updateStageDto: UpdateStageRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(ctx, StageController.name, 'update', 'Updating stage');
    return this.application.update(ctx, id, updateStageDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Stage deleted' })
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
  @ApiParam({ name: 'id', type: String })
  removeStage(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(ctx, StageController.name, 'remove', 'Deleting stage');
    return this.application.delete(ctx, id);
  }
}
