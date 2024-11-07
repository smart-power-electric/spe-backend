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
import { WorkerUseCases } from '../core/worker.interface';
import {
  CreateWorkerRequest,
  UpdateWorkerRequest,
  WorkerPaginationResponse,
  WorkerResponse,
} from './worker.swagger';
import { createWorkerSchema, UpdateWorkerSchema } from '../core/worker.zod';

@Controller('worker')
export class WorkerController {
  constructor(
    private readonly application: WorkerUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ description: 'Worker created', type: WorkerResponse })
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
  @ApiBody({ type: CreateWorkerRequest })
  @ApiOperation({
    summary: 'Create a new worker',
  })
  create(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createWorkerSchema))
    createWorkerDto: CreateWorkerRequest,
  ): Promise<WorkerResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerController.name,
      'create',
      'Creating new worker',
    );
    return this.application.create(ctx, createWorkerDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all workers',
  })
  @ApiOkResponse({ description: 'All workers', type: [WorkerResponse] })
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
  ): Promise<WorkerPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerController.name,
      'findAll',
      'Getting all workers',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get worker by id',
  })
  @ApiOkResponse({ description: 'Worker found', type: WorkerResponse })
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
      WorkerController.name,
      'findOne',
      'Getting worker',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Worker updated', type: WorkerResponse })
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
  @ApiBody({ type: UpdateWorkerRequest })
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateWorkerSchema))
    updateWorkerDto: UpdateWorkerRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(ctx, WorkerController.name, 'update', 'Updating worker');
    return this.application.update(ctx, id, updateWorkerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Worker deleted' })
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
    this.logger.info(ctx, WorkerController.name, 'remove', 'Deleting worker');
    return this.application.delete(ctx, id);
  }
}
