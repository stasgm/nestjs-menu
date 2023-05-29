import { Injectable } from '@nestjs/common';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategoryRepository } from './menu-categories.repository';

@Injectable()
export class MenuCategoriesService {
  constructor(private menuCategoryRepository: MenuCategoryRepository) {}

  create(createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoryRepository.createMenuCategory({
      data: createMenuCategoryDto,
    });
  }

  findAll() {
    return this.menuCategoryRepository.getMenuCategories({});
  }

  findByID(id: number) {
    return this.menuCategoryRepository.getMenuCategory({ where: { id } });
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
