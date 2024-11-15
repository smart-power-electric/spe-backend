import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ApplicationExceptionResponse } from 'src/common/infrastructure/http/exception/http.swagger';
import { ZodValidationPipe } from 'src/common/application/pipes/ZodValidationPipe';
import { UserUseCases } from '../core/user.interface';
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  UserResponse,
} from './user.swagger';
import { changePasswordSchema, loginUserSchema } from '../core/user.zod';

@ApiTags('auth')
@Controller('auth')
export class AuthrController {
  constructor(
    @Inject(UserUseCases)
    private readonly application: UserUseCases,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(AuthrController.name, 'info');
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User logged',
    type: LoginResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiBody({ type: LoginRequest })
  @ApiOperation({
    summary: 'Login user',
  })
  loginUser(
    @Req() req: Request,
    @Body(new ZodValidationPipe(loginUserSchema))
    loginUserDto: LoginRequest,
  ): Promise<LoginResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      AuthrController.name,
      'login',
      'Logging user',
    );
    return this.application.login(
      ctx,
      loginUserDto.email,
      loginUserDto.password,
      loginUserDto.otp,
    );
  }

  @Post('logout')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Logout user',
  })
  @ApiOkResponse({ description: 'User logged out' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiQuery({ name: 'refreshToken', required: true, type: String })
  logoutUser(@Req() req: Request, @Query('refreshToken') token: string) {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      AuthrController.name,
      'logout',
      'Logging out user',
    );
    return this.application.logout(ctx, token);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Refresh user token',
  })
  @ApiOkResponse({
    description: 'User refreshed',
    type: LoginResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiQuery({ name: 'refreshToken', required: true, type: String })
  refreshUser(
    @Req() req: Request,
    @Query('refreshToken') token: string,
  ): Promise<LoginResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      AuthrController.name,
      'refresh',
      'Refreshing user',
    );
    return this.application.refreshToken(ctx, token);
  }

  @Post('change-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Change user password',
  })
  @ApiOkResponse({
    description: 'Password changed',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    type: ApplicationExceptionResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ApplicationExceptionResponse,
  })
  @ApiBody({ type: ChangePasswordRequest })
  async changePassword(
    @Req() req: Request,
    @Body(new ZodValidationPipe(changePasswordSchema))
    updateUserDto: ChangePasswordRequest,
  ): Promise<UserResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      AuthrController.name,
      'changePassword',
      'Changing user password',
    );
    return this.application.changePassword(
      ctx,
      updateUserDto.id,
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
    );
  }
}
