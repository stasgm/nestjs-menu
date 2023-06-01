import { Injectable } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';

// import { Menu, MenuLine, Prisma } from '@prisma/client';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';

const menuInclude = Prisma.validator<Prisma.MenuInclude>()({
  _count: {
    select: {
      categories: true,
      lines: true,
    },
  },
  categories: true,
  lines: {
    select: {
      id: true,
      price: true,
      product: true,
    },
  },
});

@Injectable()
export class MenuRepository {
  constructor(private prisma: PrismaService) {}

  async createMenu(params: { createMenuDto: CreateMenuDto }): Promise<Menu> {
    const { createMenuDto } = params;

    const categories = this.connectCategoriesById(createMenuDto.categories);

    return this.prisma.menu.create({
      data: {
        ...createMenuDto,
        categories,
      },
      include: {
        categories: { select: { name: true } },
      },
    });
  }

  getMenuByName(name: string): Promise<Menu | null> {
    return this.getMenu({ where: { name } });
  }

  getMenu(params: { where: Prisma.MenuWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.menu.findUnique({ where, include: menuInclude });
  }

  getMenuById(id: number): Promise<Menu | null> {
    return this.getMenu({ where: { id } });
  }

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

  // async updateMenu(params: { where: Prisma.MenuWhereUniqueInput; data: Prisma.MenuUpdateInput }): Promise<Menu> {
  //   const { where, data } = params;
  //   return this.prisma.menu.update({ where, data });
  // }

  // async deleteMenu(params: { where: Prisma.MenuWhereUniqueInput }): Promise<Menu> {
  //   const { where } = params;
  //   return this.prisma.menu.delete({ where });
  // }

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
  connectCategoriesById(category: number[] | undefined): Prisma.MenuCategoryUncheckedCreateNestedManyWithoutMenusInput {
    return {
      connect: category?.map((id) => ({ id })) || [],
    };
  }
}
