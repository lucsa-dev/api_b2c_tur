import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}
  async create(createOrderDto: CreateOrderDto, userId: number) {
    const create = await this.repository.create(createOrderDto, userId);
    return create;
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }
}
