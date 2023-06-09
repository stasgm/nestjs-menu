import { Module } from '@nestjs/common';

import { PrismaModule } from '../core/prisma/prisma.module';
import { ProductController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductNotExistsRule } from './validation-rules/product-not-exists.rule';

@Module({
  controllers: [ProductController],
  providers: [ProductsService, ProductsRepository, ProductNotExistsRule],
  imports: [PrismaModule],
})
export class ProductsModule {}
