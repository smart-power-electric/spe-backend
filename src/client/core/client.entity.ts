export class Client {
  name: string | null;
  id: number;
  address: string | null;
  contact: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(params: {
    name: string | null;
    id: number;
    address: string | null;
    contact: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.name = params.name;
    this.id = params.id;
    this.address = params.address;
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
