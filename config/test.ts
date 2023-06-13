import { IAppConfig } from '../src/types';

const config: IAppConfig = {
  envPrefix: 'test',
  nestPort: 3000,
  postgres: {
    dbname: 'testdb',
    host: '192.168.100.9',
    port: 5434,
    user: 'test_user',
    password: '1234',
  },
};

export default config;
