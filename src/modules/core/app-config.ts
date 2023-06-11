import { Injectable } from '@nestjs/common';
import config from 'config';

// import config from 'config';
import { PGCredentials } from '../../types';

@Injectable()
export class AppConfig {
  get envPrefix(): string {
    return config.get('envPrefix');
  }

  get postgresUrl(): string {
    const { dbname, host, port, password, user } = this.postgres;

    // eslint-disable-next-line no-console
    console.log(`postgresql://${user}:${password}@${host}:${port}/${dbname}?schema=public`);
    return `postgresql://${user}:${password}@${host}:${port}/${dbname}?schema=public`;
  }

  get postgres(): Required<PGCredentials> {
    const postgres: Record<string, unknown> = config.has('postgres') ? config.get('postgres') : {};

    return {
      host: postgres.host as string,
      port: postgres.port as number,
      dbname: postgres.dbname as string,
      user: (postgres.user || process.env.POSTGRES_USER) as string,
      password: (postgres.password || process.env.POSTGRES_PASSWORD) as string,
    };
  }

  static get nestApiGlobalPrefix(): string {
    return '/api/v1';
  }

  get nestPort(): number {
    return config.get('nestPort');
  }
}
