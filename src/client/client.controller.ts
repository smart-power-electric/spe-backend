import {
  Controller,
  Inject,
  Get,
  Req,
  Query,
  Post,
  Body,
  ParseIntPipe,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
  ApiBody,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ILogger } from 'src/commons/logging/logger.interface';
import {
  ClientDto,
  ClientFilterQuery,
  CreateClientRequest,
} from 'src/infrastructure/dtos/client.dto';
import { Pagination } from 'src/infrastructure/dtos/pagination.dto';
import { Request } from 'express';
import { GetAllClientQuery } from './queries/get-all-client.query';
import { CreateClientCommand } from './commands/create-client.command';
import { createClientSchema, updateClientSchema } from 'src/infrastructure/validators/client.zod';
import { ZodValidationPipe } from 'src/commons/pipes/ZodValidationPipe';
import { ErrorFormat } from 'src/commons/http-exception/Error.entity';
import { GetClientQuery } from './queries/get-client.query';
import { UpdateClientCommand } from './commands/update-client.command';
import { DeleteClientCommand } from './commands/delete-client.command';

@Controller('clients')
@ApiTags('Client')
export class ClientController {
  constructor(
    @Inject(ILogger) private readonly logger: ILogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    this.logger.init(ClientController.name, 'info');
  }

  @Get()
  @ApiOperation({
    summary:
      'Get the paginated list of clients. The default limit is 20 and the default offset is 0.',
  })
  @ApiOkResponse({
    description: 'List of clients',
    type: Pagination<ClientDto>,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Default value: 0',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Default value: 20',
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    type: ErrorFormat,
  })
  async findAllClient(
    @Req() req: Request,
    @Query() queryParams: ClientFilterQuery,
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 20,
  ): Promise<Pagination<ClientDto>> {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      `${ClientController.name}.findAll`,
      `queryParams: ${JSON.stringify(queryParams)}`,
    );
    return this.queryBus.execute(
      new GetAllClientQuery(ctx, queryParams, offset, limit),
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new client',
  })
  @ApiOkResponse({
    description: 'Client created',
    type: ClientDto,
  })
  @ApiBody({ type: CreateClientRequest, description: 'Client data' })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    type: ErrorFormat,
  })
  async createClient(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createClientSchema)) body: CreateClientRequest,
  ): Promise<ClientDto> {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      `${ClientController.name}.create`,
      `queryParams: ${JSON.stringify(body)}`,
    );
    return this.commandBus.execute(new CreateClientCommand(ctx, body));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a client by id',
  })
  @ApiOkResponse({
    description: 'Client found',
    type: ClientDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Client id',
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    type: ErrorFormat,
  })
  async findClientById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<ClientDto> {
    const ctx = req.appContext;
    this.logger.info(ctx, `${ClientController.name}.findById`, `id: ${id}`);
    return this.queryBus.execute(new GetClientQuery(ctx, id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a client by id',
  })
  @ApiOkResponse({
    description: 'Client updated',
    type: ClientDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Client id',
  })
  @ApiBody({ type: CreateClientRequest, description: 'Client data' })
  @ApiBadRequestResponse({
    description: 'Invalid parameters',
    type: ErrorFormat,
  })
  async updateClientById(
    @Req() req: Request,
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateClientSchema)) body: CreateClientRequest,
  ): Promise<ClientDto> {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      `${ClientController.name}.updateById`,
      `id: ${id}, body: ${JSON.stringify(body)}`,
    );
    return this.commandBus.execute(new UpdateClientCommand(ctx, id, body));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a client by id',
  })
  @ApiOkResponse({
    description: 'Client deleted',
    type: ClientDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Client id',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameters',
    type: ErrorFormat,
  })
  async deleteClientById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<ClientDto> {
    const ctx = req.appContext;
    this.logger.info(ctx, `${ClientController.name}.deleteById`, `id: ${id}`);
    return this.commandBus.execute(new DeleteClientCommand(ctx, id));
  }
}
