export class WorkerRates {
  id: string;
  rate: number | null;
  effectiveDate: Date | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    rate: number | null;
    effectiveDate: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.rate = params.rate;
    this.effectiveDate = params.effectiveDate;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt;
  }
}
