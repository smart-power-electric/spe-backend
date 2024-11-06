import { Module } from '@nestjs/common';
import { ClientController } from './infrastructure/client.controller';
import { ClientService } from './application/client.service';
import { DrizzleClientRepository } from './infrastructure/client.repository';
import { ClientRepository } from './core/client.interface';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    {
      provide: ClientRepository,
      useClass: DrizzleClientRepository,
    },
  ],
})
export class ClientModule {}
