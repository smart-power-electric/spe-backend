import { ApiProperty } from '@nestjs/swagger';
import { RoleRow } from './role.repository';
import { UserResponse } from './user.swagger';
import { User } from '../core/user.entity';
import { Role } from '../core/role.entity';

export class AssignRoleToUserRequest {
  @ApiProperty({
    type: 'string',
    description: 'User identifier',
    nullable: false,
  })
  userId: string;
  @ApiProperty({
    type: 'string',
    description: 'Role identifier',
    nullable: false,
  })
  roleId: string;

  constructor(data: AssignRoleToUserRequest) {
    this.userId = data.userId;
    this.roleId = data.roleId;
  }
}

export class RemoveRoleFromUserRequest extends AssignRoleToUserRequest {}

export class RoleResponse implements RoleRow {
  @ApiProperty({
    type: 'string',
    description: 'Role identifier',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Role name',
    nullable: false,
  })
  roleName: string;
  @ApiProperty({
    type: 'string',
    description: 'Role description',
    nullable: false,
  })
  roleDescription: string;
  @ApiProperty({
    type: 'string',
    description: 'Role',
    nullable: false,
  })
  role: string;
  @ApiProperty({
    type: 'string',
    description: 'Creation date',
    nullable: false,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Update date',
    nullable: true,
  })
  updatedAt: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Deletion date',
    nullable: true,
  })
  deletedAt: Date | null;
  constructor(roleRow: RoleRow) {
    this.role = roleRow.role;
    this.id = roleRow.id;
    this.roleName = roleRow.roleName;
    this.roleDescription = roleRow.roleDescription;
    this.createdAt = roleRow.createdAt;
    this.updatedAt = roleRow.updatedAt;
    this.deletedAt = roleRow.deletedAt;
  }
}

export class AssignRoleResponse {
  @ApiProperty({
    type: UserResponse,
    description: 'User',
    nullable: false,
  })
  user: User;
  @ApiProperty({
    type: RoleResponse,
    description: 'Roles',
    nullable: false,
  })
  roles: Role[];
  constructor(data: { user: User; roles: Role[] }) {
    this.user = data.user;
    this.roles = data.roles;
  }
}

export class RemoveRoleResponse extends AssignRoleResponse {}
