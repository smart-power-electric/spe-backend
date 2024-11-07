export class Material {
  id: string;
  name: string | null;
  unitCost: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    name: string | null;
    unitCost: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.name = params.name;
    this.unitCost = params.unitCost;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
