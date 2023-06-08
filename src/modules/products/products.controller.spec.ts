import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductController } from './products.controller';
import { mockedProducts } from './products.mock';
import { ProductsService } from './products.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: DeepMockProxy<ProductsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockDeep<ProductsService>())
      .compile();

    controller = module.get(ProductController);
    service = module.get(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of products', async () => {
    service.findAll.mockResolvedValue(mockedProducts);
    const products = await controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(typeof products).toBe('object');
    expect(products.length).toEqual(mockedProducts.length);
    expect(products[0].id).toEqual(mockedProducts[0].id);
  });

  it('should find by id and return a product', async () => {
    service.findById.mockResolvedValue(mockedProducts[0]);
    const product = await controller.findOne(mockedProducts[0].id);

    expect(service.findById).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(mockedProducts[0].id);
  });

  it('should create and return a product', async () => {
    const createProductDto: CreateProductDto = {
      ...mockedProducts[0],
    };
    service.create.mockResolvedValue(mockedProducts[0]);
    const product = await controller.create(createProductDto);

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(mockedProducts[0].id);
  });

  it('should update and return a product', async () => {
    const id = mockedProducts[0].id;
    const updateProductDto: UpdateProductDto = {
      ...mockedProducts[0],
    };
    service.update.mockResolvedValue(mockedProducts[0]);
    const product = await controller.update(id, updateProductDto);

    expect(service.update).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(id);
  });

  it('should remove and return one product', async () => {
    service.remove.mockResolvedValue(mockedProducts[0]);
    const product = await controller.remove(mockedProducts[0].id);

    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(mockedProducts[0].id);
  });
});
