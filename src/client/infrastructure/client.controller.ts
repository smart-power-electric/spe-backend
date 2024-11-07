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
import { ClientUseCases } from '../core/client.interface';
import { ILogger } from 'src/common/core/logger.interface';
import {
  ClientPaginationResponse,
  ClientResponse,
  CreateClientRequest,
  UpdateClientRequest,
} from './client.swagger';
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

@Controller('client')
export class ClientController {
  constructor(
    private readonly application: ClientUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ description: 'Client created', type: ClientResponse })
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
  @ApiBody({ type: CreateClientRequest })
  @ApiOperation({
    summary: 'Create a new client',
  })
  create(
    @Req() req: Request,
    @Body() createClientDto: CreateClientRequest,
  ): Promise<ClientResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ClientController.name,
      'create',
      'Creating new client',
    );
    return this.application.create(ctx, createClientDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all clients',
  })
  @ApiOkResponse({ description: 'All clients', type: [ClientResponse] })
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
  ): Promise<ClientPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ClientController.name,
      'findAll',
      'Getting all clients',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get client by id',
  })
  @ApiOkResponse({ description: 'Client found', type: ClientResponse })
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
      ClientController.name,
      'findOne',
      'Getting client',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Client updated', type: ClientResponse })
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
  @ApiBody({ type: UpdateClientRequest })
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(ctx, ClientController.name, 'update', 'Updating client');
    return this.application.update(ctx, id, updateClientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Client deleted' })
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
    this.logger.info(ctx, ClientController.name, 'remove', 'Deleting client');
    return this.application.delete(ctx, id);
  }
}
