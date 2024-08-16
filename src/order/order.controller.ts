import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('order')
@ApiBearerAuth('access_token')
export class OrderController {
  constructor(
    @InjectQueue('order-queue') private readonly orderQueue: Queue,
    private readonly orderService: OrderService,
  ) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.orderQueue.add('create-order', {
      createOrderDto,
      userId: currentUser.id,
    });
  }

  @Get(':id')
  async findOne(id: number) {
    return await this.orderService.findOne(id);
  }
}
