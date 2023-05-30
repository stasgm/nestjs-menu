import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfig } from './app-config';

export default (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Menu Server API')
    .setDescription('Menu API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(AppConfig.nestApiGlobalPrefix, app, document);
};
