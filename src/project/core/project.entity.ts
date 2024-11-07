export class Project {
  id: string;
  clientId: string | null;
  name: string | null;
  description: string | null;
  location: string | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    clientId: string | null;
    name: string | null;
    description: string | null;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.clientId = params.clientId;
    this.name = params.name;
    this.description = params.description;
    this.location = params.location;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
