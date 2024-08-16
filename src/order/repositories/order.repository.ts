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

  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      select: this.select,
    });

    return orders;
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      select: this.select,
    });

    return order;
  }

  async update(id: number, data: CreateOrderDto): Promise<OrderEntity> {
    const update = await this.prisma.order.update({
      where: { id },
      data,
      select: this.select,
    });

    return update;
  }

  async delete(id: number): Promise<OrderEntity> {
    const deleted = await this.prisma.order.delete({
      where: { id },
      select: this.select,
    });

    return deleted;
  }

  async findByUserId(userId: number): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      select: this.select,
    });

    return orders;
  }

  async findByServiceId(serviceId: number): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      where: { serviceId },
      select: this.select,
    });

    return orders;
  }

  async findByUserIdAndServiceId(
    userId: number,
    serviceId: number,
  ): Promise<OrderEntity> {
    const order = await this.prisma.order.findFirst({
      where: { userId, serviceId },
      select: this.select,
    });

    return order;
  }
}
