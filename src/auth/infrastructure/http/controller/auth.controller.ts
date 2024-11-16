import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  Req,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { UserUseCases } from '../../../core/user.interface';
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  UserResponse,
} from '../../user.swagger';
import { changePasswordSchema, loginUserSchema } from '../../../core/user.zod';
import {
  AssignRoleResponse,
  AssignRoleToUserRequest,
  RemoveRoleFromUserRequest,
  RemoveRoleResponse,
  RoleResponse,
} from '../../role.swagger';
import { RefreshTokenGuard } from '../guard/refresh.token.guard';
import { AccessTokenGuard } from '../guard/access.token.guard';
import { RoleEnum } from 'src/auth/core/role.entity';
import { Roles } from '../decorator/roles.decorator';

@ApiTags('authentication')
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
  @ApiBearerAuth('AUTH_TOKEN')
  @UseGuards(RefreshTokenGuard)
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
  @ApiBearerAuth('AUTH_TOKEN')
  @UseGuards(RefreshTokenGuard)
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
  @ApiBearerAuth('AUTH_TOKEN')
  @UseGuards(AccessTokenGuard)
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

  @Post('assign-role')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Assign role to user',
  })
  @ApiOkResponse({
    description: 'Role assigned',
    type: AssignRoleResponse,
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
  @ApiBody({ type: AssignRoleToUserRequest })
  @ApiBearerAuth('AUTH_TOKEN')
  @UseGuards(AccessTokenGuard)
  @Roles(RoleEnum.admin)
  async assignRoleToUser(
    @Req() req: Request,
    @Body() body: AssignRoleToUserRequest,
  ): Promise<AssignRoleResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      AuthrController.name,
      'assignRoleToUser',
      'Assigning role to user',
    );
    return this.application.assignRoleToUser(ctx, body.userId, body.roleId);
  }

  @Post('remove-role')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Remove role from user',
  })
  @ApiOkResponse({
    description: 'Role removed',
    type: RemoveRoleFromUserRequest,
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
  @ApiBody({ type: RemoveRoleFromUserRequest })
  @ApiBearerAuth('AUTH_TOKEN')
  @UseGuards(AccessTokenGuard)
  @Roles(RoleEnum.admin)
  async removeRoleFromUser(
    @Req() req: Request,
    @Body() body: RemoveRoleFromUserRequest,
  ): Promise<RemoveRoleResponse> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      AuthrController.name,
      'removeRoleFromUser',
      'Removing role from user',
    );
    return this.application.deleteRoleToUser(ctx, body.userId, body.roleId);
  }

  @Get('roles')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all roles',
  })
  @ApiOkResponse({
    description: 'Roles retrieved',
    type: [RoleResponse],
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
  @ApiBearerAuth('AUTH_TOKEN')
  @UseGuards(AccessTokenGuard)
  @Roles(RoleEnum.admin)
  async getRoles(@Req() req: Request): Promise<RoleResponse[]> {
    const ctx = req.appContext;
    this.logger.info(
      req.appContext,
      AuthrController.name,
      'getRoles',
      'Getting roles',
    );
    return this.application.getRoles(ctx);
  }
}
