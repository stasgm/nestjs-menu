import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async createProduct(params: { data: Prisma.ProductCreateInput }): Promise<Product> {
    const { data } = params;

    return this.prisma.product.create({ data });
  }

  getProduct(params: { where: Prisma.ProductWhereUniqueInput }): Promise<Product | null> {
    const { where } = params;
    return this.prisma.product.findUnique({ where });
  }

  async getProducts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({ where, data });
  }

  async deleteProduct(params: { where: Prisma.ProductWhereUniqueInput }): Promise<Product> {
    const { where } = params;
    return this.prisma.product.delete({ where });
  }
}
