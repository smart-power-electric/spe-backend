import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({ type: Number, example: 1, description: 'Id of client' })
  id: number;
  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Name of client',
  })
  name: string;
  @ApiProperty({
    type: String,
    example: 'Email of client',
    description: 'Email of client',
  })
  email: string;
  @ApiPropertyOptional({
    type: String,
    example: '1234567890',
    description: 'Phone number of client',
  })
  phone?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: '123 Main St',
    description: 'Address of client',
  })
  address?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: 'City',
    description: 'City of client',
  })
  city?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: 'State',
    description: 'State of client',
  })
  state?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: '12345',
    description: 'Zip code of client',
  })
  zip?: string | null;

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
    type: String,
    example: 'John Doe',
    description: 'Name of client',
  })
  name: string;
  @ApiProperty({
    type: String,
    example: 'Email of client',
    description: 'Email of client',
  })
  email: string;
  @ApiPropertyOptional({
    type: String,
    example: '1234567890',
    description: 'Phone number of client',
  })
  phone?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: '123 Main St',
    description: 'Address of client',
  })
  address?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: 'City',
    description: 'City of client',
  })
  city?: string | null;
  @ApiPropertyOptional({
    type: String,
    example: 'State',
    description: 'State of client',
  })
  state?: string | null;
  @ApiPropertyOptional({
    type: String,
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
    type: String,
    description: 'Name of client',
    nullable: true,
  })
  name?: string | null;
  @ApiPropertyOptional({
    type: String,
    description: 'Email of client',
    nullable: true,
  })
  email?: string | null;
  @ApiPropertyOptional({
    type: String,
    description: 'Phone number of client',
  })
  phone?: string | null;
  @ApiPropertyOptional({
    type: String,
    description: 'Address of client',
  })
  address?: string | null;
  @ApiPropertyOptional({
    type: String,
    description: 'City of client',
  })
  city?: string | null;
  @ApiPropertyOptional({
    type: String,
    description: 'State of client',
  })
  state?: string | null;
  @ApiPropertyOptional({
    type: String,
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
