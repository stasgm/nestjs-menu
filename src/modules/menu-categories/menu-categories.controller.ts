import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MenuCategoriesService } from './menu-categories.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategoryEntity } from './entities/menu-category.entity';

@Controller('menu-categories')
@ApiTags('Menu-categories')
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: MenuCategoryEntity })
  async create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return new MenuCategoryEntity(
      await this.menuCategoriesService.create(createMenuCategoryDto),
    );
  }

  @ApiOkResponse({ type: MenuCategoryEntity, isArray: true })
  @Get()
  async findAll() {
    const menuCategories = await this.menuCategoriesService.findAll();
    return menuCategories.map(
      (menuCategory) => new MenuCategoryEntity(menuCategory),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: MenuCategoryEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.menuCategoriesService.findByID(id);

    if (!res) {
      throw new NotFoundException();
    }

    return new MenuCategoryEntity(res);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: MenuCategoryEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return new MenuCategoryEntity(
      await this.menuCategoriesService.update(id, updateMenuCategoryDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: MenuCategoryEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuCategoriesService.remove(id);
  }
}
