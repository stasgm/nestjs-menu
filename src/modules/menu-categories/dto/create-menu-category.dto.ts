import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { MenuCategoryEntity } from '../entities/menu-category.entity';
import { IsMenuCategoryNotExist } from '../validation-rules/is-menu-category-not-exist.rule';

export class CreateMenuCategoryDto extends OmitType(MenuCategoryEntity, ['id', 'menus']) {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsMenuCategoryNotExist()
  name: string;
}
