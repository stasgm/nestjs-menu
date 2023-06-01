import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './exceptions/prisma-client-exception/prisma-client-exception.filter';
import { AppConfig } from './modules/core/app-config';
import setupSwagger from './modules/core/setup-swagger';

async function bootstrap(): Promise<string> {
  const appConfig = new AppConfig();

  const port = appConfig.nestPort;

  const app = await NestFactory.create(AppModule, {
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
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupSwagger(app);

  await app.listen(port);

  return `
  \nApplication is running.
    - port: ${port}
    - env: ${appConfig.envPrefix}
    - db host: ${appConfig.postgres.host}
    - db port: ${appConfig.postgres.port}
    - db user: ${appConfig.postgres.user}
    - db name: ${appConfig.postgres.dbname}
  `;
}

(async () => {
  try {
    const url = await bootstrap();
    Logger.log(url, 'Bootstrap');
  } catch (error) {
    Logger.error(error, 'Bootstrap');
  }
})();
