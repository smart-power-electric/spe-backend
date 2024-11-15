import { AuthJwtService } from './core/auth.jwt.interface';
import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { PasswordHasherApplication } from './application/password.hasher.application';
import { PasswordHasherService } from './core/password.hasher.interface';
import { ConfigModule } from '@nestjs/config';
import configuration from '../common/application/application-config/configuration';
import { AuthJwtApplication } from './application/auth.jwt.application';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CommonModule,
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
  ],
  exports: [PasswordHasherService],
})
export class SecurityModule {}
