import { RoleRepository } from './core/role.interface';
import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/http/controller/user.controller';
import { UserRepository, UserUseCases } from './core/user.interface';
import { DrizzleUserRepository } from './infrastructure/user.repository';
import { UserApplication } from './application/user.application';
import { CommonModule } from 'src/common/common.module';
import { SecurityModule } from 'src/security/security.module';
import { AuthrController } from './infrastructure/http/controller/auth.controller';
import { DrizzleRoleRepository } from './infrastructure/role.repository';

@Module({
  imports: [CommonModule, SecurityModule],
  controllers: [UserController, AuthrController],
  providers: [
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    {
      provide: UserUseCases,
      useClass: UserApplication,
    },
    {
      provide: RoleRepository,
      useClass: DrizzleRoleRepository,
    },
  ],
})
export class UserModule {}
