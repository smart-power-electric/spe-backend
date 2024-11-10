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
import { NotificationsUseCases } from '../core/notifications.interface';
import {
  CreateNotificationsRequest,
  UpdateNotificationsRequest,
  NotificationsPaginationResponse,
  NotificationsResponse,
} from './notifications.swagger';
import {
  createNotificationsSchema,
  UpdateNotificationsSchema,
} from '../core/notifications.zod';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly application: NotificationsUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(NotificationsController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({
    description: 'Notifications created',
    type: NotificationsResponse,
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
  @ApiBody({ type: CreateNotificationsRequest })
  @ApiOperation({
    summary: 'Create a new notifications',
  })
  createNotification(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createNotificationsSchema))
    createNotificationsDto: CreateNotificationsRequest,
  ): Promise<NotificationsResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      NotificationsController.name,
      'create',
      'Creating new notifications',
    );
    return this.application.create(ctx, createNotificationsDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all notificationss',
  })
  @ApiOkResponse({
    description: 'All notificationss',
    type: [NotificationsResponse],
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
  findAllNotification(
    @Req() req: Request,
    @Param('limit') limit: number,
    @Param('offset') offset: number,
  ): Promise<NotificationsPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      NotificationsController.name,
      'findAll',
      'Getting all notificationss',
    );
    return this.application.getAll(ctx, limit, offset);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get notifications by id',
  })
  @ApiOkResponse({
    description: 'Notifications found',
    type: NotificationsResponse,
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
  findOneNotification(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      NotificationsController.name,
      'findOne',
      'Getting notifications',
    );
    return this.application.getById(ctx, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Notifications updated',
    type: NotificationsResponse,
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
  @ApiBody({ type: UpdateNotificationsRequest })
  updateNotification(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateNotificationsSchema))
    updateNotificationsDto: UpdateNotificationsRequest,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      NotificationsController.name,
      'update',
      'Updating notifications',
    );
    return this.application.update(ctx, id, updateNotificationsDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Notifications deleted' })
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
  removeNotification(@Req() req: Request, @Param('id') id: string) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      NotificationsController.name,
      'remove',
      'Deleting notifications',
    );
    return this.application.delete(ctx, id);
  }
}
