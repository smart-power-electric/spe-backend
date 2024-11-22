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
import { WorkerPaymentsUseCases } from '../core/workerPayments.interface';
import {
  CreateWorkerPaymentsRequest,
  UpdateWorkerPaymentsRequest,
  WorkerPaymentsPaginationResponse,
  WorkerPaymentsResponse,
} from './workerPayments.swagger';
import {
  createWorkerPaymentsSchema,
  UpdateWorkerPaymentsSchema,
} from '../core/workerPayments.zod';
import {
  WorkerPaymentsKeys,
  WorkerPaymentsKeysType,
} from '../core/workerPayments.entity';
import { CustomValidateEnumPipe } from 'src/common/application/pipes/CustomValidateEnumPipe';

@ApiTags('workerPayments')
@Controller('worker-payments')
export class WorkerPaymentsController {
  constructor(
    @Inject(WorkerPaymentsUseCases)
    private readonly application: WorkerPaymentsUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(WorkerPaymentsController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'WorkerPayments created',
    type: WorkerPaymentsResponse,
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
  @ApiBody({ type: CreateWorkerPaymentsRequest })
  @ApiOperation({
    summary: 'Create a new workerPayments',
  })
  createWorkerPayments(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createWorkerPaymentsSchema))
    createWorkerPaymentsDto: CreateWorkerPaymentsRequest,
  ): Promise<WorkerPaymentsResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerPaymentsController.name,
      'create',
      'Creating new workerPayments',
    );
    return this.application.create(ctx, createWorkerPaymentsDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all workerPaymentss',
  })
  @ApiOkResponse({
    description: 'All workerPaymentss',
    type: WorkerPaymentsPaginationResponse,
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
  @ApiQuery({ name: 'serviceSheetId', required: false, type: String })
  @ApiQuery({ name: 'sortField', required: false, enum: WorkerPaymentsKeys })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  findAllWorkerPayments(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('workerId') workerId: string,
    @Query('serviceSheetId') serviceSheetId: string,
    @Query('sortField', new CustomValidateEnumPipe(WorkerPaymentsKeys))
    sortField: WorkerPaymentsKeysType,
    @Query('sortOrder', new CustomValidateEnumPipe(['ASC', 'DESC']))
    sortOrder: 'ASC' | 'DESC',
  ): Promise<WorkerPaymentsPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerPaymentsController.name,
      'findAll',
      'Getting all workerPaymentss',
    );
    return this.application.getAll(ctx, limit, offset, {
      workerId,
      serviceSheetId,
      sortField,
      sortOrder,
    });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get workerPayments by id',
  })
  @ApiOkResponse({
    description: 'WorkerPayments found',
    type: WorkerPaymentsResponse,
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
  findOneWorkerPayments(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      WorkerPaymentsController.name,
      'findOne',
      'Getting workerPayments',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'WorkerPayments updated',
    type: WorkerPaymentsResponse,
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
  @ApiBody({ type: UpdateWorkerPaymentsRequest })
  updateWorkerPayments(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateWorkerPaymentsSchema))
    updateWorkerPaymentsDto: UpdateWorkerPaymentsRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      WorkerPaymentsController.name,
      'update',
      'Updating workerPayments',
    );
    return this.application.update(ctx, id, updateWorkerPaymentsDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'WorkerPayments deleted' })
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
  removeWorkerPayments(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      WorkerPaymentsController.name,
      'remove',
      'Deleting workerPayments',
    );
    return this.application.delete(ctx, id);
  }
}
