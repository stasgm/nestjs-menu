import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { ProductExists } from '../validation-rules/product-exists.rule';

export class CreateProductDto implements Product {
  @Exclude()
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ProductExists()
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
