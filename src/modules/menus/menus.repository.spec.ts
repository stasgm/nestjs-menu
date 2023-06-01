import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
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

  describe(`createMenu`, () => {
    it(`should create a new menu`, async () => {
      const mockedMenu: CreateMenuDto = {
        id: 1,
        name: 'New menu',
        createdAt: new Date(),
        updatedAt: new Date(),
        disabled: false,
        description: 'new menu',
        categories: [1, 2],
      };

      prismaService.menu.create.mockResolvedValue(mockedMenu);

      const createMenu = () =>
        menuRepository.createMenu({
          createMenuDto: mockedMenu,
        });

      await expect(createMenu()).resolves.toBe(mockedMenu);
    });
  });
});
