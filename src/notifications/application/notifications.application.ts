import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  NotificationsFilter,
  NotificationsRepository,
  NotificationsUseCases,
} from '../core/notifications.interface';
import {
  CreateNotificationsDto,
  UpdateNotificationsDto,
} from '../core/notifications.dto';
import { Notifications } from '../core/notifications.entity';
import { CreateDtoToNotifications } from '../infrastructure/notifications.mapper';
import { MailService } from '../core/mail.interface';

@Injectable()
export class NotificationsApplication implements NotificationsUseCases {
  constructor(
    @Inject(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    @Inject(MailService) private readonly mailService: MailService,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    this.logger.init(NotificationsApplication.name, 'info');
  }

  async create(
    ctx: Context,
    dto: CreateNotificationsDto,
  ): Promise<Notifications> {
    this.logger.info(
      ctx,
      NotificationsApplication.name,
      'create',
      'Creating new notifications',
    );
    const notifications = CreateDtoToNotifications(dto);
    const newNotifications = await this.repository.insert(ctx, notifications);
    if (!newNotifications) {
      throw new InternalErrorException(ctx, 'Notifications already exists');
    }
    return newNotifications;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: NotificationsFilter,
  ): Promise<{ data: Notifications[]; total: number }> {
    this.logger.info(
      ctx,
      NotificationsApplication.name,
      'getAll',
      'Getting all notificationss',
    );
    const result = await this.repository.getAll(ctx, limit, offset, filters);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<Notifications> {
    this.logger.info(
      ctx,
      NotificationsApplication.name,
      'getById',
      'Getting notifications',
    );
    const notifications = await this.repository.getById(ctx, id);
    if (!notifications) {
      throw new NotFoundException(ctx, 'Notifications not found');
    }
    return notifications;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateNotificationsDto,
  ): Promise<Notifications> {
    this.logger.info(
      ctx,
      NotificationsApplication.name,
      'update',
      'Updating notifications',
    );
    const notifications = await this.repository.getById(ctx, id);
    if (!notifications) {
      throw new NotFoundException(ctx, 'Notifications not found');
    }
    const updatedNotifications = new Notifications({
      ...notifications,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedNotifications);
    if (!updated) {
      throw new InternalErrorException(ctx, 'Notifications not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<Notifications> {
    this.logger.info(
      ctx,
      NotificationsApplication.name,
      'delete',
      'Deleting notifications',
    );
    const notifications = await this.repository.getById(ctx, id);
    if (!notifications) {
      throw new NotFoundException(ctx, 'Notifications not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'Notifications not deleted');
    }
    return deleted;
  }

  async sendTestEmail(ctx: Context, to: string): Promise<void> {
    this.logger.info(
      ctx,
      NotificationsApplication.name,
      'sendTestEmail',
      `Sending test email to ${to}`,
    );
    try {
      const subject = 'Test Email';
      const body = 'This is a test email from NotificationsApplication.';
      await this.mailService.sendMail(ctx, to, subject, body);
    } catch (error) {
      this.logger.error(
        ctx,
        NotificationsApplication.name,
        'sendTestEmail',
        `Failed to send test email to ${to}`,
        error,
      );
      throw new InternalErrorException(ctx, 'Failed to send test email');
    }
  }
}
