import { Context } from 'src/commons/app-context/context.entity';
import { CreateProjectRequest } from 'src/infrastructure/dtos/project.dto';

export class CreateProjectCommand {
  constructor(
    public readonly ctx: Context,
    public readonly project: CreateProjectRequest,
  ) {}
}
