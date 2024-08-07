import { RoleEnum } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

@ValidatorConstraint({ name: 'create-business', async: false })
export class CustomCnpjValidator implements ValidatorConstraintInterface {
  validate(cnpj: string) {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    if (!cnpjRegex.test(cnpj)) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'CNPJ inválido';
  }
}

export class CreateBusinessDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @Validate(CustomCnpjValidator)
  cnpj: string;
}

export class CreateBusinessDtoWithRole extends CreateBusinessDto {
  role: RoleEnum[];
}
