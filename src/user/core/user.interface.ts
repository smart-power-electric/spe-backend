import { Context } from 'src/common/core/context.entity';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { LoggedUser } from './auth.entity';

export type UserFilters = {
  search?: string;
};
export interface UserRepository {
  insert(ctx: Context, row: User): Promise<User | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: UserFilters,
  ): Promise<{
    data: User[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<User | null>;
  getByUsername(ctx: Context, email: string): Promise<User | null>;
  update(ctx: Context, id: string, row: User): Promise<User | null>;
  delete(ctx: Context, id: string): Promise<User | null>;
}
export const UserRepository = Symbol('UserRepository');

export interface UserUseCases {
  create(ctx: Context, dto: CreateUserDto): Promise<User>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: UserFilters,
  ): Promise<{
    data: User[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<User>;
  update(ctx: Context, id: string, row: UpdateUserDto): Promise<User>;
  delete(ctx: Context, id: string): Promise<User>;
  login(
    ctx: Context,
    email: string,
    password: string,
    otp?: string,
  ): Promise<LoggedUser>;
  logout(ctx: Context, token: string): Promise<void>;
  refreshToken(ctx: Context, token: string): Promise<LoggedUser>;
  changePassword(
    ctx: Context,
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User>;
}
export const UserUseCases = Symbol('UserUseCases');
