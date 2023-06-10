import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../core/prisma/prisma.service';
import { MenuCategoryRepository } from './menu-categories.repository';
import { MenuCategoriesService } from './menu-categories.service';

describe('MenuCategoriesService', () => {
  let service: MenuCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuCategoriesService, MenuCategoryRepository, PrismaService],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    service = module.get<MenuCategoriesService>(MenuCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
