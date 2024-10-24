import { Inject, Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { ILogger } from 'src/commons/logging/logger.interface';
import { KeycloakAdminClient } from '@s3pweb/keycloak-admin-client-cjs';
import { ConfigService } from '@nestjs/config';
import { KeycloakConfig } from '../application-config/configuration.entity';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    @Inject(ILogger) private logger: ILogger,
  ) {
    this.logger.init('KeycloakConfigService', 'info');
  }

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.get<KeycloakConfig>('keycloak')?.baseUrl ?? 'localhost:8080/auth',
      realm: this.configService.get<KeycloakConfig>('keycloak')?.realmName ?? 'tester',
      clientId: this.configService.get<KeycloakConfig>('keycloak')?.clientId ?? 'tester-client',
      secret: this.configService.get<KeycloakConfig>('keycloak')?.secret ?? 'secret',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }

  async newKeycloakAdmin(): Promise<KeycloakAdminClient> {
    const kcAdminClient = new KeycloakAdminClient(this.configService.get<KeycloakConfig>('keycloak'));
    await kcAdminClient.auth({
      clientId: this.configService.get<KeycloakConfig>('keycloak')?.clientId ?? 'tester-client',
      clientSecret: this.configService.get<KeycloakConfig>('keycloak')?.secret ?? 'secret',
      grantType: 'client_credentials',
    });
    return kcAdminClient;
  }
}
