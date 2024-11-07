export class ProjectQuotation {
  id: string;
  projectId: string | null;
  materialId: string | null;
  serviceId: string | null;
  quantity: number | null;
  totalCost: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    projectId: string | null;
    materialId: string | null;
    serviceId: string | null;
    quantity: number | null;
    totalCost: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.projectId = params.projectId;
    this.materialId = params.materialId;
    this.serviceId = params.serviceId;
    this.quantity = params.quantity;
    this.totalCost = params.totalCost;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
