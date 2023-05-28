import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MenuCategoryRepository } from '../menu-categories.repository';

@ValidatorConstraint({ name: 'MenuCategoryExists', async: true })
export class MenuCategoryExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly repository: MenuCategoryRepository) {}

  async validate(name: string) {
    const menuCategory = await this.repository.getByName(name);
    return !menuCategory;
  }

  defaultMessage() {
    return 'Menu category already exists';
  }
}

export function MenuCategoryExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MenuCategoryExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MenuCategoryExistsRule,
    });
  };
}
