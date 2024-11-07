import { Context } from 'src/commons/app-context/context.entity';
import { CreateServiceRequest } from 'src/infrastructure/dtos/service.dto';

export class CreateServiceCommand {
  constructor(
    public readonly ctx: Context,
    public readonly service: CreateServiceRequest,
  ) {}
}
