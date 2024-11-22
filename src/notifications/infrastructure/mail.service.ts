import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { MailService } from '../core/mail.interface';

@Injectable()
export class NodeMailService implements MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(NodeMailService.name, 'info');
  }

  async sendMail(ctx: Context, to: string, subject: string, body: string) {
    this.logger.info(ctx, NodeMailService.name, 'sendMail', 'Sending email');
    await this.mailerService.sendMail({
      to, // Destinatario
      subject, // Asunto
      //text, // Texto plano
      html: body, // Opcional
    });
  }
}
