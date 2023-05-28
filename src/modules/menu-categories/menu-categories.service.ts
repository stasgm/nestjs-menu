import { Injectable } from '@nestjs/common';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { PrismaService } from '../core/prisma/prisma.service';
import { MenuCategoryRepository } from './menu-categories.repository';

@Injectable()
export class MenuCategoriesService {
  constructor(
    private prisma: PrismaService,
    private repository: MenuCategoryRepository,
  ) {}

  create(createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.repository.createMenuCategory({
      data: createMenuCategoryDto,
    });
  }

  findAll() {
    return this.repository.getMenuCategories({});
  }

  findByID(id: number) {
    return this.repository.getMenuCategory({ where: { id } });
  }

  update(id: number, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    return this.repository.updateMenuCategory({
      where: { id },
      data: updateMenuCategoryDto,
    });
  }

  remove(id: number) {
    return this.repository.deleteMenuCategory({ where: { id } });
  }
}
