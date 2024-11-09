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
import { ServiceSheetsUseCases } from '../core/serviceSheets.interface';
import {
  CreateServiceSheetsRequest,
  UpdateServiceSheetsRequest,
  ServiceSheetsPaginationResponse,
  ServiceSheetsResponse,
} from './serviceSheets.swagger';
import {
  createServiceSheetsSchema,
  UpdateServiceSheetsSchema,
} from '../core/serviceSheets.zod';

@ApiTags('serviceSheets')
@Controller('serviceSheets')
export class ServiceSheetsController {
  constructor(
    private readonly application: ServiceSheetsUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ServiceSheetsController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({
    description: 'ServiceSheets created',
    type: ServiceSheetsResponse,
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
  @ApiBody({ type: CreateServiceSheetsRequest })
  @ApiOperation({
    summary: 'Create a new serviceSheets',
  })
  create(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createServiceSheetsSchema))
    createServiceSheetsDto: CreateServiceSheetsRequest,
  ): Promise<ServiceSheetsResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ServiceSheetsController.name,
      'create',
      'Creating new serviceSheets',
    );
    return this.application.create(ctx, createServiceSheetsDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all serviceSheetss',
  })
  @ApiOkResponse({
    description: 'All serviceSheetss',
    type: [ServiceSheetsResponse],
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
  ): Promise<ServiceSheetsPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ServiceSheetsController.name,
      'findAll',
      'Getting all serviceSheetss',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get serviceSheets by id',
  })
  @ApiOkResponse({
    description: 'ServiceSheets found',
    type: ServiceSheetsResponse,
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
      ServiceSheetsController.name,
      'findOne',
      'Getting serviceSheets',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'ServiceSheets updated',
    type: ServiceSheetsResponse,
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
  @ApiBody({ type: UpdateServiceSheetsRequest })
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateServiceSheetsSchema))
    updateServiceSheetsDto: UpdateServiceSheetsRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      ServiceSheetsController.name,
      'update',
      'Updating serviceSheets',
    );
    return this.application.update(ctx, id, updateServiceSheetsDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'ServiceSheets deleted' })
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
      ServiceSheetsController.name,
      'remove',
      'Deleting serviceSheets',
    );
    return this.application.delete(ctx, id);
  }
}
