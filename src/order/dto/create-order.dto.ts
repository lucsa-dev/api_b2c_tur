import { OrderStatus } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  @IsInt()
  @IsNotEmpty()
  qtd: number;

  @IsString()
  @IsNotEmpty()
  status: OrderStatus;
}
