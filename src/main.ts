import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  Logger,
  ValidationError,
} from '@nestjs/common';

import setupSwagger from './modules/core/setupSwagger';
import { AppModule } from './app.module';
import { AppConfig } from './modules/core/AppConfig';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { useContainer } from 'class-validator';
import { PrismaClientExceptionFilter } from './exceptions/prisma-client-exception/prisma-client-exception.filter';
import { BadRequestExceptionFilter } from './exceptions/bad-request-exception.filter';

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
  // app.useGlobalFilters(new BadRequestExceptionFilter());
  // app.useGlobalFilters(new HttpExceptionFilter());

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
  .catch((err) => {
    console.error(`An error occured, ${err}`);
  });
