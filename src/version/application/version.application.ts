import { Context } from 'src/common/core/context.entity';
import { ApiVersion } from '../core/version.entity';
import { AccessFile, VersionUseCases } from '../core/version.interfaces';
import { ILogger } from 'src/common/core/logger.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class VersionApplication implements VersionUseCases {
  version: ApiVersion;
  constructor(
    @Inject(AccessFile) private readonly file: AccessFile,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(VersionApplication.name, 'info');
    const content = this.file.readFileAsString('.apiversion');
    this.version = new ApiVersion(content);
  }
  getVersion(ctx: Context): ApiVersion {
    this.logger.info(ctx, VersionApplication.name, 'getVersion');
    return this.version;
  }
}
