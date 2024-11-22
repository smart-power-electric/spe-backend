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
  EmailTestSchema,
  UpdateNotificationsSchema,
} from '../core/notifications.zod';
import {
  NotificationsKeys,
  NotificationsKeysType,
} from '../core/notifications.entity';
import { CustomValidateEnumPipe } from 'src/common/application/pipes/CustomValidateEnumPipe';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    @Inject(NotificationsUseCases)
    private readonly application: NotificationsUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(NotificationsController.name, 'info');
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Notifications created',
    type: NotificationsResponse,
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
    type: NotificationsPaginationResponse,
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
  @ApiQuery({ name: 'invoiceId', required: false, type: String })
  @ApiQuery({ name: 'sortField', required: false, enum: NotificationsKeys })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  findAllNotification(
    @Req() req: Request,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('sortField', new CustomValidateEnumPipe(NotificationsKeys))
    sortField: NotificationsKeysType,
    @Query('sortOrder', new CustomValidateEnumPipe(['ASC', 'DESC']))
    sortOrder: 'ASC' | 'DESC',
    @Query('clientId') clientId: string,
    @Query('invoiceId') invoiceId: string,
  ): Promise<NotificationsPaginationResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      NotificationsController.name,
      'findAll',
      'Getting all notificationss',
    );
    return this.application.getAll(ctx, limit, offset, {
      clientId,
      invoiceId,
      sortField,
      sortOrder,
    });
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
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: String })
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
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'id', type: String })
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
  @HttpCode(200)
  @ApiOkResponse({ description: 'Notifications deleted' })
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

  @Post('email-test/:to')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Email sent' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiParam({ name: 'to', type: String })
  sendTestEmail(
    @Req() req: Request,
    @Param('to', new ZodValidationPipe(EmailTestSchema)) to: string,
  ) {
    const ctx = req.appContext;
    this.logger.info(
      ctx,
      NotificationsController.name,
      'sendTestEmail',
      `Sending test email to ${to}`,
    );
    return this.application.sendTestEmail(ctx, to);
  }
}
