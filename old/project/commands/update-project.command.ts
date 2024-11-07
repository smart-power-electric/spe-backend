import { Context } from 'src/commons/app-context/context.entity';
import { CreateProjectRequest } from 'src/infrastructure/dtos/project.dto';

export class UpdateProjectCommand {
  constructor(
    public readonly ctx: Context,
    public readonly id: number,
    public readonly project: Partial<CreateProjectRequest>,
  ) {}
}
