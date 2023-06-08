import { Injectable } from '@nestjs/common';
import { Menu } from '@prisma/client';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(private menuRepository: MenuRepository) {}

  findAll(): Promise<Menu[]> {
    return this.menuRepository.getMenus({});
  }

  findByID(id: number): Promise<Menu | null> {
    return this.menuRepository.getMenu({ where: { id } });
  }

  findByName(name: string): Promise<Menu | null> {
    return this.menuRepository.getMenu({ where: { name } });
  }

  create(data: CreateMenuDto): Promise<Menu> {
    return this.menuRepository.createMenu({ data });
  }

  update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu | null> {
    return this.menuRepository.updateMenu({
      where: { id },
      data: updateMenuDto,
    });
  }

  remove(id: number): Promise<Menu> {
    return this.menuRepository.deleteMenu({ where: { id } });
  }
}
