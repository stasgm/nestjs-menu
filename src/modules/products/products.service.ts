import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.getProducts({});
  }

  findById(id: number): Promise<Product | null> {
    return this.productsRepository.getProduct({ where: { id } });
  }

  findByName(name: string): Promise<Product | null> {
    return this.productsRepository.getProduct({ where: { name } });
  }

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.createProduct({ data: createProductDto });
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
