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
  CreateProjectRequest,
  ProjectPaginationResponse,
  ProjectResponse,
  UpdateProjectRequest,
} from './project.swagger';
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
import { ProjectUseCases } from '../core/project.interface';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly application: ProjectUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ description: 'Project created', type: ProjectResponse })
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
  @ApiBody({ type: CreateProjectRequest })
  @ApiOperation({
    summary: 'Create a new project',
  })
  create(
    @Req() req: Request,
    @Body() createProjectDto: CreateProjectRequest,
  ): Promise<ProjectResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ProjectController.name,
      'create',
      'Creating new project',
    );
    return this.application.create(ctx, createProjectDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all projects',
  })
  @ApiOkResponse({ description: 'All projects', type: [ProjectResponse] })
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
  ): Promise<ProjectPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ProjectController.name,
      'findAll',
      'Getting all projects',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get project by id',
  })
  @ApiOkResponse({ description: 'Project found', type: ProjectResponse })
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
      ProjectController.name,
      'findOne',
      'Getting project',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Project updated', type: ProjectResponse })
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
  @ApiBody({ type: UpdateProjectRequest })
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(ctx, ProjectController.name, 'update', 'Updating project');
    return this.application.update(ctx, id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Project deleted' })
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
    this.logger.info(ctx, ProjectController.name, 'remove', 'Deleting project');
    return this.application.delete(ctx, id);
  }
}
