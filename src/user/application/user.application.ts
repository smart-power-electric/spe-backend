import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  ConflictException,
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  UserFilters,
  UserRepository,
  UserUseCases,
} from '../core/user.interface';
import { CreateUserDto, UpdateUserDto } from '../core/user.dto';
import { User } from '../core/user.entity';
import { CreateDtoToUser } from '../infrastructure/user.mapper';
import { PasswordHasherService } from 'src/security/core/password.hasher.interface';

@Injectable()
export class UserApplication implements UserUseCases {
  constructor(
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
}
