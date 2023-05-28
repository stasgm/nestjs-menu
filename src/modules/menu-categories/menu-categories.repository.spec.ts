import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../core/prisma/prisma.service';
import { MenuCategoryRepository } from './menu-categories.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe(`MenuCategoryRepository`, () => {
  let menuCategoryRepository: MenuCategoryRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MenuCategoryRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    menuCategoryRepository = moduleRef.get(MenuCategoryRepository);
    prismaService = moduleRef.get(PrismaService);
  });

  describe(`createMenuCategory`, () => {
    it(`should create a new menu category`, async () => {
      const mockedMenuCategory = {
        id: 1,
        name: 'New category',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaService.menuCategory.create.mockResolvedValue(mockedMenuCategory);

      const createMenuCategory = () =>
        menuCategoryRepository.createMenuCategory({
          data: { name: mockedMenuCategory.name },
        });

      await expect(createMenuCategory()).resolves.toBe(mockedMenuCategory);
    });
  });
});
