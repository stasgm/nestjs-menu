import { IAppConfig } from '../src/types';

const config: IAppConfig = {
  envPrefix: 'development',
  nestPort: 3000,
  postgres: {
    dbname: 'devdb',
    host: 'localhost',
    port: 5433,
    user: 'dev_user',
    password: '1234',
  },
};

export default config;
