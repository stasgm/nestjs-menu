export type PGCredentials = {
  host: string;
  port: number;
  dbname: string;
  user?: string;
  password?: string;
};

export interface IAppConfig {
  envPrefix: string;
  nestPort: number;
  postgres?: PGCredentials;
}
