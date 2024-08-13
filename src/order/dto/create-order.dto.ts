import { OrderStatus } from '@prisma/client';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  @IsInt()
  @IsNotEmpty()
  qtd: number;

  @IsInt()
  @IsNotEmpty()
  status: OrderStatus;
}
