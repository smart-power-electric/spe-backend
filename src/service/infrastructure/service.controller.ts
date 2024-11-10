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
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ApplicationExceptionResponse } from 'src/common/infrastructure/http/exception/http.swagger';
import { ZodValidationPipe } from 'src/common/application/pipes/ZodValidationPipe';
import { ServiceUseCases } from '../core/service.interface';
import {
  CreateServiceRequest,
  ServicePaginationResponse,
  ServiceResponse,
  UpdateServiceRequest,
} from './service.swagger';
import { createServiceSchema, UpdateServiceSchema } from '../core/service.zod';

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(
    @Inject(ServiceUseCases) private readonly application: ServiceUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ServiceController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ description: 'Service created', type: ServiceResponse })
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
  @ApiBody({ type: CreateServiceRequest })
  @ApiOperation({
    summary: 'Create a new service',
  })
  createService(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createServiceSchema))
    createServiceDto: CreateServiceRequest,
  ): Promise<ServiceResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ServiceController.name,
      'create',
      'Creating new service',
    );
    return this.application.create(ctx, createServiceDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all services',
  })
  @ApiOkResponse({ description: 'All services', type: [ServiceResponse] })
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
  findAllService(
    @Req() req: Request,
    @Param('limit') limit: number,
    @Param('offset') offset: number,
  ): Promise<ServicePaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ServiceController.name,
      'findAll',
      'Getting all services',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get service by id',
  })
  @ApiOkResponse({ description: 'Service found', type: ServiceResponse })
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
  findOneService(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ServiceController.name,
      'findOne',
      'Getting service',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Service updated', type: ServiceResponse })
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
  @ApiBody({ type: UpdateServiceRequest })
  updateService(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateServiceSchema))
    updateServiceDto: UpdateServiceRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(ctx, ServiceController.name, 'update', 'Updating service');
    return this.application.update(ctx, id, updateServiceDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Service deleted' })
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
  removeService(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(ctx, ServiceController.name, 'remove', 'Deleting service');
    return this.application.delete(ctx, id);
  }
}
