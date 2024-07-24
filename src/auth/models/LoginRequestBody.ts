import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'josh@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
  })
  password: string;
}
