/* eslint-disable no-console */
// import { PrismaClient } from '@prisma/client';
// import { Migrate } from '@prisma/migrate/dist/Migrate.js';

// export const handler = async (): Promise<string> => {
//   const schemaPath = '/var/task/backend/prisma/schema.prisma';
//   const dbUrl = await loadDatabaseUrl();

//   process.env.DATABASE_URL = dbUrl;

//   const migrate = new Migrate(schemaPath);
// };

import { exec as execCb } from 'node:child_process';
import { promisify } from 'node:util';

import { AppConfig } from '../app-config';

const exec = promisify(execCb);

// TODO: re-write this when Prisma.io gets a programmatic migration public API
// https://github.com/prisma/prisma/issues/4703
async function prismaMigrate(databaseUrl: string, withReset = false): Promise<void> {
  // throws an error if migration fails
  const command = withReset ? 'npx prisma migrate reset -f --skip-seed' : 'npx prisma migrate dev';
  const { stdout, stderr } = await exec(command, {
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
  });

  console.log(stdout);
  console.log(stderr);
}

const appConfig = new AppConfig();
prismaMigrate(appConfig.postgresUrl, appConfig.envPrefix === 'test');
