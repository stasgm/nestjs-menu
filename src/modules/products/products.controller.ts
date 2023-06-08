import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findAll() {
    return this.productService.findAll();
  }

  @ApiOkResponse({ type: ProductEntity })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.productService.findById(id);

    if (!res) {
      throw new NotFoundException();
    }

    return res;
  }

  @ApiCreatedResponse({ type: ProductEntity })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
