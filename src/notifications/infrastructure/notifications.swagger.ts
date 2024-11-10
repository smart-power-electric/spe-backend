import { ApiProperty } from '@nestjs/swagger';
import { NotificationsRow } from './notifications.repository';
import {
  CreateNotificationsDto,
  UpdateNotificationsDto,
} from '../core/notifications.dto';
import { Notifications } from '../core/notifications.entity';

export class CreateNotificationsRequest implements CreateNotificationsDto {
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  invoiceId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  clientId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  status: string | null;

  constructor(data: CreateNotificationsDto) {
    this.invoiceId = data.invoiceId;
    this.clientId = data.clientId;
    this.status = data.status;
  }
}

export class UpdateNotificationsRequest implements UpdateNotificationsDto {
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  invoiceId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  clientId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  status: string | null;

  constructor(data: UpdateNotificationsDto) {
    this.invoiceId = data.invoiceId;
    this.clientId = data.clientId;
    this.status = data.status;
  }
}

export class NotificationsResponse implements NotificationsRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  invoiceId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  clientId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Id of the notifications',
    nullable: true,
  })
  status: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the notifications',
    nullable: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the notifications',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: Notifications) {
    this.id = data.id;
    this.invoiceId = data.invoiceId;
    this.clientId = data.clientId;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class NotificationsPaginationResponse {
  @ApiProperty({
    type: [NotificationsResponse],
    description: 'Data of the notifications',
    nullable: false,
  })
  data: NotificationsResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the notifications',
    nullable: false,
  })
  total: number;

  constructor(data: { data: Notifications[]; total: number }) {
    this.data = data.data.map((d) => new NotificationsResponse(d));
    this.total = data.total;
  }
}
