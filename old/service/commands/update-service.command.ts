import { Context } from 'src/commons/app-context/context.entity';
import { CreateServiceRequest } from 'src/infrastructure/dtos/service.dto';

export class UpdateServiceCommand {
  constructor(
    public readonly ctx: Context,
    public readonly id: number,
    public readonly service: Partial<CreateServiceRequest>,
  ) {}
}
