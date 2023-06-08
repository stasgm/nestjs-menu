import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenusService } from '../menus.service';

@ValidatorConstraint({ async: true })
export class IsMenuNotExistRule implements ValidatorConstraintInterface {
  constructor(private readonly menusService: MenusService) {}

  async validate(name: string) {
    const menu = await this.menusService.findByName(name);
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
