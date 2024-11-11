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
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ApplicationExceptionResponse } from 'src/common/infrastructure/http/exception/http.swagger';
import { ZodValidationPipe } from 'src/common/application/pipes/ZodValidationPipe';
import { createClientSchema, UpdateClientSchema } from '../core/client.zod';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(
    @Inject(ClientUseCases) private readonly application: ClientUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ClientController.name, 'info');
  }

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
  createClient(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createClientSchema))
    createClientDto: CreateClientRequest,
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
  @ApiOkResponse({ description: 'All clients', type: ClientPaginationResponse })
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
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  findAllClient(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('name') name: string,
    @Query('email') email: string,
  ): Promise<ClientPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ClientController.name,
      'findAll',
      'Getting all clients',
    );
    return this.application.getAll(ctx, limit, offset, { name, email });
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
  @ApiParam({ name: 'id', type: String })
  findOneClient(@Req() req: Request, @Param('id') id: string) {
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
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateClientRequest })
  updateClient(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateClientSchema))
    updateClientDto: UpdateClientRequest,
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
  @ApiParam({ name: 'id', type: String })
  removeClient(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(ctx, ClientController.name, 'remove', 'Deleting client');
    return this.application.delete(ctx, id);
  }
}
