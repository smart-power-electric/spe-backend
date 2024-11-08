import { CreateNotificationsDto } from '../core/notifications.dto';
import { Notifications } from '../core/notifications.entity';
import { NotificationsNew, NotificationsRow } from './notifications.repository';

export function CreateDtoToNotifications(
  dto: CreateNotificationsDto,
): Notifications {
  return new Notifications({
    ...dto,
    createdAt: new Date(),
    updatedAt: null,
    id: undefined,
  });
}
export function RowToNotifications(row: NotificationsRow): Notifications {
  return new Notifications({
    ...row,
  });
}

export function NotificationsToRow(item: Notifications): NotificationsRow {
  return {
    id: item.id,
    invoiceId: item.invoiceId,
    clientId: item.clientId,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function NotificationsToNotificationsNew(
  item: Notifications,
): NotificationsNew {
  return {
    invoiceId: item.invoiceId,
    clientId: item.clientId,
    status: item.status,
  };
}
