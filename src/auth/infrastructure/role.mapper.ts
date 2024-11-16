import { Role } from '../core/role.entity';
import { RoleNew, RoleRow } from './role.repository';

export function RowToRole(row: RoleRow): Role {
  return new Role({
    ...row,
  });
}

export function RoleToRow(item: Role): RoleRow {
  return {
    ...item,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
}

export function RoleToRoleNew(item: Role): RoleNew {
  return {
    roleName: item.roleName,
    roleDescription: item.roleDescription,
    role: item.role,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
}
