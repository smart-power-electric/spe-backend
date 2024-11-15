import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { PasswordHasherApplication } from './application/password.hasher.application';
import { PasswordHasherService } from './core/password.hasher.interface';
import { ConfigModule } from '@nestjs/config';
import configuration from '../common/application/application-config/configuration';

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
  ],
  exports: [PasswordHasherService],
})
export class SecurityModule {}
