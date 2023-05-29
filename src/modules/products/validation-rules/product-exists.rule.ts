import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductsRepository } from '../products.repository';

@ValidatorConstraint({ name: 'ProductExists', async: true })
export class ProductExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly repository: ProductsRepository) {}

  async validate(name: string) {
    const product = await this.repository.getByName(name);
    return !product;
  }

  defaultMessage() {
    return 'Product already exists';
  }
}

export function ProductExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ProductExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ProductExistsRule,
    });
  };
}
