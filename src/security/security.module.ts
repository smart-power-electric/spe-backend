import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { PasswordHasherApplication } from './application/password.hasher.application';
import { PasswordHasherService } from './core/password.hasher.interface';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: PasswordHasherService,
      useClass: PasswordHasherApplication,
    },
  ],
  exports: [PasswordHasherService],
})
export class SecurityModule {}
