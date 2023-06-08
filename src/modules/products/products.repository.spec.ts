import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../core/prisma/prisma.service';
import { ProductsRepository } from './products.repository';

describe(`ProductsRepository`, () => {
  let repository: ProductsRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProductsRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    repository = module.get(ProductsRepository);
    prismaService = module.get(PrismaService);
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
        repository.createMenuCategory({
          data: { name: mockedMenuCategory.name },
        });

      await expect(createMenuCategory()).resolves.toBe(mockedMenuCategory);
    });
  });
});
