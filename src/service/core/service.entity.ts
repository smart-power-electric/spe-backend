export class Service {
  id: string;
  name: string | null;
  description: string | null;
  unitCost: number | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    name: string | null;
    description: string | null;
    unitCost: number | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.name = params.name;
    this.description = params.description;
    this.unitCost = params.unitCost;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
export const ServiceKeys: { [P in keyof Service]: P } = {
  id: 'id',
  name: 'name',
  description: 'description',
  unitCost: 'unitCost',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export type ServiceKeysType = (typeof ServiceKeys)[keyof typeof ServiceKeys];
