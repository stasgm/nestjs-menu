import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenuCategoryRepository } from '../menu-categories.repository';

@ValidatorConstraint({ async: true })
export class MenuCategoryExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly repository: MenuCategoryRepository) {}

  async validate(id: number) {
    return !!(await this.repository.getById(id));
  }

  defaultMessage() {
    return 'Menu category (id: $value) does not exist';
  }
}

export function MenuCategoryExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MenuCategoryExistss',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MenuCategoryExistsRule,
    });
  };
}
