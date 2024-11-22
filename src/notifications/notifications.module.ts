import { Module } from '@nestjs/common';
import { NotificationsApplication } from './application/notifications.application';
import { DrizzleNotificationsRepository } from './infrastructure/notifications.repository';
import {
  NotificationsRepository,
  NotificationsUseCases,
} from './core/notifications.interface';
import { NotificationsController } from './infrastructure/notifications.controller';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../common/application/application-config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './core/mail.interface';
import { NodeMailService } from './infrastructure/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CommonModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Usar SSL
        auth: {
          user: process.env.EMAIL_SENDER_EMAIL, // Tu correo Gmail
          pass: process.env.EMAIL_SENDER_PASSWORD, // Contraseña de aplicación
        },
      },
      defaults: {
        from: `"${process.env.EMAIL_SENDER_NAME}" ${process.env.EMAIL_SENDER_EMAIL}>`, // Remitente por defecto
      },
    }),
  ],
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
    {
      provide: MailService,
      useClass: NodeMailService,
    },
  ],
})
export class NotificationsModule {}
