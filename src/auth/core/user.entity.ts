import { InvalidFormatException } from 'src/common/core/exception';

export const UserStatusEnum = {
  active: 'active',
  inactive: 'inactive',
  pending: 'pending',
  blocked: 'blocked',
} as const;

export type UserStatus = (typeof UserStatusEnum)[keyof typeof UserStatusEnum];

export class User {
  id: string;
  fullname: string;
  username: string;
  password: string;
  status: UserStatus;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  constructor(params: {
    id?: string;
    fullname: string;
    username: string;
    password: string;
    status: string | null | undefined;
    isEnabled: boolean | null | undefined;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.fullname = params.fullname;
    this.username = params.username;
    this.password = params.password;
    this.status = this.setStatus(params.status);
    this.isEnabled = params.isEnabled ?? false;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt;
    this.deletedAt = params.deletedAt;
  }

  setStatus(status: string | null | undefined): UserStatus {
    status = status ?? UserStatusEnum.blocked;
    const isvalidStatus = Object.values(UserStatusEnum).includes(
      status as UserStatus,
    );
    if (!isvalidStatus) {
      throw new InvalidFormatException(
        null,
        'Invalid status',
        'status',
        status ?? '',
      );
    }
    this.status = status as UserStatus;
    return this.status;
  }
  cleanPassword(): void {
    this.password = '';
  }
}
