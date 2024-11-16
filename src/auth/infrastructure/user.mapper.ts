import { CreateUserDto } from '../core/user.dto';
import { User } from '../core/user.entity';
import { UserNew, UserRow } from './user.repository';

export function CreateDtoToUser(dto: CreateUserDto): User {
  return new User({
    ...dto,
    id: undefined,
    username: dto.email,
    status: dto.status ?? null,
    isEnabled: dto.isEnabled || null,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  });
}
export function RowToUser(row: UserRow): User {
  return new User({
    ...row,
  });
}

export function UserToRow(item: User): UserRow {
  return {
    ...item,
    username: item.username,
    status: item.status ?? null,
    isEnabled: item.isEnabled,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
}

export function UserToUserNew(item: User): UserNew {
  return {
    fullname: item.fullname,
    password: item.password,
    username: item.username,
    status: item.status ?? null,
    isEnabled: item.isEnabled,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
}
