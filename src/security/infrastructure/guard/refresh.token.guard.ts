import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtConfig } from 'src/common/core/configuration.entity';
import { ForbiddenException } from 'src/common/core/exception';
import { ILogger } from 'src/common/core/logger.interface';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  refreshSecret: string = 'secret';
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(RefreshTokenGuard.name, 'info');
    this.refreshSecret =
      this.configService.get<JwtConfig>('jwt')?.refreshSecret ??
      this.refreshSecret;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.error(request.appContext, 'Refresh token not found');
      throw new ForbiddenException(null, 'Refresh access token');
    }
    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.refreshSecret,
      });
    } catch {
      this.logger.error(request.appContext, 'Failed to verify refresh token');
      throw new ForbiddenException(null, 'Invalid refresh token');
    }
    this.logger.info(request.appContext, 'Refresh token verified');
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
