import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ProductsService } from '../products.service';

@ValidatorConstraint({ name: 'ProductNotExists', async: true })
export class ProductNotExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly service: ProductsService) {}

  async validate(name: string) {
    const product = await this.service.findByName(name);
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
