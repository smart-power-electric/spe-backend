import { Context } from 'src/commons/app-context/context.entity';
import { CreateClientRequest } from 'src/infrastructure/dtos/client.dto';

export class CreateClientCommand {
  constructor(
    public readonly ctx: Context,
    public readonly client: CreateClientRequest,
  ) {}
}
