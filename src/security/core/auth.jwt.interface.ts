import { Context } from 'src/common/core/context.entity';
import { Sub } from './auth.jwt.entity';

export interface AuthJwtService {
  generateAccessToken(
    ctx: Context,
    user: Sub,
    role: string[] | null,
    isImpersonation: boolean,
    customExpiration: string | null,
  ): Promise<{ token: string; expAt: number; expDate: Date }>;
  generateRefreshToken(
    ctx: Context,
    user: Sub,
  ): Promise<{ token: string; expAt: number; expDate: Date }>;
  verifyRefreshToken(ctx: Context, refreshToken: string): Promise<Sub>;
  verifyToken(ctx: Context, token: string | null): Promise<Sub>;
}

export const AuthJwtService = Symbol('AuthJwtService');
