import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenuRepository } from '../menus.repository';

@ValidatorConstraint({ async: true })
export class MenuExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly menuRepository: MenuRepository) {}

  async validate(id: number) {
    const menu = await this.menuRepository.getMenuById(id);
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
