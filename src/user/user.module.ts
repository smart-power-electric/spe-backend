import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/user.controller';
import { UserRepository, UserUseCases } from './core/user.interface';
import { DrizzleUserRepository } from './infrastructure/user.repository';
import { UserApplication } from './application/user.application';
import { CommonModule } from 'src/common/common.module';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [CommonModule, SecurityModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    {
      provide: UserUseCases,
      useClass: UserApplication,
    },
  ],
})
export class UserModule {}
