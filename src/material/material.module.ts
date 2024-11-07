import { Module } from '@nestjs/common';
import { MaterialApplication } from './application/material.application';
import { DrizzleMaterialRepository } from './infrastructure/material.repository';
import {
  MaterialRepository,
  MaterialUseCases,
} from './core/material.interface';
import { MaterialController } from './infrastructure/material.controller';

@Module({
  controllers: [MaterialController],
  providers: [
    {
      provide: MaterialRepository,
      useClass: DrizzleMaterialRepository,
    },
    {
      provide: MaterialUseCases,
      useClass: MaterialApplication,
    },
  ],
})
export class MaterialModule {}
