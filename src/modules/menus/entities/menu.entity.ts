import { ApiProperty } from '@nestjs/swagger';

import { MenuCategoryEntity } from '../../menu-categories/entities/menu-category.entity';
import { RefBaseEntity } from '../../shared/ref.base.entity';
import { MenuLineEntity } from './menu-line.entity';

// export class MenuEntity extends RefBaseEntity implements Menu {
export class MenuEntity extends RefBaseEntity {
  @ApiProperty({ type: String, required: false, nullable: true })
  description: string | null;

  @ApiProperty({ type: Boolean })
  disabled: boolean;

  @ApiProperty({ type: Object, required: false, nullable: true })
  // lines: Prisma.JsonValue;
  lines: MenuLineEntity[];

  @ApiProperty({ isArray: true, type: () => MenuCategoryEntity })
  categories: MenuCategoryEntity[];
}
