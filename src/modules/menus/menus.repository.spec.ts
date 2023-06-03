import { Test } from '@nestjs/testing';
import { Menu, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../core/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuRepository } from './menus.repository';

describe(`MenuRepository`, () => {
  let menuRepository: MenuRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MenuRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    menuRepository = moduleRef.get(MenuRepository);
    prismaService = moduleRef.get(PrismaService);
  });

  describe('createMenu', () => {
    it('should create a new menu', async () => {
      const mockedMenuDto: CreateMenuDto = {
        name: 'New menu',
        disabled: false,
        description: 'new menu',
        categories: [1, 2],
        products: undefined,
      };

      const mockedMenuResult: Menu = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: mockedMenuDto.name,
        description: mockedMenuDto.description,
        disabled: mockedMenuDto.disabled,
        products: null,
      };

      prismaService.menu.create.mockResolvedValue(mockedMenuResult);

      const createMenu = async () =>
        menuRepository.createMenu({
          data: mockedMenuDto,
        });

      await expect(createMenu()).resolves.toBe(mockedMenuResult);
    });
  });
});
