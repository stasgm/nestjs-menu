import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenuCategoriesService } from '../menu-categories.service';

@ValidatorConstraint({ async: true })
export class IsMenuCategoryNotExistRule implements ValidatorConstraintInterface {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  async validate(name: string) {
    const menuCategory = await this.menuCategoriesService.findByName(name);
    return !menuCategory;
  }

  defaultMessage() {
    return 'Menu category already exists';
  }
}

export function IsMenuCategoryNotExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMenuCategoryNotExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMenuCategoryNotExistRule,
    });
  };
}
