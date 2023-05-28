import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { PGCredentials } from '../../types';

@Injectable()
export class AppConfig {
  get envPrefix(): string {
    return config.get('envPrefix');
  }

  get postgres(): PGCredentials {
    const postgres: Record<string, unknown> = config.has('postgres')
      ? config.get('postgres')
      : {};

    return {
      host: (postgres.host || process.env.POSTGRES_HOST) as string,
      port: (postgres.port || process.env.POSTGRES_PORT) as number,
      user: (postgres.user || process.env.POSTGRES_USER) as string,
      dbname: (postgres.dbname || process.env.POSTGRES_DB) as string,
    };
  }

  static get nestApiGlobalPrefix(): string {
    return '/api/v1';
  }

  get nestPort(): number {
    return config.get('nestPort');
  }
}
