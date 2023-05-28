import { Module } from '@nestjs/common';

import { ProductsModule } from './modules/products/products.module';
import { PrismaModule } from './modules/core/prisma/prisma.module';
import { MenusModule } from './modules/menus/menus.module';
import { MenuCategoriesModule } from './modules/menu-categories/menu-categories.module';

@Module({
  imports: [ProductsModule, PrismaModule, MenusModule, MenuCategoriesModule],
})
export class AppModule {}
