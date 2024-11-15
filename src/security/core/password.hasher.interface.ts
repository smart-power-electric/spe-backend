import { Context } from 'src/common/core/context.entity';

export interface PasswordHasherService {
  hashPassword(ctx: Context, password: string): Promise<string>;
  comparePassword(
    ctx: Context,
    provided: string,
    stored: string,
  ): Promise<boolean>;
}

export const PasswordHasherService = Symbol('PasswordHasherService');
