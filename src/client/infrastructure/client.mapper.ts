import { CreateClientDto } from '../core/client.dto';
import { Client } from '../core/client.entity';
import { ClientNew, ClientRow } from './client.repository';

export function CreateDtoToClient(dto: CreateClientDto): Client {
  return new Client({
    id: undefined,
    name: dto.name,
    address: dto.address,
    contact: dto.contact,
    email: dto.email,
    phone: dto.phone,
    city: dto.city,
    state: dto.state,
    zip: dto.zip,
    createdAt: new Date(),
    updatedAt: null,
  });
}
export function RowtoClient(row: ClientRow): Client {
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
    createdAt: row.createdAt ?? new Date(),
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
