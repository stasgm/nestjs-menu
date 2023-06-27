import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './exceptions/prisma-client-exception/prisma-client-exception.filter';
import { AppConfig } from './modules/core/app-config';
import { LoggerInterceptor } from './modules/core/logging.interceptor';
import setupSwagger from './modules/core/setup-swagger';

async function bootstrap(): Promise<string> {
  const appConfig = new AppConfig();

  const port = appConfig.nestPort;
  const logLevels: LogLevel[] = appConfig.isProduction
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'debug', 'verbose'];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  app.setGlobalPrefix(AppConfig.nestApiGlobalPrefix);
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new LoggerInterceptor());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupSwagger(app);

  await app.listen(port);

  return `
  \n🚀 Application is running.
    - port: ${port}
    - env: ${appConfig.envPrefix}
    - db host: ${appConfig.postgres.host}
    - db port: ${appConfig.postgres.port}
    - db user: ${appConfig.postgres.user}
    - db name: ${appConfig.postgres.dbname}
  `;
}

(async () => {
  const logger = new Logger('Bootstrap');
  try {
    const msg = await bootstrap();
    logger.log(msg);
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error(error);
    logger.error(error);
  }
})();
