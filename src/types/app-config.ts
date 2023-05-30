export type PGCredentials = {
  host: string;
  port: number;
  user: string;
  dbname: string;
};

export interface IAppConfig {
  envPrefix: string;
  nestPort: number;
  postgres?: PGCredentials;
}
