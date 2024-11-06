import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/application/application-config/configuration';
import { CommonModule } from './common/common.module';
import { VersionModule } from './version/version.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CommonModule,
    VersionModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
