import { MenuCategory } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { MenuEntity } from '../../menus/entities/menu.entity';
import { NamedBaseEntity } from '../../shared/namedBaseEntity';

export class MenuCategoryEntity
  extends NamedBaseEntity
  implements MenuCategory
{
  constructor(partial: Partial<MenuCategoryEntity>) {
    super();
    Object.assign(this, partial);
  }

  // @ApiProperty({ type: Number })
  // id: number;

  // @ApiProperty({ type: String })
  // name: string;

  @ApiProperty({ isArray: true, type: () => MenuEntity })
  menus: MenuEntity[];
}
