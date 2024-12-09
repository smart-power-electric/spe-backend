import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILogger } from 'src/common/core/logger.interface';
import { AuthJwtService } from '../core/auth.jwt.interface';
import { Context } from 'src/common/core/context.entity';
import {
  JwtAccessTokenPayload,
  JwtRefreshTokenPayload,
  Sub,
} from '../core/auth.jwt.entity';
import { JwtConfig } from 'src/common/core/configuration.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtApplication implements AuthJwtService {
  private readonly SECRET: string = '1234';
  private readonly REFRESH_SECRET: string = '1234';
  private readonly SECRET_EXPIRATION: string = '15m';
  private readonly REFRESH_SECRET_EXPIRATION: string = '7d';

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(AuthJwtApplication.name, 'info');
    this.SECRET =
      this.configService.get<JwtConfig>('jwt')?.accessSecret ?? this.SECRET;
    this.REFRESH_SECRET =
      this.configService.get<JwtConfig>('jwt')?.refreshSecret ??
      this.REFRESH_SECRET;
    this.SECRET_EXPIRATION =
      this.configService.get<JwtConfig>('jwt')?.expirationRefreshToken ??
      this.SECRET_EXPIRATION;
    this.REFRESH_SECRET_EXPIRATION =
      this.configService.get<JwtConfig>('jwt')?.expirationToken ??
      this.REFRESH_SECRET_EXPIRATION;
  }
  async generateAccessToken(
    ctx: Context,
    user: Sub,
    roles: string[] | null,
    isImpersonation: boolean,
    customExpiration: string | null,
  ): Promise<{ token: string; expAt: number; expDate: Date }> {
    this.logger.info(
      ctx,
      AuthJwtApplication.name,
      'generateAccessToken',
      'Generating access token',
    );
    const payload: JwtAccessTokenPayload = {
      sub: user.id,
      email: user.email,
      roles,
      isImpersonation,
      iss: 'https://spe-api.cubantechsolutions.tech',
      aud: 'https://spe-fe.cubantechsolutions.tech',
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: customExpiration ?? this.SECRET,
      expiresIn: this.SECRET_EXPIRATION,
    });
    const expAt = JSON.parse(accessToken.split('.')[1]).exp;
    const expDate = new Date(expAt * 1000);

    return { token: accessToken, expAt, expDate };
  }
  async generateRefreshToken(
    ctx: Context,
    user: Sub,
  ): Promise<{ token: string; expAt: number; expDate: Date }> {
    this.logger.info(
      ctx,
      AuthJwtApplication.name,
      'generateRefreshToken',
      'Generating refresh token',
    );
    const payload: JwtRefreshTokenPayload = {
      sub: user.id,
      email: user.email,
      type: 'refresh',
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.REFRESH_SECRET_EXPIRATION,
      secret: this.REFRESH_SECRET,
    });

    const expAt = JSON.parse(refreshToken.split('.')[1]).exp;
    const expDate = new Date(expAt * 1000);

    return { token: refreshToken, expAt, expDate };
  }
  verifyRefreshToken(ctx: Context, refreshToken: string): Promise<Sub> {
    throw new Error('Method not implemented.');
  }
  verifyToken(ctx: Context, token: string | null): Promise<Sub> {
    throw new Error('Method not implemented.');
  }
}
