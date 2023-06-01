import { Module } from '@nestjs/common';

import { PrismaModule } from '../core/prisma/prisma.module';
import { MenuCategoriesController } from './menu-categories.controller';
import { MenuCategoryRepository } from './menu-categories.repository';
import { MenuCategoriesService } from './menu-categories.service';
import { IsMenuCategoryNotExistRule, MenuCategoryExistsRule } from './validation-rules';

@Module({
  controllers: [MenuCategoriesController],
  providers: [MenuCategoryRepository, MenuCategoriesService, MenuCategoryExistsRule, IsMenuCategoryNotExistRule],
  imports: [PrismaModule],
  exports: [MenuCategoryExistsRule, IsMenuCategoryNotExistRule],
})
export class MenuCategoriesModule {}
