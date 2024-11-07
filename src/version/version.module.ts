import { ConfigModule } from '@nestjs/config';
import { VersionController } from './infrastructure/http/version.controller';
import { AccessLocalFileService } from './infrastructure/accessLocalFile.service';
import configuration from '../common/application/application-config/configuration';
import { AccessFile, VersionUseCases } from './core/version.interfaces';
import { Module } from '@nestjs/common';
import { VersionApplication } from './application/version.application';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CommonModule,
  ],
  controllers: [VersionController],
  providers: [
    { provide: VersionUseCases, useClass: VersionApplication },
    { provide: AccessFile, useClass: AccessLocalFileService },
  ],
})
export class VersionModule {}
