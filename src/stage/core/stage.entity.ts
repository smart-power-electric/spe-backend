export class Stage {
  id: string;
  projectId: string | null;
  name: string | null;
  description: string | null;
  percentage: number | null;
  adjustedPercentage: number | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    projectId: string | null;
    name: string | null;
    description: string | null;
    percentage: number | null;
    adjustedPercentage: number | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.projectId = params.projectId;
    this.name = params.name;
    this.description = params.description;
    this.percentage = params.percentage;
    this.adjustedPercentage = params.adjustedPercentage;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
