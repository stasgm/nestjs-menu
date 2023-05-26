export interface IAppConfig {
  envPrefix: string;
  nestPort: number;
  postgres: Record<string, any>;
}
