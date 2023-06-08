import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenusService } from '../menus.service';

@ValidatorConstraint({ async: true })
export class MenuExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly menusService: MenusService) {}

  async validate(id: number) {
    const menu = await this.menusService.findByID(id);
    return !menu;
  }

  defaultMessage() {
    return 'Menu (id: $value) does not exist';
  }
}

export function MenuExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'menuExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MenuExistsRule,
    });
  };
}
