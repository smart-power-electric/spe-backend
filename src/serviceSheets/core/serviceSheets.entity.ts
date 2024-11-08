export class ServiceSheets {
  id: string;
  workerId: string | null;
  projectId: string | null;
  weekStartDate: Date | null;
  totalHours: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    workerId: string | null;
    projectId: string | null;
    weekStartDate: Date | null;
    totalHours: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.workerId = params.workerId;
    this.projectId = params.projectId;
    this.weekStartDate = params.weekStartDate;
    this.totalHours = params.totalHours;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
