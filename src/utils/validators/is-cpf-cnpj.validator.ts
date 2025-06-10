import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
export class IsCpfCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: string, args?: ValidationArguments): boolean {
    if (!value) return false;
    // Valida CPF ou CNPJ
    return cpf.isValid(value) || cnpj.isValid(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    return `${args?.property} deve ser um CPF ou CNPJ válido.`;
  }
}

// Decorator que você usa no DTO
export function IsCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfCnpjConstraint,
    });
  };
}
