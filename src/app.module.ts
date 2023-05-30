import { Module } from '@nestjs/common';

import { PrismaModule } from './modules/core/prisma/prisma.module';
import { MenuCategoriesModule } from './modules/menu-categories/menu-categories.module';
import { MenusModule } from './modules/menus/menus.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [ProductsModule, PrismaModule, MenusModule, MenuCategoriesModule],
})
export class AppModule {}
