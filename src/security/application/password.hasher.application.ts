import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { PasswordHasherService } from '../core/password.hasher.interface';
import { Context } from 'src/common/core/context.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherApplication implements PasswordHasherService {
  private readonly SALT_ROUNDS = 10;

  constructor(@Inject(ILogger) private readonly logger: ILogger) {
    this.logger.init(PasswordHasherApplication.name, 'info');
  }
  async hashPassword(ctx: Context, password: string): Promise<string> {
    this.logger.info(
      ctx,
      PasswordHasherApplication.name,
      'hashPassword',
      'Hashing password',
    );
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }
  async comparePassword(
    ctx: Context,
    provided: string,
    stored: string,
  ): Promise<boolean> {
    this.logger.info(
      ctx,
      PasswordHasherApplication.name,
      'comparePassword',
      'Comparing passwords',
    );
    return await bcrypt.compare(provided, stored);
  }
}
