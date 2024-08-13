import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly repository: OrderRepository) {}
  async create(createOrderDto: CreateOrderDto, userId: number) {
    const create = await this.repository.create(createOrderDto, userId);
    return create;
  }
}
