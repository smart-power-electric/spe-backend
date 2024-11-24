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
import { WorkerRatesUseCases } from '../core/workerRates.interface';
import {
  CreateWorkerRatesRequest,
  UpdateWorkerRatesRequest,
  WorkerRatesPaginationResponse,
  WorkerRatesResponse,
} from './workerRates.swagger';
import {
  createWorkerRatesSchema,
  UpdateWorkerRatesSchema,
} from '../core/workerRates.zod';

@ApiTags('workerRates')
@Controller('worker-rates')
export class WorkerRatesController {
  constructor(
    @Inject(WorkerRatesUseCases)
    private readonly application: WorkerRatesUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(WorkerRatesController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'WorkerRates created',
    type: WorkerRatesResponse,
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
  @ApiBody({ type: CreateWorkerRatesRequest })
  @ApiOperation({
    summary: 'Create a new workerRates',
  })
  createWorkerRates(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createWorkerRatesSchema))
    createWorkerRatesDto: CreateWorkerRatesRequest,
  ): Promise<WorkerRatesResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerRatesController.name,
      'create',
      'Creating new workerRates',
    );
    return this.application.create(ctx, createWorkerRatesDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all workerRatess',
  })
  @ApiOkResponse({
    description: 'All workerRatess',
    type: WorkerRatesPaginationResponse,
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
  @ApiQuery({ name: 'workerId', required: false, type: String })
  findAllWorkerRates(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
  ): Promise<WorkerRatesPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerRatesController.name,
      'findAll',
      'Getting all workerRatess',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get workerRates by id',
  })
  @ApiOkResponse({
    description: 'WorkerRates found',
    type: WorkerRatesResponse,
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
  @ApiParam({ name: 'id', type: String })
  findOneWorkerRates(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerRatesController.name,
      'findOne',
      'Getting workerRates',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'WorkerRates updated',
    type: WorkerRatesResponse,
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
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateWorkerRatesRequest })
  updateWorkerRates(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateWorkerRatesSchema))
    updateWorkerRatesDto: UpdateWorkerRatesRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      WorkerRatesController.name,
      'update',
      'Updating workerRates',
    );
    return this.application.update(ctx, id, updateWorkerRatesDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'WorkerRates deleted' })
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
  removeWorkerRates(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      WorkerRatesController.name,
      'remove',
      'Deleting workerRates',
    );
    return this.application.delete(ctx, id);
  }
}
