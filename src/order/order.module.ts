import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './repositories/order.repository';
import { PrismaService } from '../prisma/prisma.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'order-queue',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, PrismaService],
})
export class OrderModule {}
