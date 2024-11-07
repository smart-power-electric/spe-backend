import { Module } from '@nestjs/common';
import { StageApplication } from './application/stage.application';
import { DrizzleStageRepository } from './infrastructure/stage.repository';
import { StageRepository, StageUseCases } from './core/stage.interface';
import { StageController } from './infrastructure/stage.controller';

@Module({
  controllers: [StageController],
  providers: [
    {
      provide: StageRepository,
      useClass: DrizzleStageRepository,
    },
    {
      provide: StageUseCases,
      useClass: StageApplication,
    },
  ],
})
export class StageModule {}
