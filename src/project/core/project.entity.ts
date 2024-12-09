export class Project {
  id: string;
  clientId: string | null;
  name: string | null;
  description: string | null;
  location: string | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    clientId: string | null;
    name: string | null;
    description: string | null;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.clientId = params.clientId;
    this.name = params.name;
    this.description = params.description;
    this.location = params.location;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
export const ProjectKeys: { [P in keyof Project]: P } = {
  id: 'id',
  clientId: 'clientId',
  name: 'name',
  description: 'description',
  location: 'location',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export type ProjectKeysType = (typeof ProjectKeys)[keyof typeof ProjectKeys];
