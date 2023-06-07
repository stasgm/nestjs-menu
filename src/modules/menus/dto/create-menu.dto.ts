import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { MenuCategoryExists } from '../../menu-categories/validation-rules';
import { MenuEntity } from '../entities/menu.entity';
import { IsMenuNotExist } from '../validation-rules/is-menu-not-exists.rule';
import { MenuLineDto } from './create-menu-line.dto';

export class CreateMenuDto extends OmitType(MenuEntity, [
  'id',
  'lines',
  'categories',
  'updatedAt',
  'createdAt',
] as const) {
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

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => MenuLineDto)
  lines: MenuLineDto[];

  @ApiProperty({ isArray: true, default: [] })
  @IsOptional()
  @MenuCategoryExists({ each: true })
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  categories: number[];
}
