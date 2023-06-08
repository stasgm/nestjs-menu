import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../core/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { mockedProducts } from './products.mock';
import { ProductsRepository } from './products.repository';

describe(`ProductsRepository`, () => {
  let repository: ProductsRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProductsRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    repository = module.get(ProductsRepository);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should return an array of products', async () => {
    prismaService.product.findMany.mockResolvedValue(mockedProducts);

    const products = await repository.getProducts({});

    expect(prismaService.product.findMany).toHaveBeenCalledTimes(1);
    expect(typeof products).toBe('object');
    expect(products.length).toEqual(mockedProducts.length);
    expect(products[0].id).toEqual(mockedProducts[0].id);
    expect(products).toBe(mockedProducts);
  });

  it('should find by id and return a product', async () => {
    prismaService.product.findUnique.mockResolvedValue(mockedProducts[0]);
    const product = await repository.getProduct({ where: { id: mockedProducts[0].id } });

    expect(prismaService.product.findUnique).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(mockedProducts[0].id);
  });

  it('should create and return a product', async () => {
    const createProductDto: CreateProductDto = {
      ...mockedProducts[0],
    };
    prismaService.product.create.mockResolvedValue(mockedProducts[0]);
    const product = await repository.createProduct({ data: createProductDto });

    expect(prismaService.product.create).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(mockedProducts[0].id);
  });

  it('should update and return a product', async () => {
    const id = mockedProducts[0].id;
    const updateProductDto: UpdateProductDto = {
      ...mockedProducts[0],
    };
    prismaService.product.update.mockResolvedValue(mockedProducts[0]);
    const product = await repository.updateProduct({ where: { id }, data: updateProductDto });

    expect(prismaService.product.update).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(id);
  });

  it('should remove and return one product', async () => {
    prismaService.product.delete.mockResolvedValue(mockedProducts[0]);
    const product = await repository.deleteProduct({ where: { id: mockedProducts[0].id } });

    expect(prismaService.product.delete).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(mockedProducts[0].id);
  });
});
