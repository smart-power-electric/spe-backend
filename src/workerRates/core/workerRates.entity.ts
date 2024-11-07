export class WorkerRates {
  id: string;
  workerId: string | null;
  rate: number | null;
  effectiveDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    workerId: string | null;
    rate: number | null;
    effectiveDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.workerId = params.workerId;
    this.rate = params.rate;
    this.effectiveDate = params.effectiveDate;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
