import { Module } from '@nestjs/common';
import { NotificationsApplication } from './application/notifications.application';
import { DrizzleNotificationsRepository } from './infrastructure/notifications.repository';
import {
  NotificationsRepository,
  NotificationsUseCases,
} from './core/notifications.interface';
import { NotificationsController } from './infrastructure/notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: NotificationsRepository,
      useClass: DrizzleNotificationsRepository,
    },
    {
      provide: NotificationsUseCases,
      useClass: NotificationsApplication,
    },
  ],
})
export class NotificationsModule {}
