import { Module } from '@nestjs/common';
import { ProjectApplication } from './application/project.application';
import { DrizzleProjectRepository } from './infrastructure/project.repository';
import { ProjectRepository, ProjectUseCases } from './core/project.interface';
import { ProjectController } from './infrastructure/project.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [ProjectController],
  providers: [
    {
      provide: ProjectRepository,
      useClass: DrizzleProjectRepository,
    },
    {
      provide: ProjectUseCases,
      useClass: ProjectApplication,
    },
  ],
})
export class ProjectModule {}
