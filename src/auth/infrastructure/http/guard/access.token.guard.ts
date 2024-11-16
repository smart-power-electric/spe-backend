import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ILogger } from 'src/common/core/logger.interface';
import { JwtConfig } from 'src/common/core/configuration.entity';
import { IMPERSONATE_PROTECT_KEY } from '../decorator/auth.decorator';
import { Context } from 'src/common/core/context.entity';
import { UserRepository } from 'src/auth/core/user.interface';
import {
  ForbiddenException,
  NotAuthorizedException,
} from 'src/common/core/exception';
import { JwtAccessTokenPayload } from 'src/security/core/auth.jwt.entity';
import { RoleRepository } from 'src/auth/core/role.interface';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { RoleEnum } from 'src/auth/core/role.entity';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  secret: string = 'secret';
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userrepo: UserRepository,
    private readonly rolerepo: RoleRepository,
    private readonly reflector: Reflector,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(AccessTokenGuard.name, 'info');
    this.secret =
      this.configService.get<JwtConfig>('jwt')?.accessSecret ?? this.secret;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const isImpersonateProtected = this.reflector.getAllAndOverride<
      boolean | null
    >(IMPERSONATE_PROTECT_KEY, [context.getHandler(), context.getClass()]);

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const payload = await this.validateToken(request.appContext, token);
    request.appContext.payload = payload;
    request.appContext.isImpersonated = payload.isImpersonation;

    if (request.appContext.isImpersonated && isImpersonateProtected) {
      throw new ForbiddenException(null, 'Impersonation is not allowed');
    }

    const userInfo = await this.getUserInfo(request.appContext, payload.email);
    if (!userInfo) {
      this.logger.error(request.appContext, 'User not found');
      throw new NotAuthorizedException(null, 'User not found');
    }
    const roles = await this.rolerepo.getRolesByUserId(
      request.appContext,
      userInfo.id,
    );
    request.appContext.user = {
      userId: userInfo.id,
      email: userInfo.username,
      name: userInfo.fullname,
      roles: roles.map((role) => role.role),
    };

    request.appContext.roles = [...new Set(roles.map((role) => role.role))];

    if (!requiredRoles) return true;

    const isAuthorized: boolean =
      requiredRoles.find((x) => request.appContext.roles.includes(x)) !==
        undefined || request.appContext.roles.includes(RoleEnum.admin);

    return isAuthorized;
  }

  private async validateToken(ctx: Context, token: string | null) {
    if (!token) {
      this.logger.error(ctx, 'Access token not found');
      throw new NotAuthorizedException(null, 'Access token not found');
    }
    try {
      const payload: JwtAccessTokenPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.secret,
        },
      );

      return payload;
    } catch {
      this.logger.error(ctx, 'Failed to verify access token');
      throw new NotAuthorizedException(null, 'Invalid access token');
    }
  }

  private async getUserInfo(ctx: Context, email: string) {
    try {
      return await this.userrepo.getByUsername(ctx, email);
    } catch (error) {
      this.logger.error(ctx, 'Failed to get user info');
      throw new NotAuthorizedException(null, 'Invalid user info');
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}
