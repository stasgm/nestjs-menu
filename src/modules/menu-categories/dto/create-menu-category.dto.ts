import { ApiProperty } from '@nestjs/swagger';
import { MenuCategory } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { MenuCategoryNotExists } from '../validation-rules/menu-category-not-exists.rule';

export class CreateMenuCategoryDto implements MenuCategory {
  @Exclude()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MenuCategoryNotExists()
  name: string;
}
