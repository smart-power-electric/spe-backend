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

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly application: InvoicesUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOkResponse({
    description: 'Invoices created',
    type: InvoicesResponse,
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
  @ApiBody({ type: CreateInvoicesRequest })
  @ApiOperation({
    summary: 'Create a new invoices',
  })
  create(
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
    type: [InvoicesResponse],
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
  ): Promise<InvoicesPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      InvoicesController.name,
      'findAll',
      'Getting all invoicess',
    );
    return this.application.getAll(ctx, limit, offset);
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
  @ApiBody({ type: UpdateInvoicesRequest })
  update(
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
  @HttpCode(204)
  @ApiOkResponse({ description: 'Invoices deleted' })
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
      InvoicesController.name,
      'remove',
      'Deleting invoices',
    );
    return this.application.delete(ctx, id);
  }
}
