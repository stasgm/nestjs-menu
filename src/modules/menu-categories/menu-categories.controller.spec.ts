import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../core/prisma/prisma.service';
import { MenuCategoriesController } from './menu-categories.controller';
import { MenuCategoryRepository } from './menu-categories.repository';
import { MenuCategoriesService } from './menu-categories.service';

describe('MenuCategoriesController', () => {
  let controller: MenuCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuCategoriesController],
      providers: [MenuCategoriesService, MenuCategoryRepository, PrismaService],
    }).compile();

    controller = module.get<MenuCategoriesController>(MenuCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
