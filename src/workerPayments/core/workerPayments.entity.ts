export class WorkerPayments {
  id: string;
  workerId: string | null;
  serviceSheetId: string | null;
  totalPayment: number | null;
  paymentDate: Date | null;
  isExtra: boolean | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    workerId: string | null;
    serviceSheetId: string | null;
    totalPayment: number | null;
    paymentDate: Date | null;
    isExtra: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.workerId = params.workerId;
    this.serviceSheetId = params.serviceSheetId;
    this.totalPayment = params.totalPayment;
    this.paymentDate = params.paymentDate;
    this.isExtra = params.isExtra;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
