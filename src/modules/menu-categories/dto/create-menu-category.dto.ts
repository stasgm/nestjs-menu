import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { MenuCategoryExists } from '../validation-rules/menu-category-exists.rule';

// import { PickType } from '@nestjs/swagger';

// export class CreateMenuCategoryDto extends PickType(MenuEntity, [
//   'name',
//   'description',
// ] as const) {}
// implements MenuCategory
export class CreateMenuCategoryDto {
  // @Exclude()
  // id: number;

  // @Exclude()
  // createdAt: Date;

  // @Exclude()
  // updatedAt: Date;

  // @Exclude()
  // menus: MenuEntity[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MenuCategoryExists()
  name: string;
}
