import { ApiProperty } from '@nestjs/swagger';
import { Menu, Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// import { MenuCategoryEntity } from '../../menu-categories/entities/menu-category.entity';
import { MenuCategoryExists } from '../../menu-categories/validation-rules/menu-category-exists.rule';

export class CreateMenuDto implements Menu {
  @Exclude()
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  description: string | null;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  disabled: boolean;

  @ApiProperty()
  @MenuCategoryExists()
  categories: Prisma.MenuCategorySelect;
}
