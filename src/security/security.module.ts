import { AuthJwtService } from './core/auth.jwt.interface';
import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { PasswordHasherApplication } from './application/password.hasher.application';
import { PasswordHasherService } from './core/password.hasher.interface';
import { ConfigModule } from '@nestjs/config';
import configuration from '../common/application/application-config/configuration';
import { AuthJwtApplication } from './application/auth.jwt.application';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './infrastructure/guard/access.token.guard';
import { RefreshTokenGuard } from './infrastructure/guard/refresh.token.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CommonModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: PasswordHasherService,
      useClass: PasswordHasherApplication,
    },
    {
      provide: AuthJwtService,
      useClass: AuthJwtApplication,
    },
    AccessTokenGuard,
    RefreshTokenGuard,
  ],
  exports: [PasswordHasherService],
})
export class SecurityModule {}
