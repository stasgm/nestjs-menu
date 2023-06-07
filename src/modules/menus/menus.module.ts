import { Module } from '@nestjs/common';

import { PrismaModule } from '../core/prisma/prisma.module';
import { ProductsModule } from '../products/products.module';
import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';
import { MenusController } from './menus.controller';
import { MenuRepository } from './menus.repository';
import { MenusService } from './menus.service';
import { IsMenuNotExistRule, MenuExistsRule } from './validation-rules/';

@Module({
  controllers: [MenusController],
  providers: [MenusService, MenuRepository, MenuExistsRule, IsMenuNotExistRule, ProductsService, ProductsRepository],
  imports: [PrismaModule, ProductsModule],
})
export class MenusModule {}
