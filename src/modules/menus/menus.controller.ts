import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

import { MenuCategoryEntity } from '../menu-categories/entities/menu-category.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { MenusService } from './menus.service';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiProperty({ name: 'Create a new menu' })
  @ApiCreatedResponse({ type: MenuEntity })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @ApiOkResponse({ type: MenuEntity, isArray: true })
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MenuEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.menusService.findByID(id);

    if (!res) {
      throw new NotFoundException();
    }

    return new MenuCategoryEntity(res);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menusService.update(+id, updateMenuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menusService.remove(+id);
  // }
}
