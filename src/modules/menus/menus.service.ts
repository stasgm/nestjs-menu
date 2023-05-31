import { Injectable } from '@nestjs/common';

// import { CreateMenuDto } from './dto/create-menu.dto';
// import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(private menuRepository: MenuRepository) {}

  // create(createMenuDto: CreateMenuDto) {
  //   return this.menuRepository.createMenu({
  //     data: createMenuDto,
  //   });
  // }

  findAll() {
    return this.menuRepository.getMenus({});
  }

  findByID(id: number) {
    return this.menuRepository.getMenu({ where: { id } });
  }

  // update(id: number, updateMenuDto: UpdateMenuDto) {
  //   return this.menuRepository.updateMenu({
  //     where: { id },
  //     data: updateMenuDto,
  //   });
  // }

  // remove(id: number) {
  //   return this.menuRepository.deleteMenu({ where: { id } });
  // }
}
