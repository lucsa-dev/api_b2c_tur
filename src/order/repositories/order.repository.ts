import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  private select = {
    id: true,
    qtd: true,
    user: true,
    service: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(order: CreateOrderDto, userId: number): Promise<OrderEntity> {
    const create = await this.prisma.order.create({
      data: {
        ...order,
        userId,
      },
      select: this.select,
    });

    return create;
  }
}
