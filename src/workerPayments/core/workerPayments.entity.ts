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
export const WorkerPaymentsKeys: { [P in keyof WorkerPayments]: P } = {
  id: 'id',
  workerId: 'workerId',
  serviceSheetId: 'serviceSheetId',
  totalPayment: 'totalPayment',
  paymentDate: 'paymentDate',
  isExtra: 'isExtra',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export type WorkerPaymentsKeysType =
  (typeof WorkerPaymentsKeys)[keyof typeof WorkerPaymentsKeys];
