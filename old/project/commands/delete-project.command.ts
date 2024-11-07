import { Context } from 'src/commons/app-context/context.entity';

export class DeleteProjectCommand {
  constructor(
    public readonly ctx: Context,
    public readonly id: number,
  ) {}
}
