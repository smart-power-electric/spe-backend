import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({ type: 'integer', example: 1, description: 'Id of client' })
  id: number;
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    description: 'Name of client',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    example: 'Email of client',
    description: 'Email of client',
  })
  email: string;
  @ApiPropertyOptional({
    type: 'string',
    example: '1234567890',
    description: 'Phone number of client',
  })
  phone?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: '123 Main St',
    description: 'Address of client',
  })
  address?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: 'City',
    description: 'City of client',
  })
  city?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: 'State',
    description: 'State of client',
  })
  state?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: '12345',
    description: 'Zip code of client',
  })
  zip?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: 'Country',
    description: 'Country of client',
  })
  country?: string | null;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zip: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}

export class CreateClientRequest {
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    description: 'Name of client',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    example: 'Email of client',
    description: 'Email of client',
  })
  email: string;
  @ApiPropertyOptional({
    type: 'string',
    example: '1234567890',
    description: 'Phone number of client',
  })
  phone?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: '123 Main St',
    description: 'Address of client',
  })
  address?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: 'City',
    description: 'City of client',
  })
  city?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: 'State',
    description: 'State of client',
  })
  state?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    example: '12345',
    description: 'Zip code of client',
  })
  zip?: string | null;
 

  constructor(
    name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zip: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}

export class ClientFilterQuery {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Name of client',
    nullable: true,
  })
  name?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Email of client',
    nullable: true,
  })
  email?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Phone number of client',
  })
  phone?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Address of client',
  })
  address?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'City of client',
  })
  city?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'State of client',
  })
  state?: string | null;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Zip code of client',
  })
  zip?: string | null;

  constructor(
    name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zip: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}
