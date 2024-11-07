export class WorkerAssignment {
  id: string;
  projectId: string | null;
  workerId: string | null;
  stageId: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    projectId: string | null;
    workerId: string | null;
    stageId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.projectId = params.projectId;
    this.workerId = params.workerId;
    this.stageId = params.stageId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
