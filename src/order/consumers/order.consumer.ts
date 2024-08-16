import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { OrderService } from '../order.service';

@Processor('order-queue')
export class OrderConsumer {
  constructor(private readonly orderService: OrderService) {}
  async process(job: Job<any>): Promise<void> {
    const { userId, ...orderData } = job.data;
    await this.orderService.create(orderData, userId);
  }
}
