import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../core/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuRepository } from './menus.repository';

describe(`MenuRepository`, () => {
  let menuCategoryRepository: MenuRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MenuRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    menuCategoryRepository = moduleRef.get(MenuRepository);
    prismaService = moduleRef.get(PrismaService);
  });

  describe(`createMenuCategory`, () => {
    it(`should create a new menu category`, async () => {
      const mockedMenuCategory: CreateMenuDto = {
        id: 1,
        name: 'New menu',
        createdAt: new Date(),
        updatedAt: new Date(),
        disabled: false,
        description: 'new menu',
        categories: {},
      };

      prismaService.menu.create.mockResolvedValue(mockedMenuCategory);

      const createMenuCategory = () =>
        menuCategoryRepository.createMenu({
          data: { name: mockedMenuCategory.name },
        });

      await expect(createMenuCategory()).resolves.toBe(mockedMenuCategory);
    });
  });
});
