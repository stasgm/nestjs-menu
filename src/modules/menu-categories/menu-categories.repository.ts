import { Injectable } from '@nestjs/common';
import { MenuCategory, Prisma } from '@prisma/client';

import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class MenuCategoryRepository {
  constructor(private prisma: PrismaService) {}

  async createMenuCategory(params: { data: Prisma.MenuCategoryCreateInput }): Promise<MenuCategory> {
    const { data } = params;

    return this.prisma.menuCategory.create({ data });
  }

  getMenuCategory(params: { where: Prisma.MenuCategoryWhereUniqueInput }): Promise<MenuCategory | null> {
    const { where } = params;
    return this.prisma.menuCategory.findUnique({ where });
  }

  async getMenuCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MenuCategoryWhereUniqueInput;
    where?: Prisma.MenuCategoryWhereInput;
    orderBy?: Prisma.MenuCategoryOrderByWithRelationInput;
  }): Promise<MenuCategory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.menuCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateMenuCategory(params: {
    where: Prisma.MenuCategoryWhereUniqueInput;
    data: Prisma.MenuCategoryUpdateInput;
  }): Promise<MenuCategory> {
    const { where, data } = params;
    return this.prisma.menuCategory.update({ where, data });
  }

  async deleteMenuCategory(params: { where: Prisma.MenuCategoryWhereUniqueInput }): Promise<MenuCategory> {
    const { where } = params;
    return this.prisma.menuCategory.delete({ where });
  }
}
