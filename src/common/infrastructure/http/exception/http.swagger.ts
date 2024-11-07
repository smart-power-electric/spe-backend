import { ApiProperty } from '@nestjs/swagger';

export class ApplicationExceptionResponse {
  @ApiProperty({ type: 'number', example: 500 })
  statusCode: number;
  @ApiProperty({ type: 'string', example: '2021-09-01T00:00:00.000Z' })
  timestamp: string;
  @ApiProperty({ type: 'string', example: 'An error occurred' })
  message: string;
  @ApiProperty({ type: 'string', example: 'Error' })
  name: string;
  @ApiProperty({ type: 'string', example: '/api/v1/health' })
  path: string;
  @ApiProperty({ type: 'string', example: '123456' })
  requestId: string;
  constructor(
    statusCode: number,
    timestamp: string,
    message: string,
    name: string,
    path: string,
    requestId: string,
  ) {
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.message = message;
    this.name = name;
    this.path = path;
    this.requestId = requestId;
  }
}
