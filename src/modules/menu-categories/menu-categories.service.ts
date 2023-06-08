import { Injectable } from '@nestjs/common';
import { MenuCategory } from '@prisma/client';

import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategoryRepository } from './menu-categories.repository';

@Injectable()
export class MenuCategoriesService {
  constructor(private menuCategoryRepository: MenuCategoryRepository) {}

  findAll(): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.getMenuCategories({});
  }

  findByID(id: number): Promise<MenuCategory | null> {
    return this.menuCategoryRepository.getMenuCategory({ where: { id } });
  }

  findByName(name: string): Promise<MenuCategory | null> {
    return this.menuCategoryRepository.getMenuCategory({ where: { name } });
  }

  create(createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoryRepository.createMenuCategory({
      data: createMenuCategoryDto,
    });
  }

  update(id: number, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    return this.menuCategoryRepository.updateMenuCategory({
      where: { id },
      data: updateMenuCategoryDto,
    });
  }

  remove(id: number) {
    return this.menuCategoryRepository.deleteMenuCategory({ where: { id } });
  }
}
