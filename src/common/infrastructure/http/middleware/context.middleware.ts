import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserLoginInfo } from 'src/common/core/context.entity';

@Injectable()
export class AppContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userInfo: UserLoginInfo | null = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = req.headers.authorization.split(' ')[1];
      if (token.split('.').length === 3)
        userInfo = JSON.parse(
          Buffer.from(token.split('.')[1], 'base64').toString('ascii'),
        );
    }
    req.appContext = {
      startTime: new Date(),
      requestId:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      payload: userInfo
        ? {
            sub: userInfo.userId,
            email: userInfo.email,
            roles: userInfo.roles,
            isImpersonation: false,
            iss: 'issuer', // replace with actual issuer
            aud: 'audience', // replace with actual audience
          }
        : null,
      user: userInfo,
      isImpersonated: false,
      roles: userInfo ? userInfo.roles : [],
    };
    next();
  }
}
