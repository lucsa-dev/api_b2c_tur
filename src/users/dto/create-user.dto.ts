import { RoleEnum } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomCpfValidator implements ValidatorConstraintInterface {
  validate(cpf: string) {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'CPF inválido';
  }
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Validate(CustomCpfValidator)
  cpf: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserWithRole extends CreateUserDto {
  role: RoleEnum[];
}
