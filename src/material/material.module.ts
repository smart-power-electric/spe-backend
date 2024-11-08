import { Module } from '@nestjs/common';
import { MaterialApplication } from './application/material.application';
import { DrizzleMaterialRepository } from './infrastructure/material.repository';
import {
  MaterialRepository,
  MaterialUseCases,
} from './core/material.interface';
import { MaterialController } from './infrastructure/material.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
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
