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
  CreateProjectRequest,
  ProjectPaginationResponse,
  ProjectResponse,
  UpdateProjectRequest,
} from './project.swagger';
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
import { ProjectUseCases } from '../core/project.interface';
import { ZodValidationPipe } from 'src/common/application/pipes/ZodValidationPipe';
import { createProjectSchema, UpdateProjectSchema } from '../core/project.zod';
import { ProjectKeys, ProjectKeysType } from '../core/project.entity';
import { CustomValidateEnumPipe } from 'src/common/application/pipes/CustomValidateEnumPipe';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectUseCases) private readonly application: ProjectUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ProjectController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Project created', type: ProjectResponse })
  @ApiBadRequestResponse({
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
  createProject(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createProjectSchema))
    createProjectDto: CreateProjectRequest,
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
  @ApiOkResponse({
    description: 'All projects',
    type: ProjectPaginationResponse,
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
  @ApiQuery({ name: 'clientId', required: false, type: String })
  @ApiQuery({ name: 'sortField', required: false, enum: ProjectKeys })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  findAllProject(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('clientId') clientId: string,
    @Query('sortField', new CustomValidateEnumPipe(ProjectKeys))
    sortField: ProjectKeysType,
    @Query('sortOrder', new CustomValidateEnumPipe(['ASC', 'DESC']))
    sortOrder: 'ASC' | 'DESC',
  ): Promise<ProjectPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      ProjectController.name,
      'findAll',
      'Getting all projects',
    );
    return this.application.getAll(ctx, limit, offset, {
      clientId,
      sortField,
      sortOrder,
    });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get project by id',
  })
  @ApiOkResponse({ description: 'Project found', type: ProjectResponse })
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
  findOneProject(@Req() req: Request, @Param('id') id: string) {
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
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProjectRequest })
  updateProject(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateProjectSchema))
    updateProjectDto: UpdateProjectRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(ctx, ProjectController.name, 'update', 'Updating project');
    return this.application.update(ctx, id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Project deleted' })
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
  removeProject(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(ctx, ProjectController.name, 'remove', 'Deleting project');
    return this.application.delete(ctx, id);
  }
}
