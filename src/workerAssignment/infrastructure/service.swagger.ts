import { ApiProperty } from '@nestjs/swagger';
import {
  CreateWorkerAssignmentDto,
  UpdateWorkerAssignmentDto,
} from '../core/workerAssignment.dto';
import { WorkerAssignment } from '../core/workerAssignment.entity';
import { WorkerAssignmentRow } from './workerAssignment.repository';

export class CreateWorkerAssignmentRequest
  implements CreateWorkerAssignmentDto
{
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerAssignment',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Project ID of the workerAssignment',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Stage ID of the workerAssignment',
    nullable: true,
  })
  stageId: string | null;
  constructor(data: CreateWorkerAssignmentDto) {
    this.workerId = data.workerId;
    this.projectId = data.projectId;
    this.stageId = data.stageId;
  }
}

export class UpdateWorkerAssignmentRequest
  implements UpdateWorkerAssignmentDto
{
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerAssignment',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Project ID of the workerAssignment',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Stage ID of the workerAssignment',
    nullable: true,
  })
  stageId: string | null;
  constructor(data: CreateWorkerAssignmentDto) {
    this.workerId = data.workerId;
    this.projectId = data.projectId;
    this.stageId = data.stageId;
  }
}

export class WorkerAssignmentResponse implements WorkerAssignmentRow {
  @ApiProperty({
    type: 'string',
    description: 'Id of the workerAssignment',
    nullable: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Name of the workerAssignment',
    nullable: true,
  })
  workerId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Project ID of the workerAssignment',
    nullable: true,
  })
  projectId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Stage ID of the workerAssignment',
    nullable: true,
  })
  stageId: string | null;
  @ApiProperty({
    type: 'string',
    description: 'Created at of the workerAssignment',
    nullable: true,
  })
  createdAt: Date | null;
  @ApiProperty({
    type: 'string',
    description: 'Updated at of the workerAssignment',
    nullable: true,
  })
  updatedAt: Date | null;

  constructor(data: WorkerAssignment) {
    this.id = data.id;
    this.workerId = data.workerId;
    this.projectId = data.projectId;
    this.stageId = data.stageId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class WorkerAssignmentPaginationResponse {
  @ApiProperty({
    type: [WorkerAssignmentResponse],
    description: 'Data of the workerAssignment',
    nullable: false,
  })
  data: WorkerAssignmentResponse[];
  @ApiProperty({
    type: 'number',
    description: 'Total of the workerAssignment',
    nullable: false,
  })
  total: number;

  constructor(data: { data: WorkerAssignment[]; total: number }) {
    this.data = data.data.map((d) => new WorkerAssignmentResponse(d));
    this.total = data.total;
  }
}
