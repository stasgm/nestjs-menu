import { Injectable } from '@nestjs/common';
import * as config from 'config';

@Injectable()
export class AppConfig {
  get envPrefix(): string {
    return config.get('envPrefix');
  }

  get postgres(): string {
    return config.get('postgres');
  }

  static get nestApiGlobalPrefix(): string {
    return '/api/v1';
  }

  get nestPort(): number {
    return config.get('nestPort');
  }
}
