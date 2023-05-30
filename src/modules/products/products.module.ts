import { Module } from '@nestjs/common';

import { PrismaModule } from '../core/prisma/prisma.module';
import { ProductController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductService } from './products.service';
import { ProductExistsRule } from './validation-rules/product-exists.rule';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductsRepository, ProductExistsRule],
  imports: [PrismaModule],
})
export class ProductsModule {}
