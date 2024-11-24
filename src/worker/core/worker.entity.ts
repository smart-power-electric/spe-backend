export class Worker {
  id: string;
  workerRatesId: string | null;
  name: string | null;
  contact: string | null;
  address: string | null;
  phone: string | null;
  socialSecurity: string | null;
  startDate: Date | null;
  endDate: Date | null;
  speciality: string | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    workerRatesId: string | null;
    name: string | null;
    contact: string | null;
    address: string | null;
    phone: string | null;
    socialSecurity: string | null;
    startDate: Date | null;
    endDate: Date | null;
    speciality: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.workerRatesId = params.workerRatesId;
    this.name = params.name;
    this.contact = params.contact;
    this.address = params.address;
    this.phone = params.phone;
    this.socialSecurity = params.socialSecurity;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.speciality = params.speciality;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
export const WorkerKeys: { [P in keyof Worker]: P } = {
  id: 'id',
  workerRatesId: 'workerRatesId',
  name: 'name',
  contact: 'contact',
  address: 'address',
  phone: 'phone',
  socialSecurity: 'socialSecurity',
  startDate: 'startDate',
  endDate: 'endDate',
  speciality: 'speciality',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export type WorkerKeysType = (typeof WorkerKeys)[keyof typeof WorkerKeys];
