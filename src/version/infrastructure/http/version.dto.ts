import { ApiProperty } from '@nestjs/swagger';
import { ApiVersion } from 'src/version/core/version.entity';

export class VersionResponse {
  @ApiProperty({ type: String, description: 'Commit version' })
  commitVersion: string;
  @ApiProperty({ type: String, description: 'Commit date' })
  commitDate: string;
  @ApiProperty({ type: String, description: 'Api version' })
  apiVersion: string;
  @ApiProperty({ type: String, description: 'Date version' })
  dateVersion: string;
  constructor(apiVersion: ApiVersion) {
    this.commitVersion = apiVersion.commitVersion;
    this.commitDate = apiVersion.commitDate;
    this.apiVersion = apiVersion.apiVersion;
    this.dateVersion = apiVersion.dateVersion;
  }
}
