import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { MenuLineEntity } from '../entities/menu-line.entity';

export class MenuLineDto extends OmitType(MenuLineEntity, ['product'] as const) {
  constructor(partial: Partial<MenuLineDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ required: true })
  @IsNumber()
  productId: number;

  @ApiProperty({ required: true, default: 0 })
  @IsNumber()
  price: number;
}
