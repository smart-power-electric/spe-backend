import { Context } from 'src/commons/app-context/context.entity';
import { CreateClientRequest } from 'src/infrastructure/dtos/client.dto';

export class UpdateClientCommand {
  constructor(
    public readonly ctx: Context,
    public readonly id: number,
    public readonly client: Partial<CreateClientRequest>,
  ) {}
}
