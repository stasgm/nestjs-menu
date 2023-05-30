import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MenuLine } from '@prisma/client';

import { ProductEntity } from '../../products/entities/product.entity';
import { MenuEntity } from './menu.entity';

export class MenuLineEntity implements MenuLine {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: () => MenuEntity })
  menu: MenuEntity;

  @ApiProperty({ type: Number })
  menuId: number;

  @ApiPropertyOptional({ type: () => ProductEntity })
  product?: ProductEntity;

  @ApiProperty({ type: Number })
  productId: number;
}
