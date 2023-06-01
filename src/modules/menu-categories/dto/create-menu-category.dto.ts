import { ApiProperty } from '@nestjs/swagger';
import { MenuCategory } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { IsMenuCategoryNotExist } from '../validation-rules/is-menu-category-not-exist.rule';

export class CreateMenuCategoryDto implements MenuCategory {
  @Exclude()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsMenuCategoryNotExist()
  name: string;
}
