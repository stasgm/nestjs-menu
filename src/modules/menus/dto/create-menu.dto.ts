import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@prisma/client';
import { Exclude } from 'class-transformer';
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
import { IsMenuNotExist } from '../validation-rules/is-menu-not-exists.rule';

export class CreateMenuDto implements Menu {
  @Exclude()
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

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
