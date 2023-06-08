import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenuCategoriesService } from '../menu-categories.service';

@ValidatorConstraint({ async: true })
export class MenuCategoryExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  async validate(id: number) {
    return !!(await this.menuCategoriesService.findByID(id));
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
