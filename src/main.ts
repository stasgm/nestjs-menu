import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './exceptions/prisma-client-exception/prisma-client-exception.filter';
import { AppConfig } from './modules/core/app-config';
import setupSwagger from './modules/core/setup-swagger';

async function bootstrap() {
  const logger = new Logger();
  const appConfig = new AppConfig();

  const port = appConfig.nestPort;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix(AppConfig.nestApiGlobalPrefix);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupSwagger(app);

  await app.listen(port);

  logger.log(`
  \nApplication is running.
    - port: ${port}
    - env: ${appConfig.envPrefix}
    - db host: ${appConfig.postgres.host}
    - db port: ${appConfig.postgres.port}
    - db user: ${appConfig.postgres.user}
    - db name: ${appConfig.postgres.dbname}
  `);
}
bootstrap()
  .then()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`An error occured, ${error}`);
  });
