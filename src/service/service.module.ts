import { Module } from '@nestjs/common';
import { ServiceApplication } from './application/service.application';
import { DrizzleServiceRepository } from './infrastructure/service.repository';
import { ServiceRepository, ServiceUseCases } from './core/service.interface';
import { ServiceController } from './infrastructure/service.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [ServiceController],
  providers: [
    {
      provide: ServiceRepository,
      useClass: DrizzleServiceRepository,
    },
    {
      provide: ServiceUseCases,
      useClass: ServiceApplication,
    },
  ],
})
export class ServiceModule {}
