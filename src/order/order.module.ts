import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { OrderRepository } from './repositories/order.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, PrismaService],
})
export class OrderModule {}
