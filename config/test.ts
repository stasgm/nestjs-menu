import { IAppConfig } from '../src/types';

const config: IAppConfig = {
  envPrefix: 'test',
  nestPort: 3000,
  postgres: {
    dbname: 'testdb',
    host: 'localhost',
    port: 5434,
    user: 'test_user',
    password: '1234',
  },
};

export default config;
