export class Notifications {
  id: string;
  invoiceId: string | null;
  clientId: string | null;
  status: string | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    invoiceId: string | null;
    clientId: string | null;
    status: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.invoiceId = params.invoiceId;
    this.clientId = params.clientId;
    this.status = params.status;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
export const NotificationsKeys: { [P in keyof Notifications]: P } = {
  id: 'id',
  invoiceId: 'invoiceId',
  clientId: 'clientId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export type NotificationsKeysType =
  (typeof NotificationsKeys)[keyof typeof NotificationsKeys];
