import { ApiProperty } from '@nestjs/swagger';
import { MenuCategory } from '@prisma/client';

import { MenuEntity } from '../../menus/entities/menu.entity';
import { NamedBaseEntity } from '../../shared/named.base.entity';

export class MenuCategoryEntity extends NamedBaseEntity implements MenuCategory {
  constructor(partial: Partial<MenuCategoryEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ isArray: true, type: () => MenuEntity })
  menus: MenuEntity[];
}
