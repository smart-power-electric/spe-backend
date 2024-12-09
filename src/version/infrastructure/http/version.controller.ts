import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { VersionUseCases } from '../../core/version.interfaces';
import { Request } from 'express';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { VersionResponse } from './version.dto';
import { ApplicationExceptionResponse } from 'src/common/infrastructure/http/exception/http.swagger';

@Controller('version')
export class VersionController {
  constructor(
    @Inject(VersionUseCases) private readonly application: VersionUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(VersionController.name, 'info');
  }
  @Get()
  @ApiOkResponse({ type: VersionResponse })
  @ApiInternalServerErrorResponse({
    type: ApplicationExceptionResponse,
    description: 'Internal server error',
  })
  getVersion(@Req() req: Request): VersionResponse {
    const ctx = req.appContext;
    this.logger.info(ctx, VersionController.name, 'getVersion');
    const version = this.application.getVersion(ctx);
    return {
      commitVersion: version.commitVersion,
      apiVersion: version.apiVersion,
      dateVersion: version.dateVersion,
      commitDate: version.commitDate,
    };
  }
}
