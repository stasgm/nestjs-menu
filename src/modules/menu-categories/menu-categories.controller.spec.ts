import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../core/prisma/prisma.service';
import { MenuCategoriesController } from './menu-categories.controller';
import { MenuCategoryRepository } from './menu-categories.repository';
import { MenuCategoriesService } from './menu-categories.service';

describe('MenuCategoriesController', () => {
  let controller: MenuCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuCategoriesController],
      providers: [PrismaService, MenuCategoryRepository, MenuCategoriesService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<MenuCategoriesController>(MenuCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
