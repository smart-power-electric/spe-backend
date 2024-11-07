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
import { ProjectDto, ProjectFilterQuery, CreateProjectRequest } from 'src/infrastructure/dtos/project.dto';
import { CreateProjectCommand } from './commands/create-project.command';
import { DeleteProjectCommand } from './commands/delete-project.command';
import { UpdateProjectCommand } from './commands/update-project.command';
import { GetAllProjectQuery } from './queries/get-all-project.query';
import { GetProjectQuery } from './queries/get-project.query';
import { createProjectSchema, updateProjectSchema } from 'src/infrastructure/validators/project.zod';
  
  @Controller('projects')
  @ApiTags('Project')
  export class ProjectController {
    constructor(
      @Inject(ILogger) private readonly logger: ILogger,
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {
      this.logger.init(ProjectController.name, 'info');
    }
  
    @Get()
    @ApiOperation({
      summary:
        'Get the paginated list of Projects. The default limit is 20 and the default offset is 0.',
    })
    @ApiOkResponse({
      description: 'List of Projects',
      type: Pagination<ProjectDto>,
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
    async findAllProject(
      @Req() req: Request,
      @Query() queryParams: ProjectFilterQuery,
      @Query('offset') offset: number = 0,
      @Query('limit') limit: number = 20,
    ): Promise<Pagination<ProjectDto>> {
      const ctx = req.appContext;
      this.logger.info(
        ctx,
        `${ProjectController.name}.findAll`,
        `queryParams: ${JSON.stringify(queryParams)}`,
      );
      return this.queryBus.execute(
        new GetAllProjectQuery(ctx, queryParams, offset, limit),
      );
    }
  
    @Post()
    @ApiOperation({
      summary: 'Create a new Project',
    })
    @ApiOkResponse({
      description: 'Project created',
      type: ProjectDto,
    })
    @ApiBody({ type: CreateProjectRequest, description: 'Project data' })
    @ApiBadRequestResponse({
      description: 'Invalid query parameters',
      type: ErrorFormat,
    })
    async createProject(
      @Req() req: Request,
      @Body(new ZodValidationPipe(createProjectSchema)) body: CreateProjectRequest,
    ): Promise<ProjectDto> {
      const ctx = req.appContext;
      this.logger.info(
        ctx,
        `${ProjectController.name}.create`,
        `queryParams: ${JSON.stringify(body)}`,
      );
      return this.commandBus.execute(new CreateProjectCommand(ctx, body));
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Get a Project by id',
    })
    @ApiOkResponse({
      description: 'Project found',
      type: ProjectDto,
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Project id',
    })
    @ApiBadRequestResponse({
      description: 'Invalid query parameters',
      type: ErrorFormat,
    })
    async findProjectById(
      @Req() req: Request,
      @Param('id') id: number,
    ): Promise<ProjectDto> {
      const ctx = req.appContext;
      this.logger.info(ctx, `${ProjectController.name}.findById`, `id: ${id}`);
      return this.queryBus.execute(new GetProjectQuery(ctx, id));
    }
  
    @Patch(':id')
    @ApiOperation({
      summary: 'Update a Project by id',
    })
    @ApiOkResponse({
      description: 'Project updated',
      type: ProjectDto,
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Project id',
    })
    @ApiBody({ type: CreateProjectRequest, description: 'Project data' })
    @ApiBadRequestResponse({
      description: 'Invalid parameters',
      type: ErrorFormat,
    })
    async updateProject(
      @Req() req: Request,
      @Param('id') id: number,
      @Body(new ZodValidationPipe(updateProjectSchema)) body: CreateProjectRequest,
    ): Promise<ProjectDto> {
      const ctx = req.appContext;
      this.logger.info(
        ctx,
        `${ProjectController.name}.updateById`,
        `id: ${id}, body: ${JSON.stringify(body)}`,
      );
      return this.commandBus.execute(new UpdateProjectCommand(ctx, id, body));
    }
  
    @Delete(':id')
    @ApiOperation({
      summary: 'Delete a Project by id',
    })
    @ApiOkResponse({
      description: 'Project deleted',
      type: ProjectDto,
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Project id',
    })
    @ApiBadRequestResponse({
      description: 'Invalid parameters',
      type: ErrorFormat,
    })
    async deleteProject(
      @Req() req: Request,
      @Param('id') id: number,
    ): Promise<ProjectDto> {
      const ctx = req.appContext;
      this.logger.info(ctx, `${ProjectController.name}.deleteById`, `id: ${id}`);
      return this.commandBus.execute(new DeleteProjectCommand(ctx, id));
    }
  }
  