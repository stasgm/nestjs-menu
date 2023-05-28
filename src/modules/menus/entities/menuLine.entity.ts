import { MenuLine } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MenuEntity } from './menu.entity';
import { ProductEntity } from '../../products/entities/product.entity';

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
