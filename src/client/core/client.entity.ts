export class Client {
  id: string;
  name: string | null;
  address: string | null;
  tin: string | null;
  contact: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    name: string | null;
    id: string | undefined;
    address: string | null;
    tin: string | null;
    contact: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.name = params.name;
    this.id = params.id ?? '';
    this.address = params.address;
    this.tin = params.tin;
    this.contact = params.contact;
    this.email = params.email;
    this.phone = params.phone;
    this.city = params.city;
    this.state = params.state;
    this.zip = params.zip;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}

export const ClientKeys: { [P in keyof Client]: P } = {
  id: 'id',
  name: 'name',
  address: 'address',
  tin: 'tin',
  contact: 'contact',
  email: 'email',
  phone: 'phone',
  city: 'city',
  state: 'state',
  zip: 'zip',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export type ClientKeysType = (typeof ClientKeys)[keyof typeof ClientKeys];
