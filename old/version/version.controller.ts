import { Controller, Get, Inject } from '@nestjs/common';
import { readFileSync } from 'fs';
import { ILogger } from 'src/commons/logging/logger.interface';

type ApiVersion = {
  commit_version: string;
  commit_date: string;
  api_version: string;
  date_version: string;
};
@Controller('version')
export class VersionController {
  apiVersionData: ApiVersion;
  constructor(@Inject(ILogger) private readonly logger: ILogger) {
    this.logger.init('VersionController', 'info');
    this.apiVersionData = this.loadApiVersionData();
  }
  @Get()
  getVersion(): any {
    return {
      commit_version: this.apiVersionData.commit_version,
      api_version: this.apiVersionData.api_version,
      date_version: this.apiVersionData.date_version,
      commit_date: this.apiVersionData.commit_date,
    };
  }
  private loadApiVersionData(): ApiVersion {
    const version: ApiVersion = {
      commit_version: '',
      commit_date: '',
      api_version: '',
      date_version: '',
    };
    try {
      // Read the content of .apiversion file
      const apiVersionContent = readFileSync('.apiversion', 'utf-8');

      // Parse the content to extract the fields
      const lines = apiVersionContent.trim().split('\n');
      lines.forEach(line => {
        const [key, value] = line.split('=');
        switch (key.trim()) {
          case 'commit_version':
            version.commit_version = value.trim();
            break;
          case 'api_version':
            version.api_version = value.trim();
            break;
          case 'date_version':
            version.date_version = value.trim();
            break;
          case 'commit_date':
            version.commit_date = value.trim();
            break;
          default:
            break;
        }
      });
    } catch (error) {
      // Handle file read errors or missing .apiversion file
      this.logger.error(null, 'Error reading .apiversion file:', error);
    }
    return version;
  }
}
