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
import { WorkerAssignmentUseCases } from '../core/workerAssignment.interface';
import {
  CreateWorkerAssignmentRequest,
  WorkerAssignmentPaginationResponse,
  WorkerAssignmentResponse,
  UpdateWorkerAssignmentRequest,
} from './service.swagger';
import {
  createWorkerAssignmentSchema,
  UpdateWorkerAssignmentSchema,
} from '../core/workerAssignment.zod';

@Controller('workerAssignment')
export class WorkerAssignmentController {
  constructor(
    private readonly application: WorkerAssignmentUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOkResponse({
    description: 'WorkerAssignment created',
    type: WorkerAssignmentResponse,
  })
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
  @ApiBody({ type: CreateWorkerAssignmentRequest })
  @ApiOperation({
    summary: 'Create a new workerAssignment',
  })
  create(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createWorkerAssignmentSchema))
    createWorkerAssignmentDto: CreateWorkerAssignmentRequest,
  ): Promise<WorkerAssignmentResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerAssignmentController.name,
      'create',
      'Creating new workerAssignment',
    );
    return this.application.create(ctx, createWorkerAssignmentDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all workerAssignments',
  })
  @ApiOkResponse({
    description: 'All workerAssignments',
    type: [WorkerAssignmentResponse],
  })
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
  ): Promise<WorkerAssignmentPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerAssignmentController.name,
      'findAll',
      'Getting all workerAssignments',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get workerAssignment by id',
  })
  @ApiOkResponse({
    description: 'WorkerAssignment found',
    type: WorkerAssignmentResponse,
  })
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
      WorkerAssignmentController.name,
      'findOne',
      'Getting workerAssignment',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'WorkerAssignment updated',
    type: WorkerAssignmentResponse,
  })
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
  @ApiBody({ type: UpdateWorkerAssignmentRequest })
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateWorkerAssignmentSchema))
    updateWorkerAssignmentDto: UpdateWorkerAssignmentRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      WorkerAssignmentController.name,
      'update',
      'Updating workerAssignment',
    );
    return this.application.update(ctx, id, updateWorkerAssignmentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'WorkerAssignment deleted' })
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
      WorkerAssignmentController.name,
      'remove',
      'Deleting workerAssignment',
    );
    return this.application.delete(ctx, id);
  }
}
