import { Test, TestingModule } from '@nestjs/testing';

import { MenuCategoriesController } from './menu-categories.controller';
import { MenuCategoriesService } from './menu-categories.service';

const menuCategoriesMocked = [
  {
    id: 1,
    name: 'Category 1',
  },
  {
    id: 2,
    name: 'Category 2',
  },
];

describe('MenuCategoriesController', () => {
  let controller: MenuCategoriesController;
  let service: MenuCategoriesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuCategoriesController],
      providers: [],
    })
      .useMocker((token) => {
        if (token === MenuCategoriesService) {
          return {
            findByID: jest.fn().mockResolvedValue(menuCategoriesMocked[0]),
            findAll: jest.fn().mockResolvedValue(menuCategoriesMocked),
            create: jest.fn().mockResolvedValue(menuCategoriesMocked[0]),
            update: jest.fn().mockResolvedValue(menuCategoriesMocked[0]),
            remove: jest.fn().mockResolvedValue(menuCategoriesMocked[0]),
          };
        }
        return {};
      })
      .compile();

    controller = module.get<MenuCategoriesController>(MenuCategoriesController);
    service = module.get<MenuCategoriesService>(MenuCategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get the list of menu categories', async () => {
    const menuCategoriesResult = await controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findAll).toHaveBeenCalledWith();
    expect(typeof menuCategoriesResult).toBe('object');
    expect(menuCategoriesResult[0].id).toBe(menuCategoriesMocked[0].id);
    expect(menuCategoriesResult[0].name).toBe(menuCategoriesMocked[0].name);
    expect(menuCategoriesResult.length).toBe(menuCategoriesMocked.length);
  });

  it('should get a menu category', async () => {
    const id = menuCategoriesMocked[0].id;
    const menuCategoryResult = await controller.findOne(id);

    expect(service.findByID).toHaveBeenCalledTimes(1);
    expect(service.findByID).toHaveBeenCalledWith(id);
    expect(typeof menuCategoryResult).toBe('object');
    expect(menuCategoryResult.id).toBe(menuCategoriesMocked[0].id);
    expect(menuCategoryResult.name).toBe(menuCategoriesMocked[0].name);
  });

  it('should create and return new menu category', async () => {
    const createDto = {
      name: menuCategoriesMocked[0].name,
    };

    const menuCategoryResult = await controller.create(createDto);

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(createDto);
    expect(typeof menuCategoryResult).toBe('object');
    expect(menuCategoryResult.id).toBe(menuCategoriesMocked[0].id);
    expect(menuCategoryResult.name).toBe(createDto.name);
  });

  it('should update and return menu category', async () => {
    const id = menuCategoriesMocked[0].id;
    const updateDto = {
      name: menuCategoriesMocked[0].name,
    };

    const menuCategoryResult = await controller.update(id, updateDto);

    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(id, updateDto);
    expect(typeof menuCategoryResult).toBe('object');
    expect(menuCategoryResult.id).toBe(id);
    expect(menuCategoryResult.name).toBe(updateDto.name);
  });

  it('should remove and return menu category', async () => {
    const id = menuCategoriesMocked[0].id;

    const menuCategoryResult = await controller.remove(id);

    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(id);
    expect(typeof menuCategoryResult).toBe('object');
    expect(menuCategoryResult.id).toBe(id);
    expect(menuCategoryResult.name).toBe(menuCategoriesMocked[0].name);
  });
});
