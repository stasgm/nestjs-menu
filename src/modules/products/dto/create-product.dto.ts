import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { ProductEntity } from '../entities/product.entity';
import { ProductNotExists } from '../validation-rules/product-not-exists.rule';

export class CreateProductDto extends OmitType(ProductEntity, ['id', 'createdAt', 'updatedAt']) {
  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ProductNotExists()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  description: string | null;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  disabled: boolean;
}
