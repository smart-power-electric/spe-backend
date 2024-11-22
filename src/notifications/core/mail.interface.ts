import { Context } from 'src/common/core/context.entity';

export interface MailService {
  sendMail(
    ctx: Context,
    to: string,
    subject: string,
    body: string,
  ): Promise<void>;
}

export const MailService = Symbol('MailService');
