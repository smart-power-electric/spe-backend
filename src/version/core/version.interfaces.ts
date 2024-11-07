import { Context } from 'src/common/core/context.entity';
import { ApiVersion } from './version.entity';

export interface AccessFile {
  readFileAsString(path: string): string;
}
export const AccessFile = Symbol('AccessFile');

export interface VersionUseCases {
  getVersion(ctx: Context): ApiVersion;
}
export const VersionUseCases = Symbol('VersionUseCases');
