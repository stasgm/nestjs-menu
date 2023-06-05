import { ApiProperty } from '@nestjs/swagger';
import { Menu, Prisma } from '@prisma/client';

// import { IsOptional } from 'class-validator';
import { MenuCategoryEntity } from '../../menu-categories/entities/menu-category.entity';
import { RefBaseEntity } from '../../shared/ref.base.entity';
// import { MenuLineEntity } from './menu-line.entity';

export class MenuEntity extends RefBaseEntity implements Menu {
  @ApiProperty({ type: String, required: false, nullable: true })
  description: string | null;

  @ApiProperty({ type: Boolean })
  disabled: boolean;

  // @ApiProperty({ isArray: true, type: () => MenuLineEntity })
  // @IsOptional()
  // lines: MenuLineEntity[];

  @ApiProperty({ type: Object, required: false, nullable: true })
  products: Prisma.JsonValue;

  @ApiProperty({ isArray: true, type: () => MenuCategoryEntity })
  categories: MenuCategoryEntity[];
}
