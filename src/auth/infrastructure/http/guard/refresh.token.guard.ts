import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtConfig } from '../../common/application-config/configuration.entity';
import { ILogger } from '../../common/logging/logger.interface';
import { PlatformError } from '../../common/http-exception/Error.entity';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  secret: string = 'secret';
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(RefreshTokenGuard.name, 'info');
    this.secret = this.configService.get<JwtConfig>('jwt')?.refreshSecret ?? this.secret;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.error(request.appContext, 'Refresh token not found');
      throw PlatformError.Unauthorized('Refresh access token');
    }
    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.secret,
      });
    } catch {
      this.logger.error(request.appContext, 'Failed to verify refresh token');
      throw PlatformError.Unauthorized('Invalid refresh token');
    }
    this.logger.info(request.appContext, 'Refresh token verified');
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
