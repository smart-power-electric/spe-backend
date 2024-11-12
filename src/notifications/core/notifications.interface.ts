import { Context } from 'src/common/core/context.entity';
import {
  CreateNotificationsDto,
  UpdateNotificationsDto,
} from './notifications.dto';
import { Notifications } from './notifications.entity';
export type NotificationsFilter = {
  invoiceId?: string;
  clientId?: string;
};
export interface NotificationsRepository {
  insert(ctx: Context, row: Notifications): Promise<Notifications | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: NotificationsFilter,
  ): Promise<{
    data: Notifications[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Notifications | null>;
  update(
    ctx: Context,
    id: string,
    row: Notifications,
  ): Promise<Notifications | null>;
  delete(ctx: Context, id: string): Promise<Notifications | null>;
}
export const NotificationsRepository = Symbol('NotificationsRepository');

export interface NotificationsUseCases {
  create(ctx: Context, dto: CreateNotificationsDto): Promise<Notifications>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: NotificationsFilter,
  ): Promise<{
    data: Notifications[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Notifications>;
  update(
    ctx: Context,
    id: string,
    row: UpdateNotificationsDto,
  ): Promise<Notifications>;
  delete(ctx: Context, id: string): Promise<Notifications>;
}
export const NotificationsUseCases = Symbol('NotificationsUseCases');
