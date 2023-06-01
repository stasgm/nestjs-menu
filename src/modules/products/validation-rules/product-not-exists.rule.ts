import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ProductsRepository } from '../products.repository';

@ValidatorConstraint({ name: 'ProductNotExists', async: true })
export class ProductNotExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly repository: ProductsRepository) {}

  async validate(name: string) {
    const product = await this.repository.getProductByName(name);
    return !product;
  }

  defaultMessage() {
    return 'Product already exists';
  }
}

export function ProductNotExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'productExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ProductNotExistsRule,
    });
  };
}
