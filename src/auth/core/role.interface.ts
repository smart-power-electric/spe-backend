import { Context } from 'src/common/core/context.entity';
import { Role } from './role.entity';

export interface RoleRepository {
  insert(ctx: Context, row: Role): Promise<Role | null>;
  insertRoleToUser(
    ctx: Context,
    userId: string,
    roleId: string,
  ): Promise<Role | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: Role[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Role | null>;
  getByRolename(ctx: Context, email: string): Promise<Role | null>;
  getByRole(ctx: Context, email: string): Promise<Role | null>;
  getRolesByUserId(ctx: Context, userId: string): Promise<Role[]>;
  getRolesByUserEmail(ctx: Context, email: string): Promise<Role[]>;
  update(ctx: Context, id: string, row: Role): Promise<Role | null>;
  delete(ctx: Context, id: string): Promise<Role | null>;
  deleteRoleFromUser(
    ctx: Context,
    userId: string,
    roleId: string,
  ): Promise<Role | null>;
}

export const RoleRepository = Symbol('RoleRepository');
