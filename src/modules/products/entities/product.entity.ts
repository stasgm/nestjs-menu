import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { MenuLineEntity } from '../../menus/entities/menuLine.entity';
import { RefBaseEntity } from '../../shared/ref.base.entity';

export class ProductEntity extends RefBaseEntity implements Product {
  @ApiProperty({ type: String, required: false, nullable: true })
  description: string | null;

  @ApiProperty({ type: Boolean })
  disabled: boolean;

  @ApiProperty({ isArray: true, type: () => MenuLineEntity })
  menuLine: MenuLineEntity[];
}
