import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenuRepository } from '../menus.repository';

@ValidatorConstraint({ async: true })
export class IsMenuNotExistRule implements ValidatorConstraintInterface {
  constructor(private readonly repository: MenuRepository) {}

  async validate(name: string) {
    const menu = await this.repository.getMenuByName(name);
    return !menu;
  }

  defaultMessage() {
    return "Menu (name: '$value') already exists";
  }
}

export function IsMenuNotExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMenuAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMenuNotExistRule,
    });
  };
}
