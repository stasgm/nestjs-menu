import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from '../../products/entities/product.entity';

export class MenuLineEntity {
  @ApiProperty({ type: Number })
  product: ProductEntity;

  @ApiProperty({ type: Number })
  price: number;
}
