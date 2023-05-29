import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { PrismaModule } from '../core/prisma/prisma.module';
import { ProductsRepository } from './products.repository';
import { ProductExistsRule } from './validation-rules/product-exists.rule';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductsRepository, ProductExistsRule],
  imports: [PrismaModule],
})
export class ProductsModule {}
