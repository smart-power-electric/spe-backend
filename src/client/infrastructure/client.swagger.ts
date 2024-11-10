import { ClientRow } from './client.repository';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateClientDto, UpdateClientDto } from '../core/client.dto';
import { Client } from '../core/client.entity';

export class CreateClientRequest implements CreateClientDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the client',
    nullable: true,
  })
  name: string;
  @ApiProperty({
    type: 'string',
    description: 'Address of the client',
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the client',
    nullable: true,
  })
  contact: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Email of the client',
    nullable: true,
  })
  email: string;
  @ApiProperty({
    type: 'string',
    description: 'Phone of the client',
    nullable: true,
  })
  phone: string | null;
  @ApiProperty({
    type: 'string',
    description: 'City of the client',
    nullable: true,
  })
  city: string | null;
  @ApiProperty({
    type: 'string',
    description: 'State of the client',
    nullable: true,
  })
  state: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Zip of the client',
    nullable: true,
  })
  zip: string | null;
  constructor(data: CreateClientDto) {
    this.name = data.name;
    this.address = data.address;
    this.contact = data.contact;
    this.email = data.email;
    this.phone = data.phone;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
  }
}

export class UpdateClientRequest implements UpdateClientDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Name of the client',
    nullable: true,
  })
  name?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Address of the client',
    nullable: true,
  })
  address?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Contact of the client',
    nullable: true,
  })
  contact?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Email of the client',
    nullable: true,
  })
  email?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Phone of the client',
    nullable: true,
  })
  phone?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'City of the client',
    nullable: true,
  })
  city?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'State of the client',
    nullable: true,
  })
  state?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Zip of the client',
    nullable: true,
  })
  zip?: string | null;
  constructor(data: UpdateClientDto) {
    this.name = data.name;
    this.address = data.address;
    this.contact = data.contact;
    this.email = data.email;
    this.phone = data.phone;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
  }
}

export class ClientResponse implements ClientRow {
  @ApiProperty({
    type: 'string',
    description: 'Name of the client',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'number',
    description: 'Id of the client',
    nullable: true,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Address of the client',
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Contact of the client',
    nullable: true,
  })
  contact: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Email of the client',
    nullable: true,
  })
  email: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Phone of the client',
    nullable: true,
  })
  phone: string | null;
  @ApiProperty({
    type: 'string',
    description: 'City of the client',
    nullable: true,
  })
  city: string | null;
  @ApiProperty({
    type: 'string',
    description: 'State of the client',
    nullable: true,
  })
  state: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Zip of the client',
    nullable: true,
  })
  zip: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Updated at',
    nullable: true,
  })
  updatedAt: Date | null;
  constructor(data: Client) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.contact = data.contact;
    this.email = data.email;
    this.phone = data.phone;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class ClientPaginationResponse {
  @ApiProperty({
    type: [ClientResponse],
    description: 'List of clients',
    nullable: true,
  })
  data: ClientResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total clients',
    nullable: true,
  })
  total: number;
  constructor(data: { data: Client[]; total: number }) {
    this.data = data.data.map((client) => new ClientResponse(client));
    this.total = data.total;
  }
}
