import { Module } from '@nestjs/common';
import { ClientController } from './infrastructure/client.controller';
import { ClientApplication } from './application/client.application';
import { DrizzleClientRepository } from './infrastructure/client.repository';
import { ClientRepository, ClientUseCases } from './core/client.interface';

@Module({
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
