export class Notifications {
  id: string;
  invoiceId: string | null;
  clientId: string | null;
  status: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    invoiceId: string | null;
    clientId: string | null;
    status: string | null;
    createdAt: Date | null;
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
