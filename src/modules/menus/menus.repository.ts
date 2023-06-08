import { Injectable } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';

import { PrismaService } from '../core/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuLineDto } from './dto/create-menu-line.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

const menuInclude = Prisma.validator<Prisma.MenuInclude>()({
  _count: {
    select: {
      categories: true,
    },
  },
  categories: true,
});

@Injectable()
export class MenuRepository {
  constructor(private prisma: PrismaService) {}

  async createMenu(params: { data: CreateMenuDto }): Promise<Menu> {
    const { data } = params;

    const categories = this.connectCategoriesById(data.categories);
    const lines = this.convertLines(data.lines);

    return this.prisma.menu.create({
      data: {
        ...data,
        lines,
        categories,
      },
      include: {
        categories: { select: { name: true } },
      },
    });
  }

  // getMenuByName(name: string): Promise<Menu | null> {
  //   return this.getMenu({ where: { name } });
  // }

  getMenu(params: { where: Prisma.MenuWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.menu.findUnique({ where, include: menuInclude });
  }

  // getMenuById(id: number): Promise<Menu | null> {
  //   return this.getMenu({ where: { id } });
  // }

  async getMenus(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MenuWhereUniqueInput;
    where?: Prisma.MenuWhereInput;
    orderBy?: Prisma.MenuOrderByWithRelationInput;
  }): Promise<Menu[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.menu.findMany({
      skip,
      include: menuInclude,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateMenu(params: { where: Prisma.MenuWhereUniqueInput; data: UpdateMenuDto }): Promise<Menu | null> {
    const { where, data } = params;

    const categories = this.connectCategoriesById(data.categories);
    const lines = this.convertLines(data.lines);

    return this.prisma.menu.update({
      where,
      data: {
        ...data,
        lines,
        categories,
      },
      include: {
        categories: { select: { name: true } },
      },
    });
  }

  async deleteMenu(params: { where: Prisma.MenuWhereUniqueInput }): Promise<Menu> {
    const { where } = params;
    return this.prisma.menu.delete({ where });
  }

  // /** Menu Lines **/

  // async createMenuLine(params: { data: Prisma.MenuLineCreateInput }): Promise<MenuLine> {
  //   const { data } = params;

  //   return this.prisma.menuLine.create({ data });
  // }

  // getMenuLine(params: { where: Prisma.MenuLineWhereUniqueInput }) {
  //   const { where } = params;
  //   return this.prisma.menuLine.findUnique({ where });
  // }

  // async getMenuLines(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.MenuLineWhereUniqueInput;
  //   where?: Prisma.MenuLineWhereInput;
  //   orderBy?: Prisma.MenuLineOrderByWithRelationInput;
  // }): Promise<MenuLine[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.menuLine.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  // async updateMenuLine(params: {
  //   where: Prisma.MenuLineWhereUniqueInput;
  //   data: Prisma.MenuLineUpdateInput;
  // }): Promise<MenuLine> {
  //   const { where, data } = params;
  //   return this.prisma.menuLine.update({ where, data });
  // }

  // async deleteMenuLine(params: { where: Prisma.MenuLineWhereUniqueInput }): Promise<MenuLine> {
  //   const { where } = params;
  //   return this.prisma.menuLine.delete({ where });
  // }

  /**
   * Format the categories IDs array into the prisma query way
   */
  private connectCategoriesById(
    category: number[] | undefined,
  ): Prisma.MenuCategoryUncheckedCreateNestedManyWithoutMenusInput {
    const categories = category?.map((id) => ({ id }));

    return {
      connect: categories,
    };
  }

  private convertLines(lines: MenuLineDto[] | undefined) {
    const plainLines: Prisma.InputJsonValue | undefined = lines?.map((line) => ({
      price: line.price,
      productId: line.productId,
    }));

    return plainLines;
  }
}
