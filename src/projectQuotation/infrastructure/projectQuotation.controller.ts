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
import { ProjectQuotationUseCases } from '../core/projectQuotation.interface';
import {
  CreateProjectQuotationRequest,
  ProjectQuotationPaginationResponse,
  ProjectQuotationResponse,
  UpdateProjectQuotationRequest,
} from './projectQuotation.swagger';
import {
  createProjectQuotationSchema,
  UpdateProjectQuotationSchema,
} from '../core/projectQuotation.zod';

@ApiTags('projectQuotation')
@Controller('project-quotation')
export class ProjectQuotationController {
  constructor(
    @Inject(ProjectQuotationUseCases)
    private readonly application: ProjectQuotationUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ProjectQuotationController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({
    description: 'ProjectQuotation created',
    type: ProjectQuotationResponse,
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
  @ApiBody({ type: CreateProjectQuotationRequest })
  @ApiOperation({
    summary: 'Create a new projectQuotation',
  })
  createProjectQuotation(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createProjectQuotationSchema))
    createProjectQuotationDto: CreateProjectQuotationRequest,
  ): Promise<ProjectQuotationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ProjectQuotationController.name,
      'create',
      'Creating new projectQuotation',
    );
    return this.application.create(ctx, createProjectQuotationDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all projectQuotations',
  })
  @ApiOkResponse({
    description: 'All projectQuotations',
    type: [ProjectQuotationResponse],
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
  findAllProjectQuotation(
    @Req() req: Request,
    @Param('limit') limit: number,
    @Param('offset') offset: number,
  ): Promise<ProjectQuotationPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ProjectQuotationController.name,
      'findAll',
      'Getting all projectQuotations',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get projectQuotation by id',
  })
  @ApiOkResponse({
    description: 'ProjectQuotation found',
    type: ProjectQuotationResponse,
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
  findOneProjectQuotation(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ProjectQuotationController.name,
      'findOne',
      'Getting projectQuotation',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'ProjectQuotation updated',
    type: ProjectQuotationResponse,
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
  @ApiBody({ type: UpdateProjectQuotationRequest })
  updateProjectQuotation(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateProjectQuotationSchema))
    updateProjectQuotationDto: UpdateProjectQuotationRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      ProjectQuotationController.name,
      'update',
      'Updating projectQuotation',
    );
    return this.application.update(ctx, id, updateProjectQuotationDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'ProjectQuotation deleted' })
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
  removeProjectQuotation(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      ProjectQuotationController.name,
      'remove',
      'Deleting projectQuotation',
    );
    return this.application.delete(ctx, id);
  }
}
