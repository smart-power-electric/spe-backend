import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from '../core/user.dto';
import { UserRow } from './user.repository';
import { User, UserStatusEnum } from '../core/user.entity';
import { LoggedUser } from '../core/auth.entity';

export class CreateUserRequest implements CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Full name of the user',
    nullable: false,
  })
  fullname: string;
  @ApiProperty({
    type: 'string',
    description: 'Password of the user',
    nullable: false,
  })
  password: string;
  @ApiProperty({
    type: 'string',
    description: 'Email of the user',
    nullable: false,
  })
  email: string;
  @ApiPropertyOptional({
    description: 'Status of the user',
    nullable: true,
    enum: UserStatusEnum,
  })
  status?: string | null;
  @ApiPropertyOptional({
    type: 'boolean',
    description: 'Is the user enabled',
    nullable: true,
  })
  isEnabled?: boolean | null;

  constructor(data: CreateUserDto) {
    this.fullname = data.fullname;
    this.password = data.password;
    this.email = data.email;
    this.status = data.status;
    this.isEnabled = data.isEnabled;
  }
}

export class UpdateUserRequest implements UpdateUserDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Full name of the user',
    nullable: false,
  })
  fullname?: string;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Password of the user',
    nullable: false,
  })
  password?: string;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Email of the user',
    nullable: false,
  })
  email?: string;
  @ApiPropertyOptional({
    description: 'Status of the user',
    nullable: true,
    enum: UserStatusEnum,
  })
  status?: string;
  @ApiPropertyOptional({
    type: 'boolean',
    description: 'Is the user enabled',
    nullable: true,
  })
  isEnabled?: boolean;
  constructor(data: UpdateUserDto) {
    this.fullname = data.fullname;
    this.password = data.password;
    this.email = data.email;
    this.status = data.status;
    this.isEnabled = data.isEnabled;
  }
}

export class UserResponse implements UserRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the user',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Worker id of the user',
    nullable: false,
  })
  username: string;
  @ApiProperty({
    type: 'string',
    description: 'Worker id of the user',
    nullable: false,
  })
  fullname: string;
  @ApiProperty({
    type: 'string',
    description: 'Rate of the user',
    nullable: false,
  })
  password: string;
  @ApiProperty({
    type: 'string',
    description: 'Effective date of the user',
    nullable: false,
    enum: UserStatusEnum,
  })
  status: string;
  @ApiProperty({
    type: 'boolean',
    description: 'Is the user enabled',
    nullable: false,
  })
  isEnabled: boolean;
  @ApiProperty({
    type: 'date',
    description: 'Creation date of the user',
    nullable: false,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'date',
    description: 'Update date of the user',
    nullable: true,
  })
  updatedAt: Date | null;
  @ApiProperty({
    type: 'date',
    description: 'Deletion date of the user',
    nullable: true,
  })
  deletedAt: Date | null;
  constructor(data: User) {
    this.id = data.id;
    this.username = data.username;
    this.fullname = data.fullname;
    this.password = data.password;
    this.status = data.status;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
}

export class UserPaginationResponse {
  @ApiProperty({
    type: [UserResponse],
    description: 'Data of the user',
    nullable: false,
  })
  data: UserResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the user',
    nullable: false,
  })
  total: number;

  constructor(data: { data: User[]; total: number }) {
    this.data = data.data.map((d) => new UserResponse(d));
    this.total = data.total;
  }
}

export class LoginRequest {
  @ApiProperty({
    type: 'string',
    description: 'Email of the user',
    nullable: false,
  })
  email: string;
  @ApiProperty({
    type: 'string',
    description: 'Password of the user',
    nullable: false,
  })
  password: string;
  @ApiPropertyOptional({
    type: 'string',
    description: 'OTP of the user',
    nullable: true,
  })
  otp?: string;
  constructor(data: { email: string; password: string; otp?: string }) {
    this.email = data.email;
    this.password = data.password;
    this.otp = data.otp;
  }
}

export class LoginResponse implements LoggedUser {
  @ApiProperty({
    type: UserResponse,
    description: 'User data',
    nullable: false,
  })
  user: User;
  @ApiProperty({
    type: 'string',
    description: 'Roles of the user',
    nullable: false,
    isArray: true,
  })
  roles: string[];
  @ApiProperty({
    type: 'string',
    description: 'Access token of the user',
    nullable: false,
  })
  accessToken: string;
  @ApiProperty({
    type: 'string',
    description: 'Refresh token of the user',
    nullable: false,
  })
  refreshToken: string;
  @ApiProperty({
    type: 'number',
    description: 'Access token expiration time',
    nullable: false,
  })
  accessTokenExpiresIn: number;
  @ApiProperty({
    type: 'number',
    description: 'Refresh token expiration time',
    nullable: false,
  })
  refreshTokenExpiresIn: number;
  @ApiProperty({
    type: 'date',
    description: 'Access token expiration date',
    nullable: false,
  })
  accessTokenExpiresAt: Date;
  @ApiProperty({
    type: 'date',
    description: 'Refresh token expiration date',
    nullable: false,
  })
  refreshTokenExpiresAt: Date;
  constructor(data: LoggedUser) {
    this.user = data.user;
    this.roles = data.roles;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.accessTokenExpiresIn = data.accessTokenExpiresIn;
    this.refreshTokenExpiresIn = data.refreshTokenExpiresIn;
    this.accessTokenExpiresAt = data.accessTokenExpiresAt;
    this.refreshTokenExpiresAt = data.refreshTokenExpiresAt;
  }
}

export class ChangePasswordRequest implements ChangePasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'Id of the user',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Old password of the user',
    nullable: false,
  })
  oldPassword: string;
  @ApiProperty({
    type: 'string',
    description: 'New password of the user',
    nullable: false,
  })
  newPassword: string;
  constructor(data: ChangePasswordDto) {
    this.id = data.id;
    this.oldPassword = data.oldPassword;
    this.newPassword = data.newPassword;
  }
}
