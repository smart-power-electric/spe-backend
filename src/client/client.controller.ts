import { Controller, Inject, Get, Req, Query, Post, Body } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags, ApiOperation, ApiOkResponse, ApiQuery, ApiBody } from "@nestjs/swagger";
import { ILogger } from "src/commons/logging/logger.interface";
import { ClientDto, ClientFilterQuery, CreateClientRequest } from "src/infrastructure/dtos/client.dto";
import { Pagination } from "src/infrastructure/dtos/pagination.dto";
import { Request } from "express";
import { GetAllClientQuery } from "./queries/get-all-client.query";
import { CreateClientCommand } from "./commands/create-client.command";

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
  @ApiQuery({ name: 'offset', type: Number, required: false, description: 'Default value: 0' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Default value: 20' })
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
    return this.queryBus.execute(new GetAllClientQuery(ctx, queryParams, offset, limit));
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
    async createClient(
        @Req() req: Request,
        @Body() body: CreateClientRequest,
    ): Promise<ClientDto> {
        const ctx = req.appContext;
        this.logger.info(
            ctx,
            `${ClientController.name}.create`,
            `queryParams: ${JSON.stringify(body)}`,
        );
        return this.commandBus.execute(new CreateClientCommand(ctx, body));
    }
}