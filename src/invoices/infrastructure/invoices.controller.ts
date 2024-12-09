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
import { InvoicesUseCases } from '../core/invoices.interface';
import {
  CreateInvoicesRequest,
  UpdateInvoicesRequest,
  InvoicesPaginationResponse,
  InvoicesResponse,
} from './invoices.swagger';
import {
  createInvoicesSchema,
  UpdateInvoicesSchema,
} from '../core/invoices.zod';
import { CustomValidateEnumPipe } from 'src/common/application/pipes/CustomValidateEnumPipe';
import { InvoicesKeys, InvoicesKeysType } from '../core/invoices.entity';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(
    @Inject(InvoicesUseCases) private readonly application: InvoicesUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(InvoicesController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Invoices created',
    type: InvoicesResponse,
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
  @ApiBody({ type: CreateInvoicesRequest })
  @ApiOperation({
    summary: 'Create a new invoices',
  })
  createInvoice(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createInvoicesSchema))
    createInvoicesDto: CreateInvoicesRequest,
  ): Promise<InvoicesResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      InvoicesController.name,
      'create',
      'Creating new invoices',
    );
    return this.application.create(ctx, createInvoicesDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all invoicess',
  })
  @ApiOkResponse({
    description: 'All invoicess',
    type: InvoicesPaginationResponse,
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
  @ApiQuery({ name: 'stageId', required: false, type: String })
  @ApiQuery({ name: 'sortField', required: false, enum: InvoicesKeys })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  findAllInvoice(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('stageId') stageId: string,
    @Query('sortField', new CustomValidateEnumPipe(InvoicesKeys))
    sortField: InvoicesKeysType,
    @Query('sortOrder', new CustomValidateEnumPipe(['ASC', 'DESC']))
    sortOrder: 'ASC' | 'DESC',
  ): Promise<InvoicesPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      InvoicesController.name,
      'findAll',
      'Getting all invoicess',
    );
    return this.application.getAll(ctx, limit, offset, {
      stageId,
      sortField,
      sortOrder,
    });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get invoices by id',
  })
  @ApiOkResponse({
    description: 'Invoices found',
    type: InvoicesResponse,
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
  findOneInvoice(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      InvoicesController.name,
      'findOne',
      'Getting invoices',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Invoices updated',
    type: InvoicesResponse,
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
  @ApiBody({ type: UpdateInvoicesRequest })
  updateInvoice(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateInvoicesSchema))
    updateInvoicesDto: UpdateInvoicesRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      InvoicesController.name,
      'update',
      'Updating invoices',
    );
    return this.application.update(ctx, id, updateInvoicesDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Invoices deleted' })
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
  removeInvoice(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      InvoicesController.name,
      'remove',
      'Deleting invoices',
    );
    return this.application.delete(ctx, id);
  }
}
