import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.createProduct({ data: createProductDto });
  }

  findAll() {
    return this.productsRepository.getProducts({});
  }

  findOne(id: number) {
    return this.productsRepository.getProduct({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.updateProduct({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.productsRepository.deleteProduct({ where: { id } });
  }
}
