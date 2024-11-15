import { user } from 'src/common/infrastructure/schema/schema';
import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  ConflictException,
  InternalErrorException,
  NotAuthorizedException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  UserFilters,
  UserRepository,
  UserUseCases,
} from '../core/user.interface';
import { CreateUserDto, UpdateUserDto } from '../core/user.dto';
import { User, UserStatusEnum } from '../core/user.entity';
import { CreateDtoToUser } from '../infrastructure/user.mapper';
import { PasswordHasherService } from 'src/security/core/password.hasher.interface';
import { LoggedUser } from '../core/auth.entity';
import { AuthJwtApplication } from 'src/security/application/auth.jwt.application';

@Injectable()
export class UserApplication implements UserUseCases {
  constructor(
    @Inject(AuthJwtApplication) private readonly authJwt: AuthJwtApplication,
    @Inject(UserRepository)
    private readonly repository: UserRepository,
    @Inject(PasswordHasherService)
    private readonly passwordHasher: PasswordHasherService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(UserApplication.name, 'info');
  }

  async create(ctx: Context, dto: CreateUserDto): Promise<User> {
    this.logger.info(ctx, UserApplication.name, 'create', 'Creating new user');
    dto.password = await this.passwordHasher.hashPassword(ctx, dto.password);
    const user = CreateDtoToUser(dto);
    const existEmail = await this.repository.getByUsername(ctx, user.username);
    if (existEmail) {
      throw new ConflictException(ctx, 'Email already exists');
    }
    const newUser = await this.repository.insert(ctx, user);
    if (!newUser) {
      throw new InternalErrorException(ctx, 'User already exists');
    }
    return newUser;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: UserFilters,
  ): Promise<{ data: User[]; total: number }> {
    this.logger.info(ctx, UserApplication.name, 'getAll', 'Getting all users');
    const result = await this.repository.getAll(ctx, limit, offset, filters);
    result.data = result.data.map((user) => {
      user.cleanPassword();
      return user;
    });
    return result;
  }

  async getById(ctx: Context, id: string): Promise<User> {
    this.logger.info(ctx, UserApplication.name, 'getById', 'Getting user');
    const user = await this.repository.getById(ctx, id);
    if (!user) {
      throw new NotFoundException(ctx, 'User not found');
    }
    user.cleanPassword();
    return user;
  }

  async update(ctx: Context, id: string, row: UpdateUserDto): Promise<User> {
    this.logger.info(ctx, UserApplication.name, 'update', 'Updating user');
    const user = await this.repository.getById(ctx, id);
    if (!user) {
      throw new NotFoundException(ctx, 'User not found');
    }
    if (row.password) {
      row.password = await this.passwordHasher.hashPassword(ctx, row.password);
    } else {
      row.password = user.password;
    }

    const updatedUser = new User({
      ...user,
      ...row,
    });

    if (row.email) {
      updatedUser.username = row.email;
      const existEmail = await this.repository.getByUsername(
        ctx,
        updatedUser.username,
      );
      if (existEmail) {
        throw new ConflictException(ctx, 'Email already exists');
      }
    }
    const updated = await this.repository.update(ctx, id, updatedUser);
    if (!updated) {
      throw new InternalErrorException(ctx, 'User not updated');
    }
    updated.cleanPassword();
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<User> {
    this.logger.info(ctx, UserApplication.name, 'delete', 'Deleting user');
    const user = await this.repository.getById(ctx, id);
    if (!user) {
      throw new NotFoundException(ctx, 'User not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'User not deleted');
    }
    deleted.cleanPassword();
    return deleted;
  }
  async login(
    ctx: Context,
    email: string,
    password: string,
    otp?: string,
  ): Promise<LoggedUser> {
    this.logger.info(ctx, UserApplication.name, 'login', 'User login');
    const user = await this.repository.getByUsername(ctx, email);
    if (!user) {
      this.logger.error(ctx, UserApplication.name, 'login', 'User not found');
      throw new NotAuthorizedException(ctx, 'Failed to login');
    }
    const passwordMatch = await this.passwordHasher.comparePassword(
      ctx,
      password,
      user.password,
    );
    if (!passwordMatch) {
      this.logger.error(
        ctx,
        UserApplication.name,
        'login',
        'Password not match',
      );
      throw new NotAuthorizedException(ctx, 'Failed to login');
    }
    return this.signLogin(ctx, user);
  }
  private async signLogin(ctx: Context, user: User): Promise<LoggedUser> {
    if (user.deletedAt) {
      this.logger.error(ctx, UserApplication.name, 'login', 'User deleted');
      throw new NotAuthorizedException(ctx, 'Failed to login');
    }
    if (user.status != UserStatusEnum.active) {
      this.logger.error(ctx, UserApplication.name, 'login', 'User not active');
      throw new NotAuthorizedException(ctx, 'Failed to login');
    }
    const roles = ['user'];
    const accessToken = await this.authJwt.generateAccessToken(
      ctx,
      { id: user.id, email: user.username },
      roles,
      false,
      null,
    );
    const refreshToken = await this.authJwt.generateRefreshToken(ctx, {
      id: user.id,
      email: user.username,
    });
    return {
      user,
      roles,
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
      accessTokenExpiresIn: accessToken.expAt,
      refreshTokenExpiresIn: refreshToken.expAt,
      accessTokenExpiresAt: accessToken.expDate,
      refreshTokenExpiresAt: refreshToken.expDate,
    };
  }
  async refreshToken(ctx: Context, refreshToken: string): Promise<LoggedUser> {
    this.logger.info(ctx, UserApplication.name, 'refresh', 'User refresh');
    const userSub = await this.authJwt.verifyRefreshToken(ctx, refreshToken);
    const user = await this.repository.getById(ctx, userSub.id);
    if (!user) {
      this.logger.error(ctx, UserApplication.name, 'refresh', 'User not found');
      throw new NotAuthorizedException(ctx, 'Failed to refresh');
    }
    return this.signLogin(ctx, user);
  }
  async changePassword(
    ctx: Context,
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    this.logger.info(
      ctx,
      UserApplication.name,
      'changePassword',
      'User change password',
    );
    const user = await this.repository.getById(ctx, id);
    if (!user) {
      this.logger.error(
        ctx,
        UserApplication.name,
        'changePassword',
        'User not found',
      );
      throw new NotAuthorizedException(ctx, 'Failed to change password');
    }
    const passwordMatch = await this.passwordHasher.comparePassword(
      ctx,
      oldPassword,
      user.password,
    );
    if (!passwordMatch) {
      this.logger.error(
        ctx,
        UserApplication.name,
        'changePassword',
        'Password not match',
      );
      throw new NotAuthorizedException(ctx, 'Failed to change password');
    }
    user.password = await this.passwordHasher.hashPassword(ctx, newPassword);
    const updated = await this.repository.update(ctx, id, user);
    if (!updated) {
      this.logger.error(
        ctx,
        UserApplication.name,
        'changePassword',
        'User not updated',
      );
      throw new NotAuthorizedException(ctx, 'Failed to change password');
    }
    updated.cleanPassword();
    return updated;
  }
  async logout(ctx: Context, refreshToken: string): Promise<void> {
    this.logger.info(ctx, UserApplication.name, 'logout', 'User logout');
    const user = await this.authJwt.verifyRefreshToken(ctx, refreshToken);
    if (!user) {
      this.logger.error(ctx, UserApplication.name, 'logout', 'User not found');
      throw new NotAuthorizedException(ctx, 'Failed to logout');
    }
  }
}
