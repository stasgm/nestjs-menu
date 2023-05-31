import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenuCategoryRepository } from '../menu-categories.repository';

@ValidatorConstraint({ name: 'MenuCategoryNotExists', async: true })
export class MenuCategoryNotExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly repository: MenuCategoryRepository) {}

  async validate(name: string) {
    const menuCategory = await this.repository.getByName(name);
    return !menuCategory;
  }

  defaultMessage() {
    return 'Menu category already exists';
  }
}

export function MenuCategoryNotExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MenuCategoryNotExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MenuCategoryNotExistsRule,
    });
  };
}
