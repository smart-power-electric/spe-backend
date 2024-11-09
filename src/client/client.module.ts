import { Module } from '@nestjs/common';
import { ClientController } from './infrastructure/client.controller';
import { ClientApplication } from './application/client.application';
import { DrizzleClientRepository } from './infrastructure/client.repository';
import { ClientRepository, ClientUseCases } from './core/client.interface';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import configuration from 'src/common/application/application-config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CommonModule,
  ],
  controllers: [ClientController],
  providers: [
    {
      provide: ClientRepository,
      useClass: DrizzleClientRepository,
    },
    {
      provide: ClientUseCases,
      useClass: ClientApplication,
    },
  ],
})
export class ClientModule {}
