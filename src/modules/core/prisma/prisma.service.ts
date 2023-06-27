import { Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { AppConfig } from '../app-config';

export const getPrismaDataSource = (postgresUrl?: string) => {
  return {
    datasources: {
      db: {
        url: postgresUrl ?? new AppConfig().postgresUrl,
      },
    },
  };
};

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query'> {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private appConfig: AppConfig) {
    super({
      ...getPrismaDataSource(appConfig.postgresUrl),
      log: ['query'],
      errorFormat: 'pretty',
    });

    this.$on('query', (e) => {
      this.logger.debug(`Query: (${e.duration}ms) ${e.query}`);
    });
  }

  async onModuleInit() {
    await this.retryConnect();
  }

  private async retryConnect(attempt = 1): Promise<void> {
    if (attempt >= this.appConfig.dbConnectAttempts) {
      this.logger.error(
        `Failed to connect to database after ${attempt} attempts. Please check your database connection and restart the app`,
        undefined,
        'PrismaService',
      );

      throw new Error(
        `Failed to connect to database after ${attempt} attempts. Please check your database connection and restart the app`,
      );
    }

    this.logger.log(`Connecting to database. Attempt ${attempt}...`);

    try {
      await this.$connect();
      this.logger.log('Successfully connected to postgres database');
    } catch (error) {
      this.logger.error(`Failed to connect to database. Attempt ${attempt}`, error.stack, 'PrismaService');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return this.retryConnect(attempt + 1);
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.logger.log('Successfully disconnected from postgres database');
    } catch (error) {
      this.logger.error(`Failed to disconnect from database: ${error.stack}`, undefined, 'PrismaService');
    }
  }

  // async onModuleInit() {
  //   let retries = 1;

  //   while (retries > 0) {
  //     try {
  //       await this.$connect();
  //       this.logger.log('Successfully connected to postgres database');

  //       break;
  //     } catch (error) {
  //       this.logger.error(error);
  //       this.logger.error(`There was an error connecting to database, retrying .... (${retries})`);

  //       retries = retries - 1;

  //       if (retries === 0) {
  //         throw new Error(error);
  //       }

  //       await new Promise((res) => setTimeout(res, 3000)); // wait for three seconds
  //     }
  //   }

  //   // this.$on('query' as any, async (e: any) => {
  //   //   this.logger.debug(`(${e.duration}ms) ${e.query}`);
  //   // });
  // }

  async cleanDatabase() {
    if (this.appConfig.envPrefix !== 'test') return;

    const models = Prisma.dmmf.datamodel.models;

    return Promise.all(models.map((model) => this[model.name].deleteMany()));
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }
}
