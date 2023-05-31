import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MenuRepository } from '../menus.repository';

@ValidatorConstraint({ name: 'MenuExists', async: true })
export class MenuExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly repository: MenuRepository) {}

  async validate(id: number) {
    const menu = await this.repository.getMenuById(id);
    return !menu;
  }

  defaultMessage() {
    return 'Menu does not exist';
  }
}

export function MenuExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MenuExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MenuExistsRule,
    });
  };
}
