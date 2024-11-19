export class Material {
  id: string;
  name: string | null;
  unitCost: number | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    name: string | null;
    unitCost: number | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.name = params.name;
    this.unitCost = params.unitCost;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}

export const MaterialKeys: { [P in keyof Material]: P } = {
  id: 'id',
  name: 'name',
  unitCost: 'unitCost',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export type MaterialKeysType = (typeof MaterialKeys)[keyof typeof MaterialKeys];
