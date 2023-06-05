import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { MenuCategoryExists } from '../../menu-categories/validation-rules';
import { MenuEntity } from '../entities/menu.entity';
import { IsMenuNotExist } from '../validation-rules/is-menu-not-exists.rule';

export class CreateMenuDto extends OmitType(MenuEntity, [
  'id',
  'products',
  'categories',
  'updatedAt',
  'createdAt',
] as const) {
  // @Exclude()
  // id: number;

  // @Exclude()
  // createdAt: Date;

  // @Exclude()
  // updatedAt: Date;

  @ApiProperty()
  @IsMenuNotExist()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  @MaxLength(300)
  description: string | null;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  disabled: boolean;

  @ApiProperty({ required: false, default: {} })
  @IsOptional()
  products: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue | undefined;

  // @ApiProperty()
  // lines: Prisma.MenuCategorySelect[];

  @ApiProperty({ isArray: true, default: [] })
  @IsOptional()
  @MenuCategoryExists({ each: true })
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  categories: number[];
}
