import { readFileSync } from 'fs';
import { AccessFile } from '../core/version.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { newContext } from 'src/common/core/context.entity';
import { InternalErrorException } from 'src/common/core/exception';

@Injectable()
export class AccessLocalFileService implements AccessFile {
  constructor(@Inject(ILogger) private readonly logger: ILogger) {
    this.logger.init(AccessLocalFileService.name, 'info');
  }
  readFileAsString(path: string): string {
    try {
      const apiVersionContent = readFileSync(path, 'utf-8');
      return apiVersionContent;
    } catch (error) {
      const erroString =
        typeof error === 'object' ? JSON.stringify(error) : error;
      this.logger.error(
        newContext(),
        AccessLocalFileService.name,
        `Error reading file: `,
        erroString,
      );
      throw new InternalErrorException(
        null,
        `Error reading file: ${erroString}`,
      );
    }
  }
}
