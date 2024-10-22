import {
  Controller,
  Inject,
  Get,
  Req,
  Query,
  Post,
  Body,
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
import { Pagination } from 'src/infrastructure/dtos/pagination.dto';
import { Request } from 'express';
import { ZodValidationPipe } from 'src/commons/pipes/ZodValidationPipe';
import { ErrorFormat } from 'src/commons/http-exception/Error.entity';
import { CreateServiceRequest, ServiceDto, ServiceFilterQuery } from 'src/infrastructure/dtos/service.dto';
import { GetAllServiceQuery } from './queries/get-all-service.query';
import { createServiceSchema, updateServiceSchema } from 'src/infrastructure/validators/service.zod';
import { CreateServiceCommand } from './commands/create-service.command';
import { GetServiceQuery } from './queries/get-service.query';
import { UpdateServiceCommand } from './commands/update-service.command';
import { DeleteServiceCommand } from './commands/delete-service.command';

@Controller('services')
@ApiTags('Service')
export class ServiceController {
  constructor(
    @Inject(ILogger) private readonly logger: ILogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    this.logger.init(ServiceController.name, 'info');
  }

  @Get()
  @ApiOperation({
    summary:
      'Get the paginated list of services. The default limit is 20 and the default offset is 0.',
  })
  @ApiOkResponse({
    description: 'List of services',
    type: Pagination<ServiceDto>,
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
  async findAllService(
    @Req() req: Request,
    @Query() queryParams: ServiceFilterQuery,
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 20,
  ): Promise<Pagination<ServiceDto>> {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      `${ServiceController.name}.findAll`,
      `queryParams: ${JSON.stringify(queryParams)}`,
    );
    return this.queryBus.execute(
      new GetAllServiceQuery(ctx, queryParams, offset, limit),
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new service',
  })
  @ApiOkResponse({
    description: 'Service created',
    type: ServiceDto,
  })
  @ApiBody({ type: CreateServiceRequest, description: 'Service data' })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    type: ErrorFormat,
  })
  async createService(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createServiceSchema)) body: CreateServiceRequest,
  ): Promise<ServiceDto> {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      `${ServiceController.name}.create`,
      `queryParams: ${JSON.stringify(body)}`,
    );
    return this.commandBus.execute(new CreateServiceCommand(ctx, body));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a service by id',
  })
  @ApiOkResponse({
    description: 'Service found',
    type: ServiceDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Service id',
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    type: ErrorFormat,
  })
  async findServiceById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<ServiceDto> {
    const ctx = req.appContext;
    this.logger.info(ctx, `${ServiceController.name}.findById`, `id: ${id}`);
    return this.queryBus.execute(new GetServiceQuery(ctx, id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a service by id',
  })
  @ApiOkResponse({
    description: 'Service updated',
    type: ServiceDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Service id',
  })
  @ApiBody({ type: CreateServiceRequest, description: 'Service data' })
  @ApiBadRequestResponse({
    description: 'Invalid parameters',
    type: ErrorFormat,
  })
  async updateClien(
    @Req() req: Request,
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateServiceSchema)) body: CreateServiceRequest,
  ): Promise<ServiceDto> {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      `${ServiceController.name}.updateById`,
      `id: ${id}, body: ${JSON.stringify(body)}`,
    );
    return this.commandBus.execute(new UpdateServiceCommand(ctx, id, body));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a service by id',
  })
  @ApiOkResponse({
    description: 'Service deleted',
    type: ServiceDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Service id',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameters',
    type: ErrorFormat,
  })
  async deleteService(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<ServiceDto> {
    const ctx = req.appContext;
    this.logger.info(ctx, `${ServiceController.name}.deleteById`, `id: ${id}`);
    return this.commandBus.execute(new DeleteServiceCommand(ctx, id));
  }
}
