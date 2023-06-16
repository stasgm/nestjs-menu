import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { AppConfig } from '../app-config';

export const getPrismaDataSource = () => {
  return {
    datasources: {
      db: {
        url: new AppConfig().postgresUrl,
      },
    },
  };
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private appConfig: AppConfig) {
    super({
      ...getPrismaDataSource(),
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    let retries = 1;

    while (retries > 0) {
      try {
        await this.$connect();
        this.logger.log('Successfully connected to postgres database');

        break;
      } catch (error) {
        this.logger.error(error);
        this.logger.error(`There was an error connecting to database, retrying .... (${retries})`);

        retries = retries - 1;

        if (retries === 0) {
          throw new Error(error);
        }

        await new Promise((res) => setTimeout(res, 3000)); // wait for three seconds
      }
    }

    // this.$on('query' as any, async (e: any) => {
    //   this.logger.debug(`(${e.duration}ms) ${e.query}`);
    // });
  }

  async cleanDatabase() {
    if (this.appConfig.envPrefix !== 'test') return;

    const models = Prisma.dmmf.datamodel.models;

    return Promise.all(models.map((model) => this[model.name].deleteMany()));
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
