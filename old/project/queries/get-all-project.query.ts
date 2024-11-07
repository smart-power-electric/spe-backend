import { Context } from 'src/commons/app-context/context.entity';
import { ServiceFilterQuery } from 'src/infrastructure/dtos/service.dto';

export class GetAllProjectQuery {
  constructor(
    public readonly ctx: Context,
    public readonly filters: ServiceFilterQuery,
    public offset: number,
    public limit: number,
  ) {}
}
