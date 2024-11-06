import { Client } from '../core/client.entity';
import { ClientNew, ClientRow } from './client.repository';

export function toClient(row: ClientRow): Client {
  return new Client({
    id: row.id,
    name: row.name,
    address: row.address,
    contact: row.contact,
    email: row.email,
    phone: row.phone,
    city: row.city,
    state: row.state,
    zip: row.zip,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  });
}

export function toClientRow(client: Client): ClientRow {
  return {
    id: client.id,
    name: client.name,
    address: client.address,
    contact: client.contact,
    email: client.email,
    phone: client.phone,
    city: client.city,
    state: client.state,
    zip: client.zip,
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
}

export function toClientNew(client: Client): ClientNew {
  return {
    name: client.name,
    address: client.address,
    contact: client.contact,
    email: client.email,
    phone: client.phone,
    city: client.city,
    state: client.state,
    zip: client.zip,
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
}
