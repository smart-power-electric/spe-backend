import { Context } from 'src/commons/app-context/context.entity';
import { ClientFilterQuery } from 'src/infrastructure/dtos/client.dto';

export class GetAllClientQuery {
  constructor(
    public readonly ctx: Context,
    public readonly filters: ClientFilterQuery,
    public offset: number,
    public limit: number,
  ) {}
}
