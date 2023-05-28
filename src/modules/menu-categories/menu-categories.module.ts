import { Module } from '@nestjs/common';
import { MenuCategoriesService } from './menu-categories.service';
import { MenuCategoriesController } from './menu-categories.controller';
import { PrismaModule } from '../core/prisma/prisma.module';
import { MenuCategoryRepository } from './menu-categories.repository';
import { MenuCategoryExistsRule } from './validation-rules/menu-category-exists.rule';

@Module({
  controllers: [MenuCategoriesController],
  providers: [
    MenuCategoryRepository,
    MenuCategoriesService,
    MenuCategoryExistsRule,
  ],
  imports: [PrismaModule],
})
export class MenuCategoriesModule {}
