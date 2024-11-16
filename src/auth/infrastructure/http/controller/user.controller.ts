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
import { UserUseCases } from '../../../core/user.interface';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserPaginationResponse,
  UserResponse,
} from '../../user.swagger';
import { createUserSchema, UpdateUserSchema } from '../../../core/user.zod';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUseCases)
    private readonly application: UserUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(UserController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({
    description: 'User created',
    type: UserResponse,
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
  @ApiBody({ type: CreateUserRequest })
  @ApiOperation({
    summary: 'Create a new user',
  })
  createUser(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createUserSchema))
    createUserDto: CreateUserRequest,
  ): Promise<UserResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      UserController.name,
      'create',
      'Creating new user',
    );
    return this.application.create(ctx, createUserDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiOkResponse({
    description: 'All users',
    type: UserPaginationResponse,
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
  @ApiQuery({ name: 'search', required: false, type: String })
  findAllUser(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('search') search: string,
  ): Promise<UserPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      UserController.name,
      'findAll',
      'Getting all users',
    );
    return this.application.getAll(ctx, limit, offset, { search });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiOkResponse({
    description: 'User found',
    type: UserResponse,
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
  @ApiParam({ name: 'id', type: String })
  findOneUser(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      UserController.name,
      'findOne',
      'Getting user',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User updated',
    type: UserResponse,
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
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateUserRequest })
  updateUser(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserSchema))
    updateUserDto: UpdateUserRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(ctx, UserController.name, 'update', 'Updating user');
    return this.application.update(ctx, id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'User deleted' })
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
  removeUser(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(ctx, UserController.name, 'remove', 'Deleting user');
    return this.application.delete(ctx, id);
  }
}
